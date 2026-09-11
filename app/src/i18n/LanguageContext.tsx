import { createContext, useContext, useState, type ReactNode } from "react"
import { userSettingsRepository } from "../data/repositories"
import type { Language } from "../domain/entities"

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

/**
 * Settings 页的中/英切换 (用户请求): the whole app's display language lives
 * here as React context, initialized once from the persisted
 * `UserSettings.language` (loaded by `App.tsx` as part of its existing
 * startup sequence, alongside curriculum seeding/sync — see `App.tsx` —
 * so there's no flash of the wrong language after first paint).
 *
 * This only ever affects *display*: curriculum seed data
 * (skills.ts/teachingModules.ts) and every stored user record
 * (TrainingSession, SkillProgress, ...) stay Chinese-only in IndexedDB
 * regardless of this setting — components that need localized text call
 * the `localize()` helpers (`src/i18n/localize.ts`) or `useT()`
 * (`src/i18n/uiStrings.ts`) with the language this hook reports, rather
 * than storing translated copies anywhere.
 */
export function LanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage: Language
  children: ReactNode
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  function setLanguage(next: Language) {
    // Update the UI immediately; persist in the background. A failed write
    // just means the choice won't survive a reload — not worth blocking or
    // reverting the visible toggle over (same "best effort, log and move
    // on" pattern used elsewhere for settings writes).
    setLanguageState(next)
    userSettingsRepository.update({ language: next }).catch((error: unknown) => {
      console.error("Failed to persist language setting", error)
    })
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
