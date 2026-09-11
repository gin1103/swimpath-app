import type { Language } from "../../domain/entities"

/**
 * Human-readable stage names, taken verbatim from PRD.md's own headings
 * (第10/11/12节) — 自由泳普通路线、TI 路线 and 蛙泳 name their stages in
 * PRD.md; 仰泳 (第13节)、蝶泳 (第14节) only ever say "Stage N" with no name,
 * so `getStageLabel` below falls back to that rather than inventing names
 * PRD.md doesn't give ("Stage N" is already language-neutral, so 仰泳/蝶泳
 * need no English variant here).
 *
 * 2026-09-10 更新：TI 路线随第11节技能树内容一起重新梳理，第一次给出了具体的
 * Stage 名称（此前 TI 和仰泳/蝶泳一样只显示 "Stage N"）。
 *
 * 2026-09-11 更新：加入英文对照（用户请求的中英文界面切换），供
 * `getStageLabel` 按当前语言选用。
 */
const STAGE_NAMES: Record<string, string> = {
  common: "通用基础技能",

  "free.basic.stage1": "自由泳腿",
  "free.basic.stage2": "身体平衡",
  "free.basic.stage3": "呼吸",
  "free.basic.stage4": "手臂",
  "free.basic.stage5": "完整自由泳",
  "free.basic.stage6": "效率",

  "free.ti.stage1": "平衡与漂浮",
  "free.ti.stage2": "核心带动转动",
  "free.ti.stage3": "摆臂回收",
  "free.ti.stage4": "精细手部技术",
  "free.ti.stage5": "呼吸与整合",

  "breast.stage1": "蛙泳腿",
  "breast.stage2": "蛙泳手",
  "breast.stage3": "呼吸",
  "breast.stage4": "配合",
  "breast.stage5": "效率",
}

const STAGE_NAMES_EN: Record<string, string> = {
  common: "Common Basics",

  "free.basic.stage1": "Freestyle Kick",
  "free.basic.stage2": "Body Balance",
  "free.basic.stage3": "Breathing",
  "free.basic.stage4": "Arm Stroke",
  "free.basic.stage5": "Whole Stroke",
  "free.basic.stage6": "Efficiency",

  "free.ti.stage1": "Balance & Float",
  "free.ti.stage2": "Core-Driven Rotation",
  "free.ti.stage3": "Arm Recovery",
  "free.ti.stage4": "Fine Hand Technique",
  "free.ti.stage5": "Breathing & Integration",

  "breast.stage1": "Breaststroke Kick",
  "breast.stage2": "Breaststroke Arm Stroke",
  "breast.stage3": "Breathing",
  "breast.stage4": "Coordination",
  "breast.stage5": "Efficiency",
}

/** e.g. "free.ti.stage3" → "Stage 3" when there's no name in STAGE_NAMES
 * for either language. Defaults to "zh" so every pre-existing call site
 * (written before the language toggle existed) keeps behaving exactly as
 * before without needing to pass a language explicitly. */
export function getStageLabel(stageId: string, language: Language = "zh"): string {
  const named = language === "en" ? (STAGE_NAMES_EN[stageId] ?? STAGE_NAMES[stageId]) : STAGE_NAMES[stageId]
  if (named) return named

  const match = /stage(\d+)$/.exec(stageId)
  return match ? `Stage ${match[1]}` : stageId
}
