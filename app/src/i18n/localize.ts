import type { Language, Skill } from "../domain/entities"
import { SKILL_TRANSLATIONS_EN } from "./skillTranslations.en"

/**
 * Localization for curriculum/navigation *seed data* — Skill titles and
 * descriptions, Stroke/route names, and the shared fly safety note. This
 * is deliberately separate from `uiStrings.ts`: that file is a fixed UI
 * copy deck (nav labels, buttons, messages), while everything here is
 * keyed off IDs/text that live in `src/data/curriculum/` and
 * `src/data/seed.ts` — the Chinese fields on those records stay the
 * source of truth and the fallback whenever an English translation is
 * missing (same "never leave a section blank" philosophy as
 * `resolveSkillContent`'s `CONTENT_PLACEHOLDER`).
 */

export function localizeSkillTitle(skill: Skill, language: Language): string {
  if (language === "zh") return skill.title
  return SKILL_TRANSLATIONS_EN[skill.id]?.title ?? skill.title
}

export function localizeSkillDescription(skill: Skill, language: Language): string {
  if (language === "zh") return skill.description
  return SKILL_TRANSLATIONS_EN[skill.id]?.description ?? skill.description
}

/** Stroke names (自由泳/蛙泳/仰泳/蝶泳) and freestyle's two route names
 * (普通自由泳/全浸式自由泳 · TI) — a small, fixed set (4 strokes, 2 routes)
 * seeded in `src/data/seed.ts`, translated by hand here rather than via a
 * generated file since there are only six strings total. */
const STROKE_NAMES_EN: Record<string, string> = {
  free: "Freestyle",
  breast: "Breaststroke",
  back: "Backstroke",
  fly: "Butterfly",
}

const ROUTE_NAMES_EN: Record<string, string> = {
  basic: "Regular Freestyle",
  ti: "Total Immersion (TI)",
}

/** Takes just `{id, name}` (rather than the full `Stroke` type) so callers
 * that only have a narrowed stroke shape in scope (e.g. TrainingPage's
 * `SelectStep`, which destructures its own local prop type) can pass it
 * straight through without an unnecessary cast. */
export function localizeStrokeName(stroke: { id: string; name: string }, language: Language): string {
  if (language === "zh") return stroke.name
  return STROKE_NAMES_EN[stroke.id] ?? stroke.name
}

export function localizeRouteName(route: { id: string; name: string }, language: Language): string {
  if (language === "zh") return route.name
  return ROUTE_NAMES_EN[route.id] ?? route.name
}

/** The one safety note currently seeded (`FLY_SAFETY_NOTE` in
 * skills.ts, shared by every butterfly skill) — keyed by its exact
 * Chinese text so a future *second* safety note added to skills.ts still
 * falls back to Chinese gracefully instead of silently showing nothing,
 * the same way an untranslated skill title falls back above. */
const SAFETY_NOTE_TRANSLATIONS_EN: Record<string, string> = {
  "蝶泳强度较高，请循序渐进，感到胸闷、头晕或明显疲劳时立即停止训练。":
    "Butterfly is high-intensity — progress gradually, and stop immediately if you feel chest tightness, dizziness, or significant fatigue.",
}

export function localizeSafetyNotes(notes: string[] | undefined, language: Language): string[] | undefined {
  if (!notes || language === "zh") return notes
  return notes.map((note) => SAFETY_NOTE_TRANSLATIONS_EN[note] ?? note)
}
