import { useEffect, useState } from "react"
import { skillProgressRepository, skillRepository, strokeRepository } from "../../data/repositories"
import type { Skill, SkillProgress, Stroke } from "../../domain/entities"

export interface CurriculumData {
  strokes: Stroke[]
  skills: Skill[]
  progressBySkillId: Map<string, SkillProgress>
}

/**
 * Shared "load everything HomePage and SkillTreePage both need" hook —
 * both pages need the full stroke list, the full skill list (104 records
 * is trivial to hold in memory; there's no pagination need here) and every
 * skill's progress. This is the Application-layer glue CLAUDE.md's
 * architecture rule describes (UI → Application/Domain Logic →
 * Repository → IndexedDB): it only calls repositories, never `db` itself.
 *
 * `loading` is only true for the initial load — repositories aren't
 * reactive yet, so a page that changes data (none do today) would need to
 * re-fetch itself rather than relying on this hook to notice.
 */
export function useCurriculumData(): { data: CurriculumData | undefined; loading: boolean; error: unknown } {
  const [data, setData] = useState<CurriculumData>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(undefined)

  useEffect(() => {
    let cancelled = false

    Promise.all([strokeRepository.getAll(), skillRepository.getAll(), skillProgressRepository.getAll()])
      .then(([strokes, skills, progress]) => {
        if (cancelled) return
        setData({
          strokes,
          skills,
          progressBySkillId: new Map(progress.map((p) => [p.skillId, p])),
        })
      })
      .catch((caughtError: unknown) => {
        if (cancelled) return
        console.error("Failed to load curriculum data", caughtError)
        setError(caughtError)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
