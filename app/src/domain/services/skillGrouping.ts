import type { Skill } from "../entities"

/**
 * The shared common.* skills that a given (already stroke/route-filtered)
 * skill list actually depends on, found via Stage 1's own
 * `prerequisites` rather than a hardcoded list — this is what keeps
 * 仰泳's tree from showing common.water.exhale even though every other
 * stroke needs it (PRD.md 第32节). Used by both SkillTreePage (to render
 * a "Stage 0" section) and TrainingPage (to offer these as trainable
 * skills once a stroke is picked).
 */
export function findRelevantCommonSkills(routeSkills: Skill[], allSkills: Skill[]): Skill[] {
  const commonIds = new Set<string>()
  for (const skill of routeSkills) {
    if (skill.stageId.endsWith(".stage1")) {
      skill.prerequisites.forEach((id) => commonIds.add(id))
    }
  }
  return allSkills.filter((skill) => commonIds.has(skill.id))
}
