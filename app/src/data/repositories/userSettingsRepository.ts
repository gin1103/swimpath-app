import { db } from "../db"
import { DEFAULT_USER_SETTINGS, SETTINGS_ROW_ID, type UserSettings } from "../../domain/entities"

export const userSettingsRepository = {
  async get(): Promise<UserSettings> {
    const existing = await db.userSettings.get(SETTINGS_ROW_ID)
    return existing ?? DEFAULT_USER_SETTINGS
  },

  async update(patch: Partial<Omit<UserSettings, "id">>): Promise<UserSettings> {
    const current = await this.get()
    const next: UserSettings = { ...current, ...patch }
    await db.userSettings.put(next)
    return next
  },
}
