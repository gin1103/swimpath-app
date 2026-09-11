import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useCurriculumData } from "../app/hooks/useCurriculumData"
import { getProficiencyLabel } from "../app/proficiencyLabels"
import { getStatusLabel } from "../app/skillStatusLabels"
import { manuallyUnlockSkill } from "../data/skillProgressActions"
import { teachingModuleRepository } from "../data/repositories"
import { getStageLabel } from "../data/curriculum"
import { resolveSkillContent } from "../domain/services"
import type { SkillProgress, TeachingModule } from "../domain/entities"
import { PagePlaceholder } from "../components/PagePlaceholder"
import { useLanguage } from "../i18n/LanguageContext"
import { useT } from "../i18n/uiStrings"
import {
  localizeRouteName,
  localizeSafetyNotes,
  localizeSkillDescription,
  localizeSkillTitle,
  localizeStrokeName,
} from "../i18n/localize"

/**
 * PRD.md 第15节: 技能名称/学习阶段/预计学习时间/前置技能/为什么要学习/
 * 技术要领/练习方法/常见错误/自我检查/过关标准/我的训练时间/我的熟练度/
 * 我的备注 — plus (PRD.md 第8节) a manual-unlock affordance for a still
 * `locked` skill.
 *
 * "常见错误" and "自我检查" render as one interactive checklist (built
 * from the same commonMistakes content) and "过关标准" as a second one —
 * this matches the closing note in PRD.md 第15节 that only ever talks
 * about "这两组 checklist"; ticking either is a self-check aid only and is
 * never persisted (checkbox state resets if you leave the page), and none
 * of it feeds the unlock decision, which looks only at proficiency (第19节).
 */
export function SkillDetailPage() {
  const { strokeId: strokeIdParam, skillId } = useParams<{ strokeId: string; skillId: string }>()
  const { data, loading } = useCurriculumData()
  const { language } = useLanguage()
  const t = useT()

  const skill = useMemo(() => data?.skills.find((s) => s.id === skillId), [data, skillId])

  const [module, setModule] = useState<TeachingModule | undefined>(undefined)
  useEffect(() => {
    if (!skill) {
      setModule(undefined)
      return
    }
    let cancelled = false
    teachingModuleRepository
      .getById(skill.teachingModuleId)
      .then((loaded) => {
        if (!cancelled) setModule(loaded)
      })
      .catch((error: unknown) => {
        console.error("Failed to load teaching module", error)
      })
    return () => {
      cancelled = true
    }
  }, [skill])

  // Local copy of this skill's progress so a manual unlock can update the
  // page immediately without re-fetching the whole curriculum data hook.
  const [progress, setProgress] = useState<SkillProgress | undefined>(undefined)
  useEffect(() => {
    setProgress(skillId ? data?.progressBySkillId.get(skillId) : undefined)
  }, [data, skillId])

  const [mistakeChecks, setMistakeChecks] = useState<Record<number, boolean>>({})
  const [criteriaChecks, setCriteriaChecks] = useState<Record<number, boolean>>({})
  const [unlocking, setUnlocking] = useState(false)

  if (loading) {
    return <PagePlaceholder title={t("skillDetail.title")} description={t("common.loading")} />
  }

  if (!data || !skill) {
    return <PagePlaceholder title={t("skillDetail.title")} description={t("skillDetail.skillNotFound", { skillId: skillId ?? "" })} />
  }

  const content = resolveSkillContent(skill, module, language)
  const status = progress?.status ?? "locked"
  const stroke = skill.strokeId ? data.strokes.find((s) => s.id === skill.strokeId) : undefined
  const route = stroke?.routes?.find((r) => r.id === skill.routeId)
  const strokeLabel = stroke
    ? route
      ? `${localizeStrokeName(stroke, language)} · ${localizeRouteName(route, language)}`
      : localizeStrokeName(stroke, language)
    : t("common.commonBasics")
  const stageLabel = getStageLabel(skill.stageId, language)
  const safetyNotes = localizeSafetyNotes(skill.safetyNotes, language)

  const prerequisiteSkills = skill.prerequisites
    .map((id) => ({ skill: data.skills.find((s) => s.id === id), progress: data.progressBySkillId.get(id) }))
    .filter((entry): entry is { skill: NonNullable<typeof entry.skill>; progress: SkillProgress | undefined } =>
      Boolean(entry.skill),
    )

  const trainingHref = `/training?skillId=${skill.id}${
    skill.strokeId ? `&strokeId=${skill.strokeId}` : strokeIdParam ? `&strokeId=${strokeIdParam}` : ""
  }`

  async function handleManualUnlock() {
    if (!progress) return
    setUnlocking(true)
    try {
      const updated = await manuallyUnlockSkill(progress)
      setProgress(updated)
    } catch (error: unknown) {
      console.error("Failed to manually unlock skill", error)
    } finally {
      setUnlocking(false)
    }
  }

  return (
    <section className="skill-detail">
      {safetyNotes && safetyNotes.length > 0 && (
        <div className="skill-detail__safety">
          {safetyNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      )}

      <p className="skill-detail__breadcrumb">
        {strokeLabel} · {stageLabel}
      </p>
      <h1>{localizeSkillTitle(skill, language)}</h1>
      <p className="home-card__description">{localizeSkillDescription(skill, language)}</p>

      <div className="training-card">
        <p className="training-card__label">{t("skillDetail.status")}</p>
        <p>
          <span className={`skill-row__status skill-row__status--${status}`}>{getStatusLabel(status, language)}</span>
          {progress?.manualOverride && status === "available" && (
            <span className="skill-detail__manual-tag">{t("skillDetail.manualUnlockTag")}</span>
          )}
        </p>
        {status === "locked" && (
          <>
            <p className="home-card__description">{t("skillDetail.lockedExplanation")}</p>
            <button type="button" className="home-card__cta" disabled={unlocking} onClick={handleManualUnlock}>
              {unlocking ? t("skillDetail.unlocking") : t("skillDetail.manualUnlockButton")}
            </button>
          </>
        )}
        {status !== "locked" && (
          <Link className="home-card__cta" to={trainingHref}>
            {t("skillDetail.startTrainingLink")}
          </Link>
        )}
      </div>

      <div className="training-card">
        <p className="training-card__label">{t("skillDetail.estimatedTime")}</p>
        <p>
          {content.minimumMinutes !== undefined || content.recommendedMinutes !== undefined
            ? content.recommendedMinutes !== undefined && content.minimumMinutes !== undefined
              ? t("skillDetail.minutesRange", { min: content.minimumMinutes, max: content.recommendedMinutes })
              : t("common.minutes", { n: content.minimumMinutes ?? content.recommendedMinutes ?? 0 })
            : t("common.noCurriculumData") /* unreachable in practice: resolveSkillContent always fills a placeholder */}
        </p>
      </div>

      <div className="training-card">
        <p className="training-card__label">{t("skillDetail.prerequisites")}</p>
        {prerequisiteSkills.length === 0 ? (
          <p className="home-card__description">{t("common.none")}</p>
        ) : (
          <ul className="skill-detail__prereq-list">
            {prerequisiteSkills.map(({ skill: prereqSkill, progress: prereqProgress }) => (
              <li key={prereqSkill.id}>
                {localizeSkillTitle(prereqSkill, language)}
                <span
                  className={`skill-row__status skill-row__status--${prereqProgress?.status ?? "locked"}`}
                >
                  {getStatusLabel(prereqProgress?.status ?? "locked", language)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="training-card">
        <p className="training-card__label">{t("skillDetail.whyLearn")}</p>
        <p>{content.objective}</p>
      </div>

      <div className="training-card">
        <p className="training-card__label">{t("skillDetail.techniquePoints")}</p>
        <ul className="home-card__list">
          {content.techniquePoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="training-card">
        <p className="training-card__label">{t("skillDetail.exercises")}</p>
        <ul className="home-card__list">
          {content.exercises.map((exercise) => (
            <li key={exercise}>{exercise}</li>
          ))}
        </ul>
      </div>

      <div className="training-card">
        <p className="training-card__label">{t("skillDetail.commonMistakesChecklist")}</p>
        <ul className="skill-detail__checklist">
          {content.commonMistakes.map((mistake, index) => (
            <li key={mistake}>
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(mistakeChecks[index])}
                  onChange={(event) => setMistakeChecks((prev) => ({ ...prev, [index]: event.target.checked }))}
                />
                {mistake}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="training-card">
        <p className="training-card__label">{t("skillDetail.passCriteria")}</p>
        <ul className="skill-detail__checklist">
          {content.passCriteria.map((criterion, index) => (
            <li key={criterion}>
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(criteriaChecks[index])}
                  onChange={(event) => setCriteriaChecks((prev) => ({ ...prev, [index]: event.target.checked }))}
                />
                {criterion}
              </label>
            </li>
          ))}
        </ul>
        <p className="home-card__description">{t("skillDetail.checklistDisclaimer")}</p>
      </div>

      <div className="training-card home-card--current">
        <p className="training-card__label">{t("skillDetail.myTrainingAndAssessment")}</p>
        <p>{t("skillDetail.myTrainingTime", { n: progress?.totalMinutes ?? 0 })}</p>
        {progress?.lastPracticedAt && (
          <p className="home-card__description">
            {t("skillDetail.lastPracticed")}
            {new Date(progress.lastPracticedAt).toLocaleString(language === "en" ? "en-US" : "zh-CN", {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
        <p>
          {t("skillDetail.myProficiency", {
            n: progress?.proficiency ?? 0,
            label: getProficiencyLabel(progress?.proficiency ?? 0, language),
          })}
        </p>
        <p>{t("skillDetail.confidence", { n: progress?.confidence ?? 3 })}</p>
        <p>{t("skillDetail.stability", { n: progress?.stability ?? 3 })}</p>
        <p className="training-card__label">{t("skillDetail.myNotes")}</p>
        <p className="home-card__description">{progress?.notes || t("skillDetail.noNotes")}</p>
      </div>
    </section>
  )
}
