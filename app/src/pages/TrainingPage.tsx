import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useCurriculumData } from "../app/hooks/useCurriculumData"
import { PROFICIENCY_LABELS, PROFICIENCY_LABELS_EN } from "../app/proficiencyLabels"
import { saveTrainingSession } from "../data/trainingActions"
import { teachingModuleRepository } from "../data/repositories"
import { findRelevantCommonSkills, resolveSkillContent, UNLOCK_PROFICIENCY_THRESHOLD } from "../domain/services"
import type { Skill, SkillProgress, TeachingModule } from "../domain/entities"
import { PagePlaceholder } from "../components/PagePlaceholder"
import { useLanguage } from "../i18n/LanguageContext"
import { useT } from "../i18n/uiStrings"
import { localizeRouteName, localizeSkillTitle, localizeStrokeName } from "../i18n/localize"

type Step = "select" | "timer" | "assessment" | "done"

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

/** `URLSearchParams.get` returns `null` for a missing key but `""` for a
 * present-but-empty one (e.g. HomePage linking a common.* skill that has
 * no strokeId of its own) — both mean "nothing selected" here, so `??`
 * alone isn't enough. */
function readParam(searchParams: URLSearchParams, key: string): string | undefined {
  return searchParams.get(key) || undefined
}

/**
 * PRD.md 第17-19节: 选择泳姿 → 选择技能 → 设置训练时间 → 开始计时 →
 * 暂停/继续 → 结束训练 → 自评 → 记录备注 → 保存训练。
 */
export function TrainingPage() {
  const [searchParams] = useSearchParams()
  const { data, loading } = useCurriculumData()
  const { language } = useLanguage()
  const t = useT()

  const [step, setStep] = useState<Step>("select")
  const [strokeId, setStrokeId] = useState<string | undefined>(readParam(searchParams, "strokeId"))
  const [routeId, setRouteId] = useState<string | undefined>(undefined)
  const [skillId, setSkillId] = useState<string | undefined>(readParam(searchParams, "skillId"))

  // Once curriculum data has loaded, resolve a skillId passed in via the
  // Home page's "开始今天训练" link into its stroke/route too. A shared
  // common.* skill has no strokeId of its own, so this falls back to the
  // ?strokeId= param — and if neither is set, leaves strokeId unset so the
  // user picks a stroke on the select step (the skill stays preselected
  // and will already be highlighted once they do, since every stroke's
  // Stage 1 depends on at least some of the common.* skills).
  useEffect(() => {
    if (!data) return
    const initialSkillId = readParam(searchParams, "skillId")
    if (!initialSkillId) return
    const skill = data.skills.find((s) => s.id === initialSkillId)
    if (!skill) return
    setStrokeId(skill.strokeId ?? readParam(searchParams, "strokeId"))
    setRouteId(skill.routeId)
    setSkillId(skill.id)
    // Only meant to run once, the first time `data` becomes available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const stroke = useMemo(() => data?.strokes.find((s) => s.id === strokeId), [data, strokeId])
  const routes = stroke?.routes
  const activeRouteId = routes ? (routeId ?? routes[0]?.id) : undefined

  const routeSkills = useMemo(() => {
    if (!data || !strokeId) return []
    return data.skills.filter((skill) => skill.strokeId === strokeId && (!routes || skill.routeId === activeRouteId))
  }, [data, strokeId, routes, activeRouteId])

  const commonSkills = useMemo(() => {
    if (!data) return []
    return findRelevantCommonSkills(routeSkills, data.skills)
  }, [data, routeSkills])

  const selectableSkills = useMemo(() => {
    if (!data) return []
    return [...commonSkills, ...routeSkills].filter(
      (skill) => data.progressBySkillId.get(skill.id)?.status !== "locked",
    )
  }, [data, commonSkills, routeSkills])

  const selectedSkill = useMemo(
    () => selectableSkills.find((skill) => skill.id === skillId),
    [selectableSkills, skillId],
  )

  const [selectedModule, setSelectedModule] = useState<TeachingModule | undefined>(undefined)
  useEffect(() => {
    if (!selectedSkill) {
      setSelectedModule(undefined)
      return
    }
    let cancelled = false
    teachingModuleRepository
      .getById(selectedSkill.teachingModuleId)
      .then((module) => {
        if (!cancelled) setSelectedModule(module)
      })
      .catch((error: unknown) => {
        console.error("Failed to load teaching module", error)
      })
    return () => {
      cancelled = true
    }
  }, [selectedSkill])

  const [targetMinutes, setTargetMinutes] = useState(30)
  useEffect(() => {
    if (!selectedSkill) return
    const content = resolveSkillContent(selectedSkill, selectedModule, language)
    if (content.recommendedMinutes !== undefined) setTargetMinutes(content.recommendedMinutes)
    // Only re-derive the default when the skill/module changes, not on
    // every language switch — otherwise toggling language mid-session would
    // silently reset a target the user may already have edited.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkill, selectedModule])

  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  const [proficiency, setProficiency] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [stability, setStability] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [fatigue, setFatigue] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [notes, setNotes] = useState("")

  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | undefined>(undefined)
  const [savedDurationMinutes, setSavedDurationMinutes] = useState(0)
  const [savedStatus, setSavedStatus] = useState<SkillProgress["status"]>("learning")

  function resetForAnotherSession() {
    setStep("select")
    setSkillId(undefined)
    setElapsedSeconds(0)
    setIsRunning(false)
    setProficiency(0)
    setConfidence(3)
    setStability(3)
    setFatigue(3)
    setNotes("")
    setSaveError(undefined)
  }

  async function handleSave() {
    if (!selectedSkill || !data || !strokeId) return
    setSaving(true)
    setSaveError(undefined)
    try {
      const durationMinutes = Math.round(elapsedSeconds / 60)
      const updatedProgress = await saveTrainingSession({
        skill: selectedSkill,
        allSkills: data.skills,
        strokeId,
        durationMinutes,
        assessment: { proficiency, confidence, stability, fatigue },
        notes: notes.trim() || undefined,
      })
      setSavedDurationMinutes(durationMinutes)
      setSavedStatus(updatedProgress.status)
      setStep("done")
    } catch (error: unknown) {
      console.error("Failed to save training session", error)
      setSaveError(t("training.saveFailed"))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <PagePlaceholder title={t("training.title")} description={t("common.loading")} />
  }

  if (!data) {
    return <PagePlaceholder title={t("training.title")} description={t("common.noCurriculumData")} />
  }

  return (
    <section className="training">
      <h1>{t("training.title")}</h1>

      {step === "select" && (
        <SelectStep
          strokes={data.strokes}
          strokeId={strokeId}
          routes={routes}
          activeRouteId={activeRouteId}
          selectableSkills={selectableSkills}
          skillId={skillId}
          onSelectStroke={(id) => {
            setStrokeId(id)
            setRouteId(undefined)
            setSkillId(undefined)
          }}
          onSelectRoute={(id) => {
            setRouteId(id)
            setSkillId(undefined)
          }}
          onSelectSkill={setSkillId}
          canProceed={Boolean(selectedSkill)}
          onNext={() => setStep("timer")}
        />
      )}

      {step === "timer" && selectedSkill && (
        <TimerStep
          skill={selectedSkill}
          targetMinutes={targetMinutes}
          onTargetMinutesChange={setTargetMinutes}
          elapsedSeconds={elapsedSeconds}
          isRunning={isRunning}
          onStart={() => setIsRunning(true)}
          onPause={() => setIsRunning(false)}
          onResume={() => setIsRunning(true)}
          onFinish={() => {
            setIsRunning(false)
            setStep("assessment")
          }}
        />
      )}

      {step === "assessment" && selectedSkill && (
        <AssessmentStep
          skill={selectedSkill}
          durationMinutes={Math.round(elapsedSeconds / 60)}
          proficiency={proficiency}
          confidence={confidence}
          stability={stability}
          fatigue={fatigue}
          notes={notes}
          saving={saving}
          saveError={saveError}
          onProficiencyChange={setProficiency}
          onConfidenceChange={setConfidence}
          onStabilityChange={setStability}
          onFatigueChange={setFatigue}
          onNotesChange={setNotes}
          onSave={handleSave}
        />
      )}

      {step === "done" && selectedSkill && (
        <DoneStep
          skill={selectedSkill}
          durationMinutes={savedDurationMinutes}
          proficiency={proficiency}
          status={savedStatus}
          onTrainAgain={resetForAnotherSession}
        />
      )}
    </section>
  )
}

function SelectStep({
  strokes,
  strokeId,
  routes,
  activeRouteId,
  selectableSkills,
  skillId,
  onSelectStroke,
  onSelectRoute,
  onSelectSkill,
  canProceed,
  onNext,
}: {
  strokes: { id: string; name: string }[]
  strokeId: string | undefined
  routes: { id: string; name: string }[] | undefined
  activeRouteId: string | undefined
  selectableSkills: Skill[]
  skillId: string | undefined
  onSelectStroke: (id: string) => void
  onSelectRoute: (id: string) => void
  onSelectSkill: (id: string) => void
  canProceed: boolean
  onNext: () => void
}) {
  const { language } = useLanguage()
  const t = useT()
  return (
    <div>
      <div className="training-card">
        <p className="training-card__label">{t("training.step1ChooseStroke")}</p>
        <div className="training-choice-grid">
          {strokes.map((stroke) => (
            <button
              key={stroke.id}
              type="button"
              className={stroke.id === strokeId ? "is-active" : undefined}
              onClick={() => onSelectStroke(stroke.id)}
            >
              {localizeStrokeName(stroke, language)}
            </button>
          ))}
        </div>
      </div>

      {routes && (
        <div className="training-card">
          <p className="training-card__label">{t("training.chooseRoute")}</p>
          <div className="training-choice-grid">
            {routes.map((route) => (
              <button
                key={route.id}
                type="button"
                className={route.id === activeRouteId ? "is-active" : undefined}
                onClick={() => onSelectRoute(route.id)}
              >
                {localizeRouteName(route, language)}
              </button>
            ))}
          </div>
        </div>
      )}

      {strokeId && (
        <div className="training-card">
          <p className="training-card__label">{t("training.step2ChooseSkill")}</p>
          {selectableSkills.length === 0 ? (
            <p className="home-card__empty">{t("training.noSkillsOnRoute")}</p>
          ) : (
            <ul className="training-skill-list">
              {selectableSkills.map((skill) => (
                <li key={skill.id}>
                  <button
                    type="button"
                    className={skill.id === skillId ? "is-active" : undefined}
                    onClick={() => onSelectSkill(skill.id)}
                  >
                    {localizeSkillTitle(skill, language)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <button type="button" className="home-card__cta training-next" disabled={!canProceed} onClick={onNext}>
        {t("training.nextSetTime")}
      </button>
    </div>
  )
}

function TimerStep({
  skill,
  targetMinutes,
  onTargetMinutesChange,
  elapsedSeconds,
  isRunning,
  onStart,
  onPause,
  onResume,
  onFinish,
}: {
  skill: Skill
  targetMinutes: number
  onTargetMinutesChange: (minutes: number) => void
  elapsedSeconds: number
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onFinish: () => void
}) {
  const { language } = useLanguage()
  const t = useT()
  const hasStarted = elapsedSeconds > 0 || isRunning

  return (
    <div className="training-card">
      <p className="training-card__label">{localizeSkillTitle(skill, language)}</p>

      <label className="training-target">
        {t("training.step3SetTime")}
        <input
          type="number"
          min={1}
          value={targetMinutes}
          disabled={hasStarted}
          onChange={(event) => onTargetMinutesChange(Number(event.target.value) || 1)}
        />
      </label>

      <p className="training-timer">{formatElapsed(elapsedSeconds)}</p>
      <p className="home-card__description">{t("training.target", { n: targetMinutes })}</p>

      <div className="training-timer-controls">
        {!hasStarted && (
          <button type="button" className="home-card__cta" onClick={onStart}>
            {t("training.startTimer")}
          </button>
        )}
        {isRunning && (
          <button type="button" onClick={onPause}>
            {t("training.pause")}
          </button>
        )}
        {!isRunning && hasStarted && (
          <button type="button" onClick={onResume}>
            {t("training.resume")}
          </button>
        )}
        {hasStarted && (
          <button type="button" className="home-card__cta" onClick={onFinish}>
            {t("training.finish")}
          </button>
        )}
      </div>
    </div>
  )
}

function RatingButtons<T extends number>({
  value,
  options,
  labels,
  onChange,
}: {
  value: T
  options: readonly T[]
  labels?: readonly string[]
  onChange: (value: T) => void
}) {
  return (
    <div className="training-choice-grid">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          className={option === value ? "is-active" : undefined}
          onClick={() => onChange(option)}
        >
          {labels ? labels[index] : option}
        </button>
      ))}
    </div>
  )
}

function AssessmentStep({
  skill,
  durationMinutes,
  proficiency,
  confidence,
  stability,
  fatigue,
  notes,
  saving,
  saveError,
  onProficiencyChange,
  onConfidenceChange,
  onStabilityChange,
  onFatigueChange,
  onNotesChange,
  onSave,
}: {
  skill: Skill
  durationMinutes: number
  proficiency: 0 | 1 | 2 | 3 | 4 | 5
  confidence: 1 | 2 | 3 | 4 | 5
  stability: 1 | 2 | 3 | 4 | 5
  fatigue: 1 | 2 | 3 | 4 | 5
  notes: string
  saving: boolean
  saveError: string | undefined
  onProficiencyChange: (value: 0 | 1 | 2 | 3 | 4 | 5) => void
  onConfidenceChange: (value: 1 | 2 | 3 | 4 | 5) => void
  onStabilityChange: (value: 1 | 2 | 3 | 4 | 5) => void
  onFatigueChange: (value: 1 | 2 | 3 | 4 | 5) => void
  onNotesChange: (value: string) => void
  onSave: () => void
}) {
  const { language } = useLanguage()
  const t = useT()
  const proficiencyLabels = language === "en" ? PROFICIENCY_LABELS_EN : PROFICIENCY_LABELS

  return (
    <div className="training-card">
      <p className="training-card__label">{t("training.thisSession")}</p>
      <p className="home-card__skill">{localizeSkillTitle(skill, language)}</p>
      <p className="home-card__description">{t("common.minutes", { n: durationMinutes })}</p>

      <p className="training-card__label">{t("training.step4Proficiency")}</p>
      <RatingButtons
        value={proficiency}
        options={[0, 1, 2, 3, 4, 5] as const}
        labels={proficiencyLabels}
        onChange={onProficiencyChange}
      />
      <p className="home-card__description">{t("training.thresholdHint", { n: UNLOCK_PROFICIENCY_THRESHOLD })}</p>

      <p className="training-card__label">{t("training.confidence")}</p>
      <RatingButtons value={confidence} options={[1, 2, 3, 4, 5] as const} onChange={onConfidenceChange} />

      <p className="training-card__label">{t("training.stability")}</p>
      <RatingButtons value={stability} options={[1, 2, 3, 4, 5] as const} onChange={onStabilityChange} />

      <p className="training-card__label">{t("training.fatigue")}</p>
      <RatingButtons value={fatigue} options={[1, 2, 3, 4, 5] as const} onChange={onFatigueChange} />

      <label className="training-notes">
        {t("training.notesStep")}
        <textarea value={notes} onChange={(event) => onNotesChange(event.target.value)} rows={3} />
      </label>

      {saveError && <p className="training-error">{saveError}</p>}

      <button type="button" className="home-card__cta training-next" disabled={saving} onClick={onSave}>
        {saving ? t("training.saving") : t("training.saveTraining")}
      </button>
    </div>
  )
}

function DoneStep({
  skill,
  durationMinutes,
  proficiency,
  status,
  onTrainAgain,
}: {
  skill: Skill
  durationMinutes: number
  proficiency: number
  status: SkillProgress["status"]
  onTrainAgain: () => void
}) {
  const { language } = useLanguage()
  const t = useT()
  const meetsThresholdNow = proficiency >= UNLOCK_PROFICIENCY_THRESHOLD

  // `status` reflects the skill's *stored* progress, which stays
  // "completed" once ever reached even if a later self-assessment is
  // lower (see computeUpdatedSkillProgress) — so a low-scoring retrain of
  // an already-completed skill gets its own message rather than
  // incorrectly implying nothing has unlocked yet.
  let message: string
  if (meetsThresholdNow) {
    message = t("training.messageUnlocked")
  } else if (status === "completed") {
    message = t("training.messageAlreadyMastered")
  } else {
    message = t("training.messageKeepGoing")
  }

  return (
    <div className="training-card home-card--current">
      <p className="training-card__label">{t("training.trainingSaved")}</p>
      <p className="home-card__skill">{localizeSkillTitle(skill, language)}</p>
      <p className="home-card__description">{t("training.durationAndProficiency", { n: durationMinutes, proficiency })}</p>
      <p className="home-card__description">{message}</p>
      <div className="training-timer-controls">
        <Link className="home-card__cta" to="/">
          {t("training.backHome")}
        </Link>
        <button type="button" onClick={onTrainAgain}>
          {t("training.trainAgain")}
        </button>
      </div>
    </div>
  )
}
