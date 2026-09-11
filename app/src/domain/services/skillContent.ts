import type { Language, Skill, TeachingModule } from "../entities"
import { MODULE_TRANSLATIONS_EN } from "../../i18n/moduleTranslations.en"

/**
 * PRD.md 第15节: if a content field is genuinely missing, the detail page
 * must show this placeholder instead of leaving the section blank or
 * erroring.
 */
export const CONTENT_PLACEHOLDER = "该项内容持续完善中"
export const CONTENT_PLACEHOLDER_EN = "Content coming soon"

/**
 * The fields a skill detail page renders, resolved from a Skill plus its
 * referenced TeachingModule (see skill.ts's class doc for the P1 decision
 * behind this split). A Skill-level value always wins when present — that
 * is the intended escape hatch for a skill that genuinely needs its own
 * text — otherwise the module's content is used, and only as a last
 * resort does a field fall back to `CONTENT_PLACEHOLDER`.
 *
 * This is pure and I/O-free: callers (a repository-backed hook, typically)
 * are responsible for loading `skill` and `module` from IndexedDB first.
 */
export interface ResolvedSkillContent {
  /** PRD.md 第15节 "为什么要学习" — a single sentence, not a list. */
  objective: string
  techniquePoints: string[]
  commonMistakes: string[]
  exercises: string[]
  passCriteria: string[]
  minimumMinutes?: number
  recommendedMinutes?: number
}

function pickList(skillValue: string[] | undefined, moduleValue: string[] | undefined, placeholder: string): string[] {
  if (skillValue && skillValue.length > 0) return skillValue
  if (moduleValue && moduleValue.length > 0) return moduleValue
  return [placeholder]
}

/** Same three-level fallback as `pickList`, but for the single-sentence
 * `objective` — Skill.objectives is a list override (a skill needing its
 * own text might have more than one sentence), TeachingModule.objective is
 * always exactly one sentence per swimming coach.md. */
function pickText(skillValue: string[] | undefined, moduleValue: string | undefined, placeholder: string): string {
  if (skillValue && skillValue.length > 0) return skillValue.join(" ")
  if (moduleValue) return moduleValue
  return placeholder
}

/**
 * `module` is undefined when a skill's `teachingModuleId` doesn't resolve
 * (shouldn't happen for seeded curriculum data, but a hand-edited or
 * future skill could reference a module that isn't loaded yet) — every
 * field falls back to the placeholder in that case rather than throwing.
 *
 * `language` (added for the 中/英 toggle, 用户请求) only affects which
 * *module*-sourced text is used — when `"en"`, the module's id is looked
 * up in `MODULE_TRANSLATIONS_EN` and that translation's fields are used in
 * place of the Chinese `module` fields. Skill-level overrides
 * (`skill.objectives`/`techniquePoints`/...) have no English counterpart
 * (the current curriculum never actually sets them — see skill.ts's class
 * doc — every skill's content comes from its module), so they still win
 * when present but stay Chinese; if a module has no English translation
 * either (shouldn't happen for seeded data, but defensive all the same),
 * this falls back to the Chinese module text rather than the placeholder,
 * exactly like a missing skill-title translation falls back to Chinese
 * elsewhere (`localize.ts`) instead of showing nothing useful.
 */
export function resolveSkillContent(
  skill: Skill,
  module: TeachingModule | undefined,
  language: Language = "zh",
): ResolvedSkillContent {
  const placeholder = language === "en" ? CONTENT_PLACEHOLDER_EN : CONTENT_PLACEHOLDER
  const translation = language === "en" && module ? MODULE_TRANSLATIONS_EN[module.id] : undefined
  const moduleObjective = translation?.objective ?? module?.objective
  const moduleTechniquePoints = translation?.techniquePoints ?? module?.techniquePoints
  const moduleCommonMistakes = translation?.commonMistakes ?? module?.commonMistakes
  const moduleExercises = translation?.exercises ?? module?.exercises
  const modulePassCriteria = translation?.passCriteria ?? module?.passCriteria

  return {
    objective: pickText(skill.objectives, moduleObjective, placeholder),
    techniquePoints: pickList(skill.techniquePoints, moduleTechniquePoints, placeholder),
    commonMistakes: pickList(skill.commonMistakes, moduleCommonMistakes, placeholder),
    exercises: pickList(skill.exercises, moduleExercises, placeholder),
    passCriteria: pickList(skill.passCriteria, modulePassCriteria, placeholder),
    minimumMinutes: skill.minimumMinutes ?? module?.minimumMinutes,
    recommendedMinutes: skill.recommendedMinutes ?? module?.recommendedMinutes,
  }
}
