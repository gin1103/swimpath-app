import { db } from "../db"
import type { SkillProgress } from "../../domain/entities"

export const skillProgressRepository = {
  async getAll(): Promise<SkillProgress[]> {
    return db.skillProgress.toArray()
  },

  async getBySkillId(skillId: string): Promise<SkillProgress | undefined> {
    return db.skillProgress.get(skillId)
  },

  async upsert(progress: SkillProgress): Promise<void> {
    await db.skillProgress.put(progress)
  },

  /** Used by curriculum seeding to materialize every skill's initial
   * locked/available status — never called from UI code. */
  async bulkPut(progress: SkillProgress[]): Promise<void> {
    await db.skillProgress.bulkPut(progress)
  },
}
