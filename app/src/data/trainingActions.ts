import { skillProgressRepository, trainingSessionRepository } from "./repositories"
import { computeNewlyAvailableSkills, computeUpdatedSkillProgress } from "../domain/services"
import type { Skill, SkillProgress, TrainingSession } from "../domain/entities"

export interface SaveTrainingSessionInput {
  /** The skill actually trained. */
  skill: Skill
  /** Every skill in the curriculum — needed to re-check which locked
   * skills just became available (PRD.md 第8节). */
  allSkills: Skill[]
  /** The stroke the user was pursuing when they trained this skill. Even
   * a shared common.* skill (no Skill.strokeId of its own) is trained in
   * the context of one stroke, because PRD.md 第17节's flow always starts
   * with "选择泳姿" — see TrainingPage's skill picker. */
  strokeId: string
  durationMinutes: number
  assessment: {
    proficiency: SkillProgress["proficiency"]
    confidence: SkillProgress["confidence"]
    stability: SkillProgress["stability"]
    fatigue: number
  }
  /** "感受" — free text, stored on the session only (PRD.md 第17节), not
   * on SkillProgress. */
  notes?: string
}

/**
 * PRD.md 第17-19节 end to end: records the TrainingSession, folds the
 * self-assessment into the trained skill's SkillProgress
 * (`computeUpdatedSkillProgress`), and re-derives lock status for every
 * other skill so ones that just met their prerequisites flip from
 * "locked" to "available" (`computeNewlyAvailableSkills`).
 *
 * This is the Application-layer orchestration CLAUDE.md's architecture
 * calls for: it composes pure domain services with repository writes, but
 * contains no business rules of its own — those all live in
 * domain/services/trainingProgress.ts so they stay unit-testable without a
 * database.
 *
 * Returns the trained skill's updated SkillProgress so the UI can react to
 * its *stored* status (which is sticky once "completed" — see
 * `computeUpdatedSkillProgress`) rather than re-deriving its own, possibly
 * stale, "did this session pass?" logic from the raw proficiency number.
 */
export async function saveTrainingSession(input: SaveTrainingSessionInput): Promise<SkillProgress> {
  const now = new Date().toISOString()

  const session: TrainingSession = {
    id: crypto.randomUUID(),
    date: now,
    durationMinutes: input.durationMinutes,
    strokeId: input.strokeId,
    skillId: input.skill.id,
    notes: input.notes,
    proficiency: input.assessment.proficiency,
    confidence: input.assessment.confidence,
    stability: input.assessment.stability,
    fatigue: input.assessment.fatigue,
  }
  await trainingSessionRepository.add(session)

  const allProgress = await skillProgressRepository.getAll()
  const progressBySkillId = new Map(allProgress.map((p) => [p.skillId, p]))

  const updatedProgress = computeUpdatedSkillProgress(
    progressBySkillId.get(input.skill.id),
    input.skill.id,
    input.durationMinutes,
    input.assessment,
    now,
  )
  await skillProgressRepository.upsert(updatedProgress)
  progressBySkillId.set(input.skill.id, updatedProgress)

  const newlyAvailable = computeNewlyAvailableSkills(input.allSkills, progressBySkillId)
  if (newlyAvailable.length > 0) {
    await skillProgressRepository.bulkPut(newlyAvailable)
  }

  return updatedProgress
}
