/**
 * A teaching-content module sourced from swimming coach.md (e.g. "FREE-05
 * 自由泳手臂基本动作", "COMMON-01 水中适应"). Module IDs match swimming
 * coach.md's own IDs (COMMON-xx / FREE-xx / TI-xx / BREAST-xx / BACK-xx /
 * FLY-xx) exactly — do not invent new ones here.
 *
 * Per the P1 product decision (see project doc
 * `claude/skill-teaching-module-mapping.md`, 最终建议 "方案 C"): PRD.md's
 * skill tree stays fine-grained (one Skill per unlockable node), while
 * swimming coach.md's teaching content is coarser (one module often covers
 * several Skill nodes — e.g. FREE-05 covers all 6 of freestyle's Stage 4
 * arm sub-skills). A Skill points at its content via
 * `Skill.teachingModuleId` instead of duplicating this text on every Skill
 * record — see skill.ts.
 */
export interface TeachingModule {
  id: string

  /** e.g. "自由泳手臂基本动作". */
  name: string

  /** 学习目标 / 技术重点简述 — a single sentence, when swimming coach.md gives one. */
  objective?: string

  /** 技术要点 / 技术重点 / 重点. */
  techniquePoints: string[]

  /** 常见问题 / 常见错误. */
  commonMistakes: string[]

  /** 推荐练习. */
  exercises: string[]

  /** 达标. */
  passCriteria: string[]

  /**
   * 参考练习时间, parsed from swimming coach.md's "X–Y 分钟" ranges.
   * Both undefined for modules marked "持续训练阶段" (ongoing, no fixed
   * target) — e.g. FREE-08, BREAST-07, BACK-07, FLY-08.
   */
  minimumMinutes?: number
  recommendedMinutes?: number
}
