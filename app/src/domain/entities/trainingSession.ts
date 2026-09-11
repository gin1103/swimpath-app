/**
 * PRD.md 第24节. MVP only supports one skill per session (P4 product
 * decision) — see PRD.md 第31节 for the deferred multi-skill enhancement.
 */
export interface TrainingSession {
  id: string
  /** ISO date string. */
  date: string
  durationMinutes: number

  strokeId: string
  skillId: string

  notes?: string

  /** Self-assessment captured at the end of this session, if any. */
  proficiency?: number
  confidence?: number
  stability?: number
  fatigue?: number
}
