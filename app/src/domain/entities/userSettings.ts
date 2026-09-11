/**
 * PRD.md 第21节. There is only ever one settings row; `id` is a fixed
 * literal so Dexie has a primary key to store it under (an implementation
 * detail — PRD.md's own type sketch doesn't need an id since it never
 * described this as a keyed collection).
 */
/** UI display language. Curriculum data (skills.ts/teachingModules.ts) and
 * all stored user records stay Chinese-only — this only selects which
 * language the `localize()` helpers (`src/i18n/`) resolve text into for
 * display, never what's persisted. */
export type Language = "zh" | "en"

export interface UserSettings {
  id: "singleton"
  preferredUnit: "metric"
  defaultSessionMinutes?: number
  /** Set once the user has acknowledged the safety notice (PRD.md 第30节). */
  hasSeenSafetyNotice: boolean
  /**
   * The `CURRICULUM_VERSION` (PRD.md 第22节 "课程版本") that was last
   * synced into this install's `skills`/`teachingModules` tables. Absent on
   * an install that predates this field (treated as "needs a sync", same
   * as any other mismatch) — see `syncCurriculumVersion` in
   * `src/data/seed.ts`, which is what actually reads and updates it.
   */
  curriculumVersion?: string
  /** Absent means "zh" (the app's original, and only, language before this
   * field existed) — see `DEFAULT_USER_SETTINGS` below and
   * `src/i18n/LanguageContext.tsx`. */
  language?: Language
}

export const SETTINGS_ROW_ID: UserSettings["id"] = "singleton"

export const DEFAULT_USER_SETTINGS: UserSettings = {
  id: SETTINGS_ROW_ID,
  preferredUnit: "metric",
  hasSeenSafetyNotice: false,
}
