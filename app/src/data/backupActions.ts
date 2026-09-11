import { backupRepository, skillProgressRepository, skillRepository, trainingSessionRepository, userSettingsRepository } from "./repositories"
import { CURRICULUM_VERSION } from "./curriculum"
import { BACKUP_FORMAT_VERSION, summarizeImport, validateBackupData } from "../domain/services"
import type { BackupData, ImportSummary } from "../domain/services"

/** PRD.md 第25节: assembles the exportable snapshot — settings, skill
 * progress, and training records — never the static curriculum data. */
export async function buildBackup(): Promise<BackupData> {
  const [userSettings, skillProgress, trainingSessions] = await Promise.all([
    userSettingsRepository.get(),
    skillProgressRepository.getAll(),
    trainingSessionRepository.getAll(),
  ])

  return {
    backupVersion: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    curriculumVersion: CURRICULUM_VERSION,
    userSettings,
    skillProgress,
    trainingSessions,
  }
}

export type ImportPreview = { ok: true; data: BackupData; summary: ImportSummary } | { ok: false; errors: string[] }

/** PRD.md 第26节 步骤1-2: validate + summarize, without writing anything —
 * lets the settings page show the summary and get user confirmation
 * before `commitImport` touches IndexedDB. */
export async function prepareImportPreview(raw: unknown): Promise<ImportPreview> {
  const result = validateBackupData(raw)
  if (!result.valid) return { ok: false, errors: result.errors }

  const currentSkills = await skillRepository.getAll()
  const currentSkillIds = new Set(currentSkills.map((skill) => skill.id))
  return { ok: true, data: result.data, summary: summarizeImport(result.data, currentSkillIds) }
}

/** PRD.md 第26节 步骤4: only called after the user has seen the preview and
 * confirmed. */
export async function commitImport(data: BackupData): Promise<void> {
  await backupRepository.replaceAll({
    trainingSessions: data.trainingSessions,
    skillProgress: data.skillProgress,
    userSettings: data.userSettings,
  })
}
