import type { Skill } from "../entities/skill"
import type { SkillProgress, SkillStatus } from "../entities/skillProgress"

/**
 * swimming coach.md 第3/14节: a proficiency self-rating of 3 or above is
 * what the app treats as "passed enough to consider unlocking the next
 * skill." This is a product reference value, not a certification — the
 * user can always manually override (PRD.md 第8节).
 */
export const UNLOCK_PROFICIENCY_THRESHOLD = 3

/**
 * Whether accumulated practice time has reached the skill's recommended
 * minutes. Per PRD.md 第9节, minutes are a reference, never a hard gate —
 * this only decides whether to *prompt* a self-assessment, not whether the
 * skill is "done".
 */
export function hasReachedRecommendedTime(
  totalMinutes: number,
  recommendedMinutes: number | undefined,
): boolean {
  if (recommendedMinutes === undefined) return false
  return totalMinutes >= recommendedMinutes
}

/**
 * PRD.md 第18节 "自动进度": after saving a training session, decide whether
 * to surface the self-assessment prompt.
 */
export function shouldPromptAssessment(
  totalMinutes: number,
  recommendedMinutes: number | undefined,
): boolean {
  return hasReachedRecommendedTime(totalMinutes, recommendedMinutes)
}

/**
 * PRD.md 第8节 解锁规则 + P5 决定: unlock recommendations are driven only by
 * the numeric proficiency self-rating. The pass-criteria checklist shown on
 * the skill detail page (PRD.md 第15节) is a self-check aid only — it is
 * intentionally not part of this decision and is never persisted.
 */
export function meetsUnlockCriteria(proficiency: SkillProgress["proficiency"]): boolean {
  return proficiency >= UNLOCK_PROFICIENCY_THRESHOLD
}

/**
 * Decides between "locked" and "available" for a skill that has no
 * SkillProgress record of its own yet (see PRD.md 第6节 skill tree +
 * 第8节 解锁规则). A skill with no prerequisites (the common.* skills,
 * PRD.md 第32节) is always available; otherwise every prerequisite must
 * already have a recorded proficiency >= 3.
 *
 * This never returns "learning" or "completed" — those only happen once a
 * user has actually engaged with a skill, at which point a real
 * SkillProgress record exists and callers should use its `status`
 * directly instead of calling this function.
 *
 * Used at curriculum seed time (`src/data/seed.ts`) to materialize each
 * skill's initial status, and is the same rule a future "recompute
 * unlocks after a self-assessment" step (training feature, not built yet)
 * would re-run for skills that depend on the one just assessed.
 */
export function deriveLockStatus(
  skill: Skill,
  progressBySkillId: ReadonlyMap<string, SkillProgress>,
): Extract<SkillStatus, "locked" | "available"> {
  if (skill.prerequisites.length === 0) return "available"

  const allPrerequisitesMet = skill.prerequisites.every((prerequisiteId) => {
    const prerequisiteProgress = progressBySkillId.get(prerequisiteId)
    return prerequisiteProgress !== undefined && meetsUnlockCriteria(prerequisiteProgress.proficiency)
  })

  return allPrerequisitesMet ? "available" : "locked"
}
