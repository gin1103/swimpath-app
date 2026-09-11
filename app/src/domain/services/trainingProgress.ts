import { deriveLockStatus, meetsUnlockCriteria } from "./unlockRules"
import type { Skill, SkillProgress } from "../entities"

export interface SelfAssessment {
  proficiency: SkillProgress["proficiency"]
  confidence: SkillProgress["confidence"]
  stability: SkillProgress["stability"]
}

/**
 * PRD.md 第18节 "自动进度" + 第19节 "自评系统": folds one training session's
 * self-assessment into a skill's stored progress. `status` becomes
 * "completed" once proficiency reaches the unlock threshold (P5 决定:
 * driven purely by this number, never by the pass-criteria checklist),
 * otherwise "learning" — a skill only reaches this function once it is
 * already "available" or "learning" (TrainingPage only lets the user pick
 * non-locked skills), so those are the only two statuses this can produce
 * for a first-time assessment.
 *
 * "completed" is sticky once reached: retraining an already-`completed`
 * skill and self-rating it lower this time (an off day, feeling rusty)
 * updates the displayed proficiency/confidence/stability to the new
 * numbers but does not drop `status` back to "learning" — mirroring the
 * `completedAt` timestamp, which was already "first time only" before this
 * fix (`previous?.completedAt ?? now`) while `status` itself was
 * inconsistently recomputed from scratch every time. Un-completing a skill
 * the user already earned would also be surprising given
 * `computeNewlyAvailableSkills` never re-locks anything downstream —  a
 * skill that already unlocked its dependents shouldn't itself silently
 * revert to "learning".
 *
 * Pure — the caller (src/data/trainingActions.ts) is responsible for
 * reading the previous record and persisting the result.
 */
export function computeUpdatedSkillProgress(
  previous: SkillProgress | undefined,
  skillId: string,
  durationMinutes: number,
  assessment: SelfAssessment,
  now: string,
): SkillProgress {
  const totalMinutes = (previous?.totalMinutes ?? 0) + durationMinutes
  const meetsThresholdNow = meetsUnlockCriteria(assessment.proficiency)
  const isCompleted = meetsThresholdNow || previous?.status === "completed"

  return {
    skillId,
    status: isCompleted ? "completed" : "learning",
    totalMinutes,
    proficiency: assessment.proficiency,
    confidence: assessment.confidence,
    stability: assessment.stability,
    lastPracticedAt: now,
    completedAt: isCompleted ? (previous?.completedAt ?? now) : previous?.completedAt,
    notes: previous?.notes,
    manualOverride: previous?.manualOverride,
  }
}

/**
 * PRD.md 第8节 解锁规则: after a self-assessment changes some skill's
 * proficiency, re-checks every currently-"locked" skill against
 * `deriveLockStatus` and returns updated records for the ones that just
 * became unlockable. Skills that are already "available"/"learning"/
 * "completed" are left untouched — this never locks anything back up.
 *
 * `progressBySkillId` must already reflect the just-saved assessment (the
 * caller merges it in before calling this).
 */
export function computeNewlyAvailableSkills(
  allSkills: Skill[],
  progressBySkillId: ReadonlyMap<string, SkillProgress>,
): SkillProgress[] {
  const updates: SkillProgress[] = []

  for (const skill of allSkills) {
    const current = progressBySkillId.get(skill.id)
    if (!current || current.status !== "locked") continue

    if (deriveLockStatus(skill, progressBySkillId) === "available") {
      updates.push({ ...current, status: "available" })
    }
  }

  return updates
}
