import type { SkillProgress, TrainingSession, UserSettings } from "../entities"

/**
 * Format of the backup JSON itself — bumped only if this shape changes,
 * independent of `curriculumVersion` (PRD.md 第22节 "课程版本"), which
 * tracks the *course content* the backup was made against.
 */
export const BACKUP_FORMAT_VERSION = "1.0.0"

/**
 * PRD.md 第25节: everything a backup must contain — user settings, skill
 * progress, training records (which carry their own per-session
 * self-assessment fields, PRD.md 第21节 "不单独建 Assessment 表") — and
 * nothing from the curriculum's static course data.
 */
export interface BackupData {
  backupVersion: string
  exportedAt: string
  /** The curriculum this backup was made against — not validated against
   * the app's current CURRICULUM_VERSION on import; it exists so the
   * import summary can tell the user *why* some records might not
   * resolve (PRD.md 第26节), not to block the import outright. */
  curriculumVersion: string
  userSettings: UserSettings
  skillProgress: SkillProgress[]
  trainingSessions: TrainingSession[]
}

/** PRD.md 第25节: `swim-path-backup-YYYY-MM-DD.json`. */
export function buildBackupFilename(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `swim-path-backup-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}.json`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export type BackupValidationResult = { valid: true; data: BackupData } | { valid: false; errors: string[] }

/**
 * PRD.md 第26节 步骤1 "验证 JSON schema": a structural check, not a full
 * re-derivation of every field — good enough to catch "this isn't a
 * SwimPath backup at all" or "a required array is missing/malformed"
 * before anything ever reaches IndexedDB (第26节: "必须防止错误 JSON
 * 导致整个数据库损坏"). Individual malformed records are reported by
 * index rather than aborting the whole file, so one bad row's message is
 * actionable.
 */
export function validateBackupData(value: unknown): BackupValidationResult {
  if (!isRecord(value)) {
    return { valid: false, errors: ["文件内容不是有效的 JSON 对象。"] }
  }

  const errors: string[] = []
  if (typeof value.backupVersion !== "string") errors.push("缺少 backupVersion 字段。")
  if (typeof value.exportedAt !== "string") errors.push("缺少 exportedAt 字段。")
  if (!isRecord(value.userSettings)) errors.push("缺少 userSettings 字段。")
  if (!Array.isArray(value.skillProgress)) errors.push("缺少 skillProgress 数组。")
  if (!Array.isArray(value.trainingSessions)) errors.push("缺少 trainingSessions 数组。")
  if (errors.length > 0) return { valid: false, errors }

  const skillProgress = value.skillProgress as unknown[]
  const trainingSessions = value.trainingSessions as unknown[]

  skillProgress.forEach((item, index) => {
    if (!isRecord(item) || typeof item.skillId !== "string" || typeof item.status !== "string") {
      errors.push(`技能进度第 ${index + 1} 条记录格式不正确（缺少 skillId/status）。`)
    }
  })
  trainingSessions.forEach((item, index) => {
    if (!isRecord(item) || typeof item.id !== "string" || typeof item.skillId !== "string" || typeof item.date !== "string") {
      errors.push(`训练记录第 ${index + 1} 条格式不正确（缺少 id/skillId/date）。`)
    }
  })
  if (errors.length > 0) return { valid: false, errors }

  return {
    valid: true,
    data: {
      backupVersion: value.backupVersion as string,
      exportedAt: value.exportedAt as string,
      curriculumVersion: typeof value.curriculumVersion === "string" ? value.curriculumVersion : "unknown",
      userSettings: value.userSettings as UserSettings,
      skillProgress: skillProgress as SkillProgress[],
      trainingSessions: trainingSessions as TrainingSession[],
    },
  }
}

export interface ImportSummary {
  exportedAt: string
  curriculumVersion: string
  sessionCount: number
  skillProgressCount: number
  /** PRD.md 第26节: records whose skillId isn't in the *current* curriculum
   * — these are still imported (see `backupRepository.replaceAll`), just
   * flagged here so the confirmation screen can warn the user they won't
   * show up anywhere in the UI. */
  unresolvedSkillCount: number
}

export function summarizeImport(data: BackupData, currentSkillIds: ReadonlySet<string>): ImportSummary {
  const unresolvedProgress = data.skillProgress.filter((p) => !currentSkillIds.has(p.skillId)).length
  const unresolvedSessions = data.trainingSessions.filter((s) => !currentSkillIds.has(s.skillId)).length
  return {
    exportedAt: data.exportedAt,
    curriculumVersion: data.curriculumVersion,
    sessionCount: data.trainingSessions.length,
    skillProgressCount: data.skillProgress.length,
    unresolvedSkillCount: unresolvedProgress + unresolvedSessions,
  }
}
