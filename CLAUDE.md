# Swimming Learning App

## Project Goal
Build a personal swimming self-learning PWA.

## Tech Stack
- React
- TypeScript
- Vite
- PWA
- IndexedDB
- Mobile-first

## Important Documents
- PRD.md
- swimming_curriculum.md

Before implementing a feature:
1. Read PRD.md
2. Read relevant parts of swimming_curriculum.md
3. Follow this CLAUDE.md

## Architecture Rules

UI
↓
Application / Domain Logic
↓
Repository
↓
IndexedDB

Never access IndexedDB directly from UI components.

## Course Data

Swimming curriculum must be stored separately from user progress.

Do NOT hardcode curriculum data inside React components.

Use stable skill IDs.

Stroke prefixes are: `common`, `free`, `breast`, `back`, `fly`. Do NOT use
`backstroke.*` or `butterfly.*` — the canonical ID list lives in
swimming_curriculum.md and uses `back.*` / `fly.*`.

Example:

common.water.exhale
free.basic.balance
free.basic.kick
free.basic.side_breath
free.ti.balance
breast.kick
back.kick
fly.dolphin_kick

## Progression

Practice time does NOT automatically mean mastery.

Recommended flow:

practice
→ accumulate time
→ self assessment
→ update proficiency
→ unlock next skill

Manual override must be supported.

## Timer

Never calculate elapsed practice time only from setInterval.

Use timestamps so the timer remains accurate when:
- browser is backgrounded
- phone screen is locked
- PWA is suspended

Recovering an in-progress session after the OS fully kills the PWA process
is NOT required for MVP (see PRD.md "未来版本候选功能"). Only accuracy
while backgrounded/locked is required now.

## Data Safety

User training data must survive app updates.

IndexedDB schema changes require explicit migrations.

Never silently delete existing user data.

## Export / Import

The application must support JSON export and import.

Export must include:
- user settings
- training sessions
- skill progress
- assessments (proficiency/confidence/stability/fatigue values already
  captured on SkillProgress and TrainingSession — no separate Assessment
  table is required for MVP)

Curriculum data should be versioned separately (see PRD.md "课程版本").
Import must tolerate a skillId that no longer exists in the current
curriculum version instead of failing or silently dropping the record.

## Swimming Safety

The application must never imply that completing a skill means the user is water-safe.

Do not encourage:
- unsupervised swimming
- breath-holding challenges
- dangerous underwater practice

Advanced butterfly training should include appropriate safety warnings.

Implement the one-time safety onboarding notice and the reusable
safety-banner component described in PRD.md "安全提示 UI" — do not rely on
per-skill safetyNotes alone to surface these general safety principles.

## Development Workflow

Do not implement the entire application in one giant change.

Work in small phases:

1. Project initialization
2. Architecture
3. Data model
4. Curriculum seed data
5. Home page
6. Skill tree
7. Skill detail
8. Training timer
9. Training records
10. Progression
11. History
12. Import/export
13. PWA/offline
14. Testing
15. UI polish

After each meaningful phase:
- run typecheck
- run tests
- run build
- inspect the result
- fix errors before continuing

## Scope Control

Do NOT add:
- authentication
- cloud database
- social features
- AI video analysis
- wearable integration
- coach marketplace
- advertisements

unless explicitly requested.

## Deferred Enhancements (Tracked, Not MVP)

These are known future candidates, listed so they are not mistaken for
oversights. Do not build them without an explicit request:

- one training session linked to multiple skills, with time split across
  them (MVP: one skillId per TrainingSession)
- curriculum source/evidence-level fields (source, sourceType,
  evidenceLevel, coachNotes)
- recovering an in-progress timer session after the OS kills the app

## Coding Style

Use strict TypeScript.

Prefer small reusable components.

Avoid unnecessary dependencies.

Keep business logic out of UI components.

Do not create abstractions without a concrete use case.

## Git

Make small logical commits.

Do not rewrite history unless explicitly requested.

Before committing:
- typecheck
- test
- build