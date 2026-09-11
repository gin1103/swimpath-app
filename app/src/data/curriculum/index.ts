export * from "./skills"
export * from "./teachingModules"
export * from "./stageNames"

/**
 * PRD.md 第22节 "课程版本": bumped whenever this curriculum data changes in
 * a way an already-installed user's data should know about (e.g. a skill
 * id is renamed or removed — see PRD.md 第26节 for how import handles a
 * skillId that no longer exists). Adding new optional fields or filling in
 * previously-empty content (like this seeding pass) does not require a
 * bump.
 */
export const CURRICULUM_VERSION = "1.1.0"
