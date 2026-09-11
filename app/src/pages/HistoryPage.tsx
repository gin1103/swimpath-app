import { useEffect, useMemo, useState } from "react"
import { useCurriculumData } from "../app/hooks/useCurriculumData"
import { trainingSessionRepository } from "../data/repositories"
import { computeHistoryStats, filterSessionsByPeriod, type HistoryPeriod } from "../domain/services"
import type { TrainingSession } from "../domain/entities"
import { PagePlaceholder } from "../components/PagePlaceholder"
import { useLanguage } from "../i18n/LanguageContext"
import { useT } from "../i18n/uiStrings"
import { localizeSkillTitle, localizeStrokeName } from "../i18n/localize"

const PERIOD_OPTIONS: { id: HistoryPeriod; key: string }[] = [
  { id: "day", key: "history.periodDay" },
  { id: "week", key: "history.periodWeek" },
  { id: "month", key: "history.periodMonth" },
  { id: "all", key: "history.periodAll" },
]

/**
 * PRD.md 第20节: 总训练时间/训练次数/平均每次训练时间/各泳姿训练时间/每月
 * 训练时间/技能进步，支持按日/周/月/全部筛选。
 */
export function HistoryPage() {
  const { data, loading: curriculumLoading } = useCurriculumData()
  const { language } = useLanguage()
  const t = useT()
  const [sessions, setSessions] = useState<TrainingSession[] | undefined>(undefined)
  const [period, setPeriod] = useState<HistoryPeriod>("all")

  useEffect(() => {
    let cancelled = false
    trainingSessionRepository
      .getAll()
      .then((loaded) => {
        if (!cancelled) setSessions(loaded)
      })
      .catch((error: unknown) => {
        console.error("Failed to load training sessions", error)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const periodSessions = useMemo(
    () => (sessions ? filterSessionsByPeriod(sessions, period) : []),
    [sessions, period],
  )

  const stats = useMemo(() => {
    if (!sessions || !data) return undefined
    return computeHistoryStats({
      allSessions: sessions,
      periodSessions,
      allProgress: [...data.progressBySkillId.values()],
      period,
    })
  }, [sessions, periodSessions, data, period])

  if (curriculumLoading || !sessions) {
    return <PagePlaceholder title={t("history.title")} description={t("common.loading")} />
  }

  if (!data || !stats) {
    return <PagePlaceholder title={t("history.title")} description={t("common.noCurriculumData")} />
  }

  const periodLabel = t(PERIOD_OPTIONS.find((option) => option.id === period)?.key ?? "history.periodAll")
  const maxStrokeMinutes = Math.max(1, ...stats.minutesByStroke.map((entry) => entry.minutes))
  const maxMonthMinutes = Math.max(1, ...stats.monthlyMinutes.map((entry) => entry.minutes))

  return (
    <section className="history">
      <h1>{t("history.title")}</h1>

      <div className="history-tabs">
        {PERIOD_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={option.id === period ? "is-active" : undefined}
            onClick={() => setPeriod(option.id)}
          >
            {t(option.key)}
          </button>
        ))}
      </div>

      <div className="home-stats">
        <div className="home-stat">
          <p className="home-stat__value">{t("common.minutes", { n: stats.totalMinutes })}</p>
          <p className="home-stat__label">{t("history.totalTrainingTime", { period: periodLabel })}</p>
        </div>
        <div className="home-stat">
          <p className="home-stat__value">{t("history.sessionCountValue", { n: stats.sessionCount })}</p>
          <p className="home-stat__label">{t("history.sessionCount", { period: periodLabel })}</p>
        </div>
        <div className="home-stat">
          <p className="home-stat__value">{t("common.minutes", { n: stats.averageMinutes })}</p>
          <p className="home-stat__label">{t("history.averageSessionLength")}</p>
        </div>
      </div>

      <div className="home-card">
        <p className="home-card__meta-label">{t("history.timeByStroke", { period: periodLabel })}</p>
        {stats.minutesByStroke.length === 0 ? (
          <p className="home-card__empty">{t("history.noSessionsInRange")}</p>
        ) : (
          <ul className="history-bar-list">
            {stats.minutesByStroke.map((entry) => {
              const stroke = data.strokes.find((s) => s.id === entry.strokeId)
              const strokeName = stroke ? localizeStrokeName(stroke, language) : entry.strokeId
              return (
                <li key={entry.strokeId}>
                  <div className="history-bar-list__row">
                    <span>{strokeName}</span>
                    <span>{t("common.minutes", { n: entry.minutes })}</span>
                  </div>
                  <div className="history-bar">
                    <div
                      className="history-bar__fill"
                      style={{ width: `${(entry.minutes / maxStrokeMinutes) * 100}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="home-card">
        <p className="home-card__meta-label">{t("history.monthlyTrainingTime")}</p>
        {stats.monthlyMinutes.length === 0 ? (
          <p className="home-card__empty">{t("history.noSessionsYet")}</p>
        ) : (
          <ul className="history-bar-list">
            {stats.monthlyMinutes.map((entry) => (
              <li key={entry.month}>
                <div className="history-bar-list__row">
                  <span>{entry.month}</span>
                  <span>{t("common.minutes", { n: entry.minutes })}</span>
                </div>
                <div className="history-bar">
                  <div className="history-bar__fill" style={{ width: `${(entry.minutes / maxMonthMinutes) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="home-card">
        <p className="home-card__meta-label">{t("history.skillsProgressed", { period: periodLabel })}</p>
        {stats.recentlyCompletedSkills.length === 0 ? (
          <p className="home-card__empty">{t("history.noSkillsMasteredInRange")}</p>
        ) : (
          <ul className="history-progress-list">
            {stats.recentlyCompletedSkills.map((entry) => {
              const skill = data.skills.find((s) => s.id === entry.skillId)
              return (
                <li key={entry.skillId}>
                  <span>{skill ? localizeSkillTitle(skill, language) : entry.skillId}</span>
                  <span className="home-card__meta-label">
                    {new Date(entry.completedAt).toLocaleDateString(language === "en" ? "en-US" : "zh-CN", {
                      month: "numeric",
                      day: "numeric",
                    })}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
