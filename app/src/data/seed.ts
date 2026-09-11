import {
  skillProgressRepository,
  skillRepository,
  strokeRepository,
  teachingModuleRepository,
  userSettingsRepository,
} from "./repositories"
import { CURRICULUM_VERSION, SKILLS, TEACHING_MODULES } from "./curriculum"
import { deriveLockStatus } from "../domain/services"
import type { SkillProgress, Stroke } from "../domain/entities"

const STROKES: Stroke[] = [
  {
    id: "free",
    name: "自由泳",
    order: 1,
    routes: [
      { id: "basic", name: "普通自由泳" },
      { id: "ti", name: "全浸式自由泳 / TI" },
    ],
  },
  { id: "breast", name: "蛙泳", order: 2 },
  { id: "back", name: "仰泳", order: 3 },
  { id: "fly", name: "蝶泳", order: 4 },
]

/**
 * Seeds the four fixed strokes (plus freestyle's two routes) on first run.
 *
 * This is navigation structure — a closed, unchanging set of four items —
 * not curriculum content, so it doesn't conflict with CLAUDE.md's "Course
 * Data" rule.
 */
export async function seedStrokesIfEmpty(): Promise<void> {
  const existing = await strokeRepository.getAll()
  if (existing.length > 0) return
  await strokeRepository.bulkPut(STROKES)
}

/**
 * Seeds the actual curriculum (CLAUDE.md Development Workflow step 4): the
 * PRD.md skill tree (`SKILLS`) and the swimming coach.md teaching content
 * it references (`TEACHING_MODULES`), both defined in `./curriculum` — not
 * here, so this file stays a thin "when to seed" wrapper rather than a
 * place curriculum text accumulates.
 *
 * Also materializes one SkillProgress row per skill with its initial
 * locked/available status (`deriveLockStatus`, domain/services/unlockRules.ts):
 * on a fresh install nothing has been trained yet, so only skills with no
 * prerequisites (the shared common.* skills, PRD.md 第32节) start
 * "available" — everything else starts "locked" until a future training
 * feature lets the user actually raise a prerequisite's proficiency.
 * `status` is stored, not recomputed on every read, because it is real
 * lifecycle state (PRD.md 第23节) that only changes on specific events
 * (start training, self-assess, manually unlock) — a later phase is what
 * flips a skill from locked to available once its prerequisites are met.
 *
 * Only runs when the skills table is empty, mirroring
 * `seedStrokesIfEmpty`. A later phase (JSON import/export, PRD.md 第25-26节)
 * is what re-seeds or upgrades an existing install when
 * `CURRICULUM_VERSION` changes — this function intentionally does not
 * overwrite existing skill or progress data.
 */
export async function seedCurriculumIfEmpty(): Promise<void> {
  const existing = await skillRepository.getAll()
  if (existing.length > 0) return

  await teachingModuleRepository.bulkPut(TEACHING_MODULES)
  await skillRepository.bulkPut(SKILLS)

  const noProgressYet = new Map<string, SkillProgress>()
  const initialProgress: SkillProgress[] = SKILLS.map((skill) => ({
    skillId: skill.id,
    status: deriveLockStatus(skill, noProgressYet),
    totalMinutes: 0,
    proficiency: 0,
    confidence: 1,
    stability: 1,
  }))
  await skillProgressRepository.bulkPut(initialProgress)

  // A fresh install starts already on the current curriculum, so record
  // that now — otherwise `syncCurriculumVersion` below would immediately
  // (and harmlessly, but pointlessly) redo this same work on next load.
  await userSettingsRepository.update({ curriculumVersion: CURRICULUM_VERSION })
}

/**
 * PRD.md 第22节 "课程版本": brings an *already-seeded* install's
 * `skills`/`teachingModules` tables up to date with a newer
 * `CURRICULUM_VERSION` — the migration `seedCurriculumIfEmpty`'s own
 * doc comment used to describe as "a later phase". This is that phase.
 *
 * Concretely this is what makes a curriculum content change (e.g. this
 * project's TI 技能树 rewrite from 15 generic skills to 16 named drills)
 * actually show up for someone who already has the app installed: without
 * it, `seedCurriculumIfEmpty` above never runs again once the `skills`
 * table has anything in it, so a previously-installed user would keep
 * seeing the old skill tree forever even after updating the code — the
 * new code, but the old data, both silently loaded from IndexedDB.
 *
 * What it does NOT touch: `trainingSessions`, and any *existing*
 * `SkillProgress` row — a user's own history and progress are never
 * curriculum data (CLAUDE.md "Course Data" / "Data Safety" rules), so a
 * version sync only ever adds rows for skills that are new in this
 * version. A `SkillProgress` row whose `skillId` no longer exists in the
 * new `SKILLS` list (an id that was renamed or removed) is deliberately
 * left in place rather than deleted — it becomes exactly the same kind of
 * harmless orphaned record PRD.md 第26节 already describes for JSON import,
 * and the rest of the UI already tolerates that (every progress lookup
 * falls back to "locked" when a skill has no matching progress, and vice
 * versa an orphaned progress row with no matching skill simply never
 * renders anywhere).
 */
export async function syncCurriculumVersion(): Promise<void> {
  const settings = await userSettingsRepository.get()
  if (settings.curriculumVersion === CURRICULUM_VERSION) return

  await teachingModuleRepository.replaceAll(TEACHING_MODULES)
  await skillRepository.replaceAll(SKILLS)

  const existingProgress = await skillProgressRepository.getAll()
  const progressBySkillId = new Map(existingProgress.map((p) => [p.skillId, p]))
  const progressForNewSkills: SkillProgress[] = SKILLS.filter((skill) => !progressBySkillId.has(skill.id)).map(
    (skill) => ({
      skillId: skill.id,
      status: deriveLockStatus(skill, progressBySkillId),
      totalMinutes: 0,
      proficiency: 0,
      confidence: 1,
      stability: 1,
    }),
  )
  if (progressForNewSkills.length > 0) {
    await skillProgressRepository.bulkPut(progressForNewSkills)
  }

  await userSettingsRepository.update({ curriculumVersion: CURRICULUM_VERSION })
}
