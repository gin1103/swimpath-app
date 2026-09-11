import { useRef, useState } from "react"
import type { ChangeEvent } from "react"
import { buildBackup, commitImport, prepareImportPreview } from "../data/backupActions"
import { buildBackupFilename } from "../domain/services"
import type { BackupData, ImportSummary } from "../domain/services"
import { useLanguage } from "../i18n/LanguageContext"
import { useT } from "../i18n/uiStrings"
import type { Language } from "../domain/entities"

type ImportState =
  | { step: "idle" }
  | { step: "error"; errors: string[] }
  | { step: "preview"; data: BackupData; summary: ImportSummary }
  | { step: "importing"; data: BackupData }
  | { step: "done" }

/**
 * PRD.md 第25/26节: JSON 数据导出/导入。安全须知回看（第30.1节）不在这次
 * 请求范围内，留待后续。
 *
 * 2026-09-11 新增：界面语言切换（中/英，用户请求）——`LanguageContext` 持有
 * 当前语言并负责持久化，这里只是它的开关 UI。
 */
export function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const t = useT()

  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState<string | undefined>(undefined)
  const [exportedFilename, setExportedFilename] = useState<string | undefined>(undefined)

  const [importState, setImportState] = useState<ImportState>({ step: "idle" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleExport() {
    setExporting(true)
    setExportError(undefined)
    try {
      const backup = await buildBackup()
      const filename = buildBackupFilename(new Date())
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
      setExportedFilename(filename)
    } catch (error: unknown) {
      console.error("Failed to export backup", error)
      setExportError(t("settings.exportFailed"))
    } finally {
      setExporting(false)
    }
  }

  async function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

    try {
      const text = await file.text()
      let parsed: unknown
      try {
        parsed = JSON.parse(text)
      } catch {
        setImportState({ step: "error", errors: [t("settings.invalidJson")] })
        return
      }
      const preview = await prepareImportPreview(parsed)
      if (!preview.ok) {
        setImportState({ step: "error", errors: preview.errors })
        return
      }
      setImportState({ step: "preview", data: preview.data, summary: preview.summary })
    } catch (error: unknown) {
      console.error("Failed to read backup file", error)
      setImportState({ step: "error", errors: [t("settings.readFileFailed")] })
    }
  }

  async function handleConfirmImport() {
    if (importState.step !== "preview") return
    setImportState({ step: "importing", data: importState.data })
    try {
      await commitImport(importState.data)
      setImportState({ step: "done" })
    } catch (error: unknown) {
      console.error("Failed to import backup", error)
      setImportState({ step: "error", errors: [t("settings.importFailed")] })
    }
  }

  return (
    <section className="settings">
      <h1>{t("settings.title")}</h1>

      <div className="home-card">
        <p className="home-card__meta-label">{t("settings.language")}</p>
        <div className="training-choice-grid">
          {(["zh", "en"] as Language[]).map((option) => (
            <button
              key={option}
              type="button"
              className={option === language ? "is-active" : undefined}
              onClick={() => setLanguage(option)}
            >
              {option === "zh" ? "中文" : "English"}
            </button>
          ))}
        </div>
      </div>

      <div className="home-card">
        <p className="home-card__meta-label">{t("settings.exportTitle")}</p>
        <p className="home-card__description">{t("settings.exportDescription")}</p>
        <button type="button" className="home-card__cta" disabled={exporting} onClick={handleExport}>
          {exporting ? t("settings.exporting") : t("settings.exportButton")}
        </button>
        {exportedFilename && (
          <p className="home-card__description">{t("settings.exportedAs", { filename: exportedFilename })}</p>
        )}
        {exportError && <p className="training-error">{exportError}</p>}
      </div>

      <div className="home-card">
        <p className="home-card__meta-label">{t("settings.importTitle")}</p>
        <p className="home-card__description">{t("settings.importDescription")}</p>

        {importState.step === "idle" && (
          <>
            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileSelected} />
          </>
        )}

        {importState.step === "error" && (
          <>
            <ul className="settings-import-errors">
              {importState.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileSelected} />
          </>
        )}

        {importState.step === "preview" && (
          <div className="settings-import-summary">
            <p>
              {t("settings.backupTime")}
              {new Date(importState.summary.exportedAt).toLocaleString(language === "en" ? "en-US" : "zh-CN", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>{t("settings.sessionCountLine", { n: importState.summary.sessionCount })}</p>
            <p>{t("settings.progressCountLine", { n: importState.summary.skillProgressCount })}</p>
            {importState.summary.unresolvedSkillCount > 0 && (
              <p className="training-error">
                {t("settings.unresolvedWarning", { n: importState.summary.unresolvedSkillCount })}
              </p>
            )}
            <div className="training-timer-controls">
              <button type="button" className="home-card__cta" onClick={handleConfirmImport}>
                {t("settings.confirmImport")}
              </button>
              <button type="button" onClick={() => setImportState({ step: "idle" })}>
                {t("common.cancel")}
              </button>
            </div>
          </div>
        )}

        {importState.step === "importing" && <p className="home-card__description">{t("settings.importing")}</p>}

        {importState.step === "done" && (
          <>
            <p className="home-card__description">{t("settings.importSuccess")}</p>
            <button type="button" className="home-card__cta" onClick={() => window.location.reload()}>
              {t("settings.refreshPage")}
            </button>
          </>
        )}
      </div>
    </section>
  )
}
