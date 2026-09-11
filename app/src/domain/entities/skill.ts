/**
 * Curriculum source citation. Not used yet — reserved for when more
 * authoritative coaching material is incorporated (PRD.md 第31节 未来版本候选功能).
 */
export interface Source {
  title: string
  url?: string
}

/**
 * A single skill-tree node. Mirrors PRD.md 第22节 — this file is the single
 * source of truth for the shape; do not redefine it elsewhere.
 *
 * Curriculum content (title/description/techniquePoints/... in Chinese) is
 * seed data, not something authored here — see CLAUDE.md "Course Data":
 * curriculum must live outside React components, keyed by stable `id`s that
 * match swimming coach.md.
 *
 * P1 product decision (方案 C, see `claude/skill-teaching-module-mapping.md`):
 * PRD.md's skill tree stays fine-grained and is never merged/deleted to fit
 * swimming coach.md's coarser modules. Instead each Skill points at its
 * teaching content via `teachingModuleId` — several Skills legitimately
 * share one module (e.g. freestyle's six Stage-4 arm skills all point at
 * FREE-05); that is expected, not a bug. The old per-skill
 * objectives/techniquePoints/... fields below are now optional
 * *overrides* — curriculum seed data leaves them unset and lets the
 * referenced TeachingModule supply the content (see teachingModule.ts and
 * `src/data/curriculum/`); a future skill-specific override stays possible
 * without another data-model change.
 */
export interface Skill {
  id: string

  /**
   * Undefined for the shared common.* skills (water adaptation, exhale,
   * floating, streamline) that are not specific to one stroke — see
   * PRD.md 第32节 "通用基础技能（跨泳姿共享）".
   */
  strokeId?: string

  /** e.g. "basic" | "ti" for freestyle's two routes. Undefined otherwise. */
  routeId?: string

  /** e.g. "common" for shared skills, or a stroke-specific stage id. */
  stageId: string

  title: string
  description: string

  /** Skill ids that must be learned first (see PRD.md 第32节 for how the
   * shared common.* skills are referenced here). */
  prerequisites: string[]

  /**
   * Points at the swimming coach.md teaching module that supplies this
   * skill's technique content (see teachingModule.ts). Every seeded skill
   * has one — the skill-teaching-module-mapping analysis found a usable
   * (if occasionally imperfect) match for all of them.
   */
  teachingModuleId: string

  /** Skill-level override; unset in seed data so the UI falls back to the
   * TeachingModule's timing. */
  minimumMinutes?: number
  recommendedMinutes?: number
  typicalSessions?: string

  /** Skill-level content overrides — unset in seed data (see class doc). */
  objectives?: string[]
  techniquePoints?: string[]
  commonMistakes?: string[]
  exercises?: string[]
  passCriteria?: string[]

  safetyNotes?: string[]
  sources?: Source[]

  /** Sort order within its stage. */
  order: number
}
