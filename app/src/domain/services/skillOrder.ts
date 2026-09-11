import type { Skill } from "../entities/skill"
import type { Stroke } from "../entities/stroke"

/**
 * PRD.md 第16节: the home page's "当前技能" fallback ("如果没有 learning
 * 状态的技能，取第一个 available 的技能") needs a single, deterministic
 * ordering across every skill in every stroke/route — `Skill.order` alone
 * is only meaningful *within one stage* (see skill.ts). This builds that
 * cross-stroke ordering from Stroke.order (navigation order, PRD.md 第5节)
 * plus each skill's routeId/stageId/order, without requiring a new stored
 * field.
 *
 * Pure and I/O-free — callers load `strokes` and `skills` from their
 * repositories first.
 */
export function buildGlobalSkillOrder(strokes: Stroke[], skills: Skill[]): string[] {
  const strokeOrderById = new Map<string, number>(strokes.map((stroke) => [stroke.id, stroke.order]))

  function stageNumber(skill: Skill): number {
    const match = /stage(\d+)$/.exec(skill.stageId)
    return match ? Number(match[1]) : 0
  }

  return [...skills]
    .sort((a, b) => {
      // Shared common.* skills (no strokeId) come first — every route's
      // Stage 1 depends on them (PRD.md 第32节).
      const aStrokeOrder = a.strokeId ? (strokeOrderById.get(a.strokeId) ?? Number.MAX_SAFE_INTEGER) : -1
      const bStrokeOrder = b.strokeId ? (strokeOrderById.get(b.strokeId) ?? Number.MAX_SAFE_INTEGER) : -1
      if (aStrokeOrder !== bStrokeOrder) return aStrokeOrder - bStrokeOrder

      const aRoute = a.routeId ?? ""
      const bRoute = b.routeId ?? ""
      if (aRoute !== bRoute) return aRoute.localeCompare(bRoute)

      const aStage = stageNumber(a)
      const bStage = stageNumber(b)
      if (aStage !== bStage) return aStage - bStage

      return a.order - b.order
    })
    .map((skill) => skill.id)
}
