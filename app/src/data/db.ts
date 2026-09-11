import Dexie, { type EntityTable } from "dexie"
import type { Skill, SkillProgress, Stroke, TeachingModule, TrainingSession, UserSettings } from "../domain/entities"

/**
 * SwimPath's IndexedDB database.
 *
 * Access this only through `src/data/repositories/*` — never import `db`
 * directly from a UI component (CLAUDE.md Architecture Rules):
 *
 *   UI → Application/Domain Logic → Repository → IndexedDB
 *
 * Schema changes: bump the version number and add an explicit `.upgrade()`
 * migration. Never restructure an existing `.version()` block in place —
 * that would silently corrupt data for anyone who already has the previous
 * version stored (CLAUDE.md Data Safety: "Never silently delete existing
 * user data").
 */
export class SwimPathDB extends Dexie {
  strokes!: EntityTable<Stroke, "id">
  skills!: EntityTable<Skill, "id">
  teachingModules!: EntityTable<TeachingModule, "id">
  skillProgress!: EntityTable<SkillProgress, "skillId">
  trainingSessions!: EntityTable<TrainingSession, "id">
  userSettings!: EntityTable<UserSettings, "id">

  constructor() {
    super("swimpath")

    this.version(1).stores({
      strokes: "id, order",
      skills: "id, strokeId, routeId, stageId, order",
      skillProgress: "skillId, status, lastPracticedAt",
      trainingSessions: "id, date, strokeId, skillId",
      userSettings: "id",
    })

    // v2: adds the teachingModules table (curriculum seed data, CLAUDE.md
    // Development Workflow step 4) — an additive schema change, so no
    // .upgrade() migration is needed for existing installs.
    this.version(2).stores({
      teachingModules: "id",
    })
  }
}

export const db = new SwimPathDB()
