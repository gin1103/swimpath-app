import { db } from "../db"
import type { SkillProgress, TrainingSession, UserSettings } from "../../domain/entities"

export const backupRepository = {
  /**
   * PRD.md 第26节 JSON 导入: a full restore, not a merge — this is a
   * single-user local-only app (PRD.md 第2.1节 本地优先), so "import a
   * backup" means "replace what's here with what's in the file", not
   * reconcile two divergent histories. Runs as one Dexie transaction so a
   * failure partway through leaves the previous data intact rather than a
   * half-imported database (PRD.md 第26节 "必须防止错误 JSON 导致整个数据库损坏").
   *
   * Records whose skillId no longer matches the current curriculum are
   * still written here — see `summarizeImport` in
   * `src/domain/services/backup.ts` for why they're kept instead of
   * dropped.
   */
  async replaceAll(data: {
    trainingSessions: TrainingSession[]
    skillProgress: SkillProgress[]
    userSettings: UserSettings
  }): Promise<void> {
    await db.transaction("rw", db.trainingSessions, db.skillProgress, db.userSettings, async () => {
      await db.trainingSessions.clear()
      await db.skillProgress.clear()
      await db.trainingSessions.bulkAdd(data.trainingSessions)
      await db.skillProgress.bulkPut(data.skillProgress)
      await db.userSettings.put(data.userSettings)
    })
  },
}
