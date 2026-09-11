/**
 * PRD.md 第23节. One row per skill, keyed by `skillId`.
 */
export type SkillStatus = "locked" | "available" | "learning" | "completed"

export interface SkillProgress {
  skillId: string
  status: SkillStatus

  totalMinutes: number

  proficiency: 0 | 1 | 2 | 3 | 4 | 5
  confidence: 1 | 2 | 3 | 4 | 5
  stability: 1 | 2 | 3 | 4 | 5

  lastPracticedAt?: string
  completedAt?: string

  notes?: string

  /** True when the user manually unlocked/advanced past the recommended flow. */
  manualOverride?: boolean
}
