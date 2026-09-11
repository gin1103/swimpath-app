import { db } from "../db"
import type { Stroke } from "../../domain/entities"

export const strokeRepository = {
  async getAll(): Promise<Stroke[]> {
    return db.strokes.orderBy("order").toArray()
  },

  async bulkPut(strokes: Stroke[]): Promise<void> {
    await db.strokes.bulkPut(strokes)
  },
}
