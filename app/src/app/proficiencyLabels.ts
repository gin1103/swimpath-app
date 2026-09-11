import type { Language } from "../domain/entities"

/**
 * swimming coach.md 第3节's own 0-5 proficiency scale — reused verbatim so
 * every screen that shows a proficiency rating (training self-assessment,
 * the skill detail page) speaks in the same words as the source material.
 * Index `n` is the label for proficiency `n`.
 */
export const PROFICIENCY_LABELS = ["未开始", "已理解", "尝试中", "基本掌握", "稳定", "熟练"] as const

/** English counterpart, added for the 中/英 language toggle (用户请求). */
export const PROFICIENCY_LABELS_EN = [
  "Not Started",
  "Understood",
  "Attempting",
  "Basic Mastery",
  "Stable",
  "Proficient",
] as const

/** `index` is a 0-5 proficiency value. Defaults to "zh" so existing call
 * sites (written before the language toggle existed) keep working as an
 * index into `PROFICIENCY_LABELS` unchanged. */
export function getProficiencyLabel(index: number, language: Language = "zh"): string {
  const labels = language === "en" ? PROFICIENCY_LABELS_EN : PROFICIENCY_LABELS
  return labels[index] ?? labels[0]
}
