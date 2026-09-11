import { db } from "../db"
import type { TrainingSession } from "../../domain/entities"

export const trainingSessionRepository = {
  /** Most recent first. */
  async getAll(): Promise<TrainingSession[]> {
    return db.trainingSessions.orderBy("date").reverse().toArray()
  },

  async getBySkillId(skillId: string): Promise<TrainingSession[]> {
    return db.trainingSessions.where("skillId").equals(skillId).toArray()
  },

  async add(session: TrainingSession): Promise<void> {
    await db.trainingSessions.add(session)
  },
}
