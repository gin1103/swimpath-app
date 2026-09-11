import { skillProgressRepository } from "./repositories"
import { applyManualUnlock } from "../domain/services"
import type { SkillProgress } from "../domain/entities"

/**
 * PRD.md 第8节: orchestration for the "手动解锁" action on the skill detail
 * page — composes the pure `applyManualUnlock` domain rule with the one
 * repository write it requires. Kept separate from `trainingActions.ts`
 * because this has nothing to do with recording a training session; it is
 * a standalone SkillProgress edit.
 */
export async function manuallyUnlockSkill(current: SkillProgress): Promise<SkillProgress> {
  const updated = applyManualUnlock(current)
  await skillProgressRepository.upsert(updated)
  return updated
}
