import { db } from "../db"
import type { TeachingModule } from "../../domain/entities"

export const teachingModuleRepository = {
  async getAll(): Promise<TeachingModule[]> {
    return db.teachingModules.toArray()
  },

  async getById(id: string): Promise<TeachingModule | undefined> {
    return db.teachingModules.get(id)
  },

  /** Used by curriculum seeding — never called from UI code. */
  async bulkPut(modules: TeachingModule[]): Promise<void> {
    await db.teachingModules.bulkPut(modules)
  },

  /**
   * Wipes the table and replaces it with `modules`, in one transaction —
   * see `skillRepository.replaceAll` for why a full replace (not
   * `bulkPut`) is needed when a curriculum content update renames/removes
   * module ids. Only `syncCurriculumVersion` (`src/data/seed.ts`) calls
   * this.
   */
  async replaceAll(modules: TeachingModule[]): Promise<void> {
    await db.transaction("rw", db.teachingModules, async () => {
      await db.teachingModules.clear()
      await db.teachingModules.bulkAdd(modules)
    })
  },
}
