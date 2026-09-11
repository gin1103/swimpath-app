import type { SkillProgress } from "../entities/skillProgress"

/**
 * PRD.md 第16节: the home page's "当前泳姿/当前阶段/当前技能" is derived, not
 * stored. Prefer the most recently practiced skill that is still
 * "learning"; otherwise fall back to the first "available" skill in the
 * curriculum's own order.
 *
 * `availableOrder` is the full list of skill ids in curriculum order (e.g.
 * flattened from the current stroke's skill tree) — this function does not
 * reach into the database itself, keeping it a pure, easily testable rule.
 */
export function deriveCurrentSkillId(
  progressList: SkillProgress[],
  availableOrder: string[],
): string | undefined {
  const learning = progressList
    .filter((p) => p.status === "learning")
    .sort((a, b) => (b.lastPracticedAt ?? "").localeCompare(a.lastPracticedAt ?? ""))

  const mostRecentlyLearning = learning[0]
  if (mostRecentlyLearning) return mostRecentlyLearning.skillId

  const availableIds = new Set(
    progressList.filter((p) => p.status === "available").map((p) => p.skillId),
  )
  return availableOrder.find((id) => availableIds.has(id))
}
