import type { Language, SkillStatus } from "../domain/entities"

/** Shared Chinese labels for SkillProgress.status, used by both the skill
 * tree and the training flow's skill picker so the wording never drifts
 * between the two. */
export const SKILL_STATUS_LABELS: Record<SkillStatus, string> = {
  locked: "未解锁",
  available: "可开始",
  learning: "学习中",
  completed: "已掌握",
}

/** English counterpart, added for the 中/英 language toggle (用户请求). */
export const SKILL_STATUS_LABELS_EN: Record<SkillStatus, string> = {
  locked: "Locked",
  available: "Available",
  learning: "Learning",
  completed: "Mastered",
}

/** Looks up the status label in whichever language the caller passes —
 * defaults to "zh" so existing call sites keep working unchanged. */
export function getStatusLabel(status: SkillStatus, language: Language = "zh"): string {
  return language === "en" ? SKILL_STATUS_LABELS_EN[status] : SKILL_STATUS_LABELS[status]
}
