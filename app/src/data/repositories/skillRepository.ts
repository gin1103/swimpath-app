import { db } from "../db"
import type { Skill } from "../../domain/entities"

export const skillRepository = {
  async getAll(): Promise<Skill[]> {
    return db.skills.orderBy("order").toArray()
  },

  async getById(id: string): Promise<Skill | undefined> {
    return db.skills.get(id)
  },

  async getByStroke(strokeId: string): Promise<Skill[]> {
    return db.skills.where("strokeId").equals(strokeId).sortBy("order")
  },

  /** Used by curriculum seeding (a later phase) — never called from UI code. */
  async bulkPut(skills: Skill[]): Promise<void> {
    await db.skills.bulkPut(skills)
  },

  /**
   * Wipes the table and replaces it with `skills`, in one transaction —
   * unlike `bulkPut`, this also removes rows whose id is no longer part of
   * the curriculum (e.g. a renamed/removed skill id from a curriculum
   * content update), so a stale skill never lingers alongside its
   * replacement. Only `skills` is touched: a skill's own `SkillProgress`
   * row (keyed separately by `skillId`) is left alone even if its skill id
   * no longer exists here — see `syncCurriculumVersion` in
   * `src/data/seed.ts`, the only caller, for why that's the right thing to
   * do (PRD.md 第26节's "保留但暂不关联具体技能" behavior, same as an
   * orphaned import record).
   */
  async replaceAll(skills: Skill[]): Promise<void> {
    await db.transaction("rw", db.skills, async () => {
      await db.skills.clear()
      await db.skills.bulkAdd(skills)
    })
  },
}
