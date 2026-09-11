import type { SkillProgress } from "../entities"

/**
 * PRD.md 第8节 解锁规则: automatic unlocking only ever looks at the
 * proficiency self-rating (see `meetsUnlockCriteria` in unlockRules.ts),
 * but the same section explicitly requires the app to also let the user
 * "手动解锁下一阶段" — because adult self-learners progress at very
 * different rates and the app has no way to verify real-world ability.
 *
 * This is scoped to exactly the one skill being unlocked: it flips a
 * `locked` skill to `available` so the user can start training it, but it
 * does not pretend the skill has been mastered (proficiency/totalMinutes
 * are untouched) and it does not cascade further — whatever in turn
 * depends on this skill still needs its own real self-assessment, or its
 * own separate manual unlock. `manualOverride` is recorded so the rest of
 * the app (and any future data export) can tell this status came from an
 * explicit user action rather than meeting the normal criteria.
 *
 * Called only on a skill that already has a SkillProgress row — every
 * skill gets one at curriculum seed time (`src/data/seed.ts`), so callers
 * never need to fabricate a default record here.
 */
export function applyManualUnlock(current: SkillProgress): SkillProgress {
  if (current.status !== "locked") return current
  return {
    ...current,
    status: "available",
    manualOverride: true,
  }
}
