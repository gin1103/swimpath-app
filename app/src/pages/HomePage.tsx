import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useCurriculumData } from "../app/hooks/useCurriculumData"
import { getStageLabel } from "../data/curriculum"
import { teachingModuleRepository, trainingSessionRepository } from "../data/repositories"
import { buildGlobalSkillOrder, deriveCurrentSkillId, resolveSkillContent } from "../domain/services"
import type { TeachingModule, TrainingSession } from "../domain/entities"
import { PagePlaceholder } from "../components/PagePlaceholder"
import { useLanguage } from "../i18n/LanguageContext"
import { useT } from "../i18n/uiStrings"
import { localizeSkillDescription, localizeSkillTitle, localizeStrokeName, localizeRouteName } from "../i18n/localize"

/**
 * PRD.md 第16节: 当前泳姿 / 当前阶段 / 当前技能 / 总体进度 / 累计训练时间 /
 * 最近一次训练 / 今天建议训练内容 — all derived here from repository data,
 * never stored as their own fields (see currentSkill.ts's class doc).
 */
export function HomePage() {
  const { data, loading } = useCurriculumData()
  const { language } = useLanguage()
  const t = useT()
  const [recentSession, setRecentSession] = useState<TrainingSession | undefined>(undefined)
  const [sessionsLoaded, setSessionsLoaded] = useState(false)
  const [currentModule, setCurrentModule] = useState<TeachingModule | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    trainingSessionRepository
      .getAll()
      .then((sessions) => {
        if (!cancelled) setRecentSession(sessions[0])
      })
      .catch((error: unknown) => {
        console.error("Failed to load training sessions", error)
      })
      .finally(() => {
        if (!cancelled) setSessionsLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const currentSkillId = useMemo(() => {
    if (!data) return undefined
    const globalOrder = buildGlobalSkillOrder(data.strokes, data.skills)
    return deriveCurrentSkillId([...data.progressBySkillId.values()], globalOrder)
  }, [data])

  const currentSkill = useMemo(() => {
    if (!data || !currentSkillId) return undefined
    return data.skills.find((skill) => skill.id === currentSkillId)
  }, [data, currentSkillId])

  useEffect(() => {
    if (!currentSkill) {
      setCurrentModule(undefined)
      return
    }
    let cancelled = false
    teachingModuleRepository
      .getById(currentSkill.teachingModuleId)
      .then((module) => {
        if (!cancelled) setCurrentModule(module)
      })
      .catch((error: unknown) => {
        console.error("Failed to load teaching module", error)
      })
    return () => {
      cancelled = true
    }
  }, [currentSkill])

  if (loading || !sessionsLoaded) {
    return <PagePlaceholder title={t("home.title")} description={t("common.loading")} />
  }

  if (!data || !currentSkill) {
    // Shouldn't happen once the app has seeded once, but keeps the page
    // from crashing outright if IndexedDB is ever empty (e.g. the user
    // cleared site data mid-session).
    return <PagePlaceholder title={t("home.title")} description={t("common.noCurriculumData")} />
  }

  const currentStroke = currentSkill.strokeId ? data.strokes.find((s) => s.id === currentSkill.strokeId) : undefined
  const currentRoute = currentStroke?.routes?.find((route) => route.id === currentSkill.routeId)
  const strokeLabel = currentStroke
    ? currentRoute
      ? `${localizeStrokeName(currentStroke, language)} · ${localizeRouteName(currentRoute, language)}`
      : localizeStrokeName(currentStroke, language)
    : t("common.commonBasics")
  const stageLabel = getStageLabel(currentSkill.stageId, language)
  const skillTitle = localizeSkillTitle(currentSkill, language)
  const skillDescription = localizeSkillDescription(currentSkill, language)

  const content = resolveSkillContent(currentSkill, currentModule, language)

  const allProgress = [...data.progressBySkillId.values()]
  const completedCount = allProgress.filter((p) => p.status === "completed").length
  const totalMinutes = allProgress.reduce((sum, p) => sum + p.totalMinutes, 0)

  return (
    <section className="home">
      <h1>{t("home.title")}</h1>

      <div className="home-card home-card--current">
        <p className="home-card__eyebrow">
          {strokeLabel} · {stageLabel}
        </p>
        <p className="home-card__skill">{skillTitle}</p>
        <p className="home-card__description">{skillDescription}</p>
      </div>

      <div className="home-stats">
        <div className="home-stat">
          <p className="home-stat__value">
            {completedCount} / {data.skills.length}
          </p>
          <p className="home-stat__label">{t("home.overallProgress")}</p>
        </div>
        <div className="home-stat">
          <p className="home-stat__value">{t("common.minutes", { n: totalMinutes })}</p>
          <p className="home-stat__label">{t("home.totalTrainingTime")}</p>
        </div>
      </div>

      <div className="home-card">
        <p className="home-card__meta-label">{t("home.mostRecentSession")}</p>
        {recentSession ? (
          <p>
            {new Date(recentSession.date).toLocaleString(language === "en" ? "en-US" : "zh-CN", {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            · {t("common.minutes", { n: recentSession.durationMinutes })}
          </p>
        ) : (
          <p className="home-card__empty">{t("home.noSessionYet")}</p>
        )}
      </div>

      <div className="home-strokes">
        {data.strokes.map((stroke) => (
          <Link key={stroke.id} className="home-strokes__item" to={`/skills/${stroke.id}`}>
            {localizeStrokeName(stroke, language)}
          </Link>
        ))}
      </div>

      <div className="home-card">
        <p className="home-card__meta-label">{t("home.todaysSuggestion")}</p>
        <p className="home-card__skill">
          {strokeLabel} → {skillTitle}
        </p>
        {content.recommendedMinutes !== undefined && (
          <p className="home-card__description">{t("home.recommendedMinutes", { n: content.recommendedMinutes })}</p>
        )}
        {content.techniquePoints.slice(0, 3).length > 0 && (
          <ul className="home-card__list">
            {content.techniquePoints.slice(0, 3).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
        <Link
          className="home-card__cta"
          to={`/training?skillId=${currentSkill.id}${currentSkill.strokeId ? `&strokeId=${currentSkill.strokeId}` : ""}`}
        >
          {t("home.startTodayTraining")}
        </Link>
      </div>
    </section>
  )
}
