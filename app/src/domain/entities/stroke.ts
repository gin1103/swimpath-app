/**
 * The four supported strokes (PRD.md 第5节). Freestyle additionally has two
 * learning routes (basic / Total Immersion) — see `routes` below.
 */
export type StrokeId = "free" | "breast" | "back" | "fly"

export interface StrokeRoute {
  id: string
  name: string
}

export interface Stroke {
  id: StrokeId
  name: string
  order: number
  /** Only freestyle defines routes today (basic vs. TI). */
  routes?: StrokeRoute[]
}
