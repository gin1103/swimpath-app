import type { SkillProgress, TrainingSession } from "../entities"

/** PRD.md 第20节 "支持：日/周/月/全部". */
export type HistoryPeriod = "day" | "week" | "month" | "all"

/**
 * Inclusive start of the window for a period, or `undefined` for "all"
 * (no lower bound). "day" = today (calendar date); "week" = the trailing
 * 7 days including today (not an ISO calendar week — simpler, and matches
 * how a self-learner actually thinks about "this week"); "month" = the
 * current calendar month. These are implementation choices PRD.md doesn't
 * pin down beyond naming the four options.
 */
export function getPeriodStart(period: HistoryPeriod, now: Date): Date | undefined {
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  if (period === "day") return start
  if (period === "week") {
    start.setDate(start.getDate() - 6)
    return start
  }
  if (period === "month") {
    start.setDate(1)
    return start
  }
  return undefined
}

export function filterSessionsByPeriod(
  sessions: TrainingSession[],
  period: HistoryPeriod,
  now: Date = new Date(),
): TrainingSession[] {
  const start = getPeriodStart(period, now)
  if (!start) return sessions
  return sessions.filter((session) => new Date(session.date) >= start)
}

export interface StrokeMinutes {
  strokeId: string
  minutes: number
}

export interface MonthlyMinutes {
  /** "YYYY-MM". */
  month: string
  minutes: number
}

export interface CompletedSkillEntry {
  skillId: string
  completedAt: string
}

export interface HistoryStats {
  totalMinutes: number
  sessionCount: number
  averageMinutes: number
  minutesByStroke: StrokeMinutes[]
  /** Always computed from every session ever recorded, regardless of the
   * selected period — a month-by-month trend is only meaningful across
   * the full history, not re-scoped to "this month". */
  monthlyMinutes: MonthlyMinutes[]
  /** Skills whose `completedAt` falls inside the selected period — PRD.md
   * 第20节 "技能进步". */
  recentlyCompletedSkills: CompletedSkillEntry[]
}

function monthKey(dateIso: string): string {
  const date = new Date(dateIso)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

export function computeHistoryStats(params: {
  allSessions: TrainingSession[]
  periodSessions: TrainingSession[]
  allProgress: SkillProgress[]
  period: HistoryPeriod
  now?: Date
}): HistoryStats {
  const now = params.now ?? new Date()
  const { allSessions, periodSessions, allProgress, period } = params

  const totalMinutes = periodSessions.reduce((sum, session) => sum + session.durationMinutes, 0)
  const sessionCount = periodSessions.length
  const averageMinutes = sessionCount > 0 ? Math.round(totalMinutes / sessionCount) : 0

  const strokeTotals = new Map<string, number>()
  for (const session of periodSessions) {
    strokeTotals.set(session.strokeId, (strokeTotals.get(session.strokeId) ?? 0) + session.durationMinutes)
  }
  const minutesByStroke = [...strokeTotals.entries()]
    .map(([strokeId, minutes]) => ({ strokeId, minutes }))
    .sort((a, b) => b.minutes - a.minutes)

  const monthTotals = new Map<string, number>()
  for (const session of allSessions) {
    const key = monthKey(session.date)
    monthTotals.set(key, (monthTotals.get(key) ?? 0) + session.durationMinutes)
  }
  const monthlyMinutes = [...monthTotals.entries()]
    .map(([month, minutes]) => ({ month, minutes }))
    .sort((a, b) => (a.month < b.month ? 1 : -1))

  const periodStart = getPeriodStart(period, now)
  const recentlyCompletedSkills = allProgress
    .filter((progress): progress is SkillProgress & { completedAt: string } => Boolean(progress.completedAt))
    .filter((progress) => !periodStart || new Date(progress.completedAt) >= periodStart)
    .map((progress) => ({ skillId: progress.skillId, completedAt: progress.completedAt }))
    .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1))

  return { totalMinutes, sessionCount, averageMinutes, minutesByStroke, monthlyMinutes, recentlyCompletedSkills }
}
