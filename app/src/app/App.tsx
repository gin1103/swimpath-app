import { useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { seedCurriculumIfEmpty, seedStrokesIfEmpty, syncCurriculumVersion } from "../data/seed"
import { userSettingsRepository } from "../data/repositories"
import { LanguageProvider } from "../i18n/LanguageContext"
import type { Language } from "../domain/entities"

export function App() {
  const [ready, setReady] = useState(false)
  // Default "zh" until userSettings loads — matches UserSettings.language's
  // own "absent = zh" convention (see domain/entities/userSettings.ts), so
  // there's nothing to reconcile once the real value comes back below.
  const [initialLanguage, setInitialLanguage] = useState<Language>("zh")

  useEffect(() => {
    // seedCurriculumIfEmpty must resolve first: it's what turns a genuinely
    // empty `skills` table into a real install, and syncCurriculumVersion
    // needs *some* existing SkillProgress rows in place to correctly tell
    // "new skill, needs a progress row" apart from "existing skill" once it
    // runs (see syncCurriculumVersion's doc comment in src/data/seed.ts).
    Promise.all([seedStrokesIfEmpty(), seedCurriculumIfEmpty()])
      .then(() => syncCurriculumVersion())
      .then(() => userSettingsRepository.get())
      .then((settings) => setInitialLanguage(settings.language ?? "zh"))
      .catch((error: unknown) => {
        console.error("Failed to seed initial data", error)
      })
      .finally(() => setReady(true))
  }, [])

  // Avoid flashing routed pages before the one-time seed resolves (and, now,
  // before we know which language to render them in).
  if (!ready) return null

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <RouterProvider router={router} />
    </LanguageProvider>
  )
}
