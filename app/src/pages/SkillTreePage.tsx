import { Link, useParams, useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import { useCurriculumData } from "../app/hooks/useCurriculumData"
import { getStageLabel } from "../data/curriculum"
import { findRelevantCommonSkills } from "../domain/services"
import type { Skill, SkillProgress } from "../domain/entities"
import { PagePlaceholder } from "../components/PagePlaceholder"
import { useLanguage } from "../i18n/LanguageContext"
import { useT } from "../i18n/uiStrings"
import { getStatusLabel } from "../app/skillStatusLabels"
import { localizeRouteName, localizeSkillDescription, localizeSkillTitle, localizeStrokeName } from "../i18n/localize"

interface StageGroup {
  stageId: string
  skills: Skill[]
}

/** Groups an already-filtered (single stroke/route) skill list by stage,
 * sorted by the numeric stage suffix, each stage's skills sorted by
 * `order` (PRD.md 第6/22节: order is only meaningful within a stage). */
function groupByStage(skills: Skill[]): StageGroup[] {
  const byStage = new Map<string, Skill[]>()
  for (const skill of skills) {
    const group = byStage.get(skill.stageId)
    if (group) group.push(skill)
    else byStage.set(skill.stageId, [skill])
  }
  for (const group of byStage.values()) group.sort((a, b) => a.order - b.order)

  return [...byStage.entries()]
    .map(([stageId, stageSkills]) => ({ stageId, skills: stageSkills }))
    .sort((a, b) => {
      const aNum = Number(/stage(\d+)$/.exec(a.stageId)?.[1] ?? -1)
      const bNum = Number(/stage(\d+)$/.exec(b.stageId)?.[1] ?? -1)
      return aNum - bNum
    })
}

/**
 * PRD.md 第6/10-14节: one stroke's skill tree, grouped by stage, each node
 * showing its unlock status. Freestyle additionally has two routes (基础 /
 * TI, PRD.md 第5节) selectable via the tabs below.
 *
 * The selected route lives in the URL (`?route=`), not component state —
 * a bug report showed that with it as local state, opening a skill's
 * detail page and then navigating back landed you back on this page with
 * the route tab reset to the first route (普通自由泳), silently discarding
 * whichever route (e.g. TI) you had actually been looking at. Putting it in
 * the URL means the tree page's own history entry remembers which tab was
 * active, so "back" from a skill detail page restores it correctly.
 */
export function SkillTreePage() {
  const { strokeId } = useParams<{ strokeId: string }>()
  const { data, loading } = useCurriculumData()
  const { language } = useLanguage()
  const t = useT()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedRouteId = searchParams.get("route") ?? undefined

  const stroke = useMemo(() => data?.strokes.find((s) => s.id === strokeId), [data, strokeId])
  const routes = stroke?.routes
  const activeRouteId = routes ? (selectedRouteId ?? routes[0]?.id) : undefined

  const routeSkills = useMemo(() => {
    if (!data || !strokeId) return []
    return data.skills.filter((skill) => skill.strokeId === strokeId && (!routes || skill.routeId === activeRouteId))
  }, [data, strokeId, routes, activeRouteId])

  const commonSkills = useMemo(() => {
    if (!data) return []
    return findRelevantCommonSkills(routeSkills, data.skills)
  }, [data, routeSkills])

  if (loading) {
    return <PagePlaceholder title={t("skillTree.title")} description={t("common.loading")} />
  }

  if (!data || !stroke) {
    return <PagePlaceholder title={t("skillTree.title")} description={t("skillTree.strokeNotFound", { strokeId: strokeId ?? "" })} />
  }

  const stageGroups = groupByStage(routeSkills)

  return (
    <section className="skill-tree">
      <h1>{localizeStrokeName(stroke, language)}</h1>

      {routes && (
        <div className="skill-tree__routes">
          {routes.map((route) => (
            <button
              key={route.id}
              type="button"
              className={route.id === activeRouteId ? "is-active" : undefined}
              onClick={() => setSearchParams({ route: route.id }, { replace: true })}
            >
              {localizeRouteName(route, language)}
            </button>
          ))}
        </div>
      )}

      {commonSkills.length > 0 && (
        <SkillStageSection
          strokeId={strokeId ?? ""}
          stageId="common"
          skills={commonSkills}
          progressBySkillId={data.progressBySkillId}
        />
      )}

      {stageGroups.map((group) => (
        <SkillStageSection
          key={group.stageId}
          strokeId={strokeId ?? ""}
          stageId={group.stageId}
          skills={group.skills}
          progressBySkillId={data.progressBySkillId}
        />
      ))}
    </section>
  )
}

function SkillStageSection({
  strokeId,
  stageId,
  skills,
  progressBySkillId,
}: {
  strokeId: string
  stageId: string
  skills: Skill[]
  progressBySkillId: ReadonlyMap<string, SkillProgress>
}) {
  const { language } = useLanguage()
  return (
    <div className="skill-stage">
      <h2 className="skill-stage__title">{getStageLabel(stageId, language)}</h2>
      <ul className="skill-stage__list">
        {skills.map((skill) => (
          <SkillRow key={skill.id} strokeId={strokeId} skill={skill} progress={progressBySkillId.get(skill.id)} />
        ))}
      </ul>
    </div>
  )
}

function SkillRow({
  strokeId,
  skill,
  progress,
}: {
  strokeId: string
  skill: Skill
  progress: SkillProgress | undefined
}) {
  const { language } = useLanguage()
  const status = progress?.status ?? "locked"
  const content = (
    <>
      <div className="skill-row__main">
        <p className="skill-row__title">{localizeSkillTitle(skill, language)}</p>
        <p className="skill-row__description">{localizeSkillDescription(skill, language)}</p>
      </div>
      <span className={`skill-row__status skill-row__status--${status}`}>
        {getStatusLabel(status, language)}
        {status !== "locked" && status !== "available" && ` · ${progress?.proficiency ?? 0}/5`}
      </span>
    </>
  )

  // Every skill's detail page is reachable, `locked` ones included — that
  // page is what shows why a locked skill is locked and hosts the manual
  // unlock action (PRD.md 第8节), so it needs to be reachable even before
  // prerequisites are met.
  return (
    <li className={`skill-row skill-row--${status}`}>
      <Link className="skill-row__link" to={`/skills/${strokeId}/${skill.id}`}>
        {content}
      </Link>
    </li>
  )
}
