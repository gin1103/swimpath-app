import type { Skill } from "../../domain/entities"

/**
 * The PRD.md skill tree (第10-14节 + 第32节), turned into seed data.
 *
 * This file defines the tree's *structure* (ids, titles, one-line
 * descriptions, prerequisites, stage grouping, order) — every node here
 * matches a PRD.md heading exactly, and none have been merged or removed
 * (P1 product decision: PRD.md's granularity is authoritative and stays
 * fine-grained). Teaching content itself (technique points, common
 * mistakes, exercises, pass criteria, reference time) is not duplicated
 * here — each skill only carries a `teachingModuleId` pointing at
 * `./teachingModules.ts`, which transcribes swimming coach.md.
 *
 * Prerequisite rule used for this seed data (PRD.md doesn't specify a
 * finer graph than "technique tree with dependencies", so this is an
 * implementation choice, not a product decision): a stage's first skill
 * onward all require *every* skill of the previous stage to be at
 * proficiency >= 3 — i.e. each PRD "Stage" acts as a completion gate — and
 * a route's Stage 1 requires the shared common.* skills listed in PRD.md
 * 第32节. Skills within the same stage do not depend on each other, so
 * they can be tackled in any order once the stage unlocks. This can be
 * refined later without touching the id/content shape.
 */

interface RawSkill {
  id: string
  title: string
  description: string
  teachingModuleId: string
  safetyNotes?: string[]
}

/** PRD.md 第30.2节: 蝶泳相关技能 must show this banner (falls back to it
 * only when a skill doesn't already have its own safetyNotes). */
const FLY_SAFETY_NOTE = ["蝶泳强度较高，请循序渐进，感到胸闷、头晕或明显疲劳时立即停止训练。"]

function buildRoute(opts: {
  strokeId?: string
  routeId?: string
  stagePrefix: string
  stage1Prerequisites: string[]
  stages: RawSkill[][]
}): Skill[] {
  const result: Skill[] = []
  let previousStageIds: string[] = opts.stage1Prerequisites

  opts.stages.forEach((stageSkills, stageIndex) => {
    const stageId = `${opts.stagePrefix}.stage${stageIndex + 1}`
    stageSkills.forEach((raw, skillIndex) => {
      result.push({
        id: raw.id,
        strokeId: opts.strokeId,
        routeId: opts.routeId,
        stageId,
        title: raw.title,
        description: raw.description,
        prerequisites: previousStageIds,
        teachingModuleId: raw.teachingModuleId,
        safetyNotes: raw.safetyNotes,
        order: skillIndex + 1,
      })
    })
    previousStageIds = stageSkills.map((s) => s.id)
  })

  return result
}

// --- 第32节 通用基础技能（跨泳姿共享） ---
const COMMON_SKILLS: Skill[] = [
  {
    id: "common.water.adaptation",
    stageId: "common",
    title: "水中适应",
    description: "建立基本的水中安全感，包括面部浸水、水中睁眼和在浅水区保持放松。",
    prerequisites: [],
    teachingModuleId: "COMMON-01",
    order: 1,
  },
  {
    id: "common.water.exhale",
    stageId: "common",
    title: "水中呼气",
    description: "练习水下持续呼气、出水快速吸气的基础呼吸模式，是大多数泳姿呼吸技术的基础。",
    prerequisites: [],
    teachingModuleId: "COMMON-02",
    order: 2,
  },
  {
    id: "common.water.back_float",
    stageId: "common",
    title: "仰漂",
    description: "在仰卧姿态下放松漂浮，理解身体在水中的浮力与平衡，是仰泳的入门基础。",
    prerequisites: [],
    teachingModuleId: "COMMON-03",
    order: 3,
  },
  {
    id: "common.water.front_float",
    stageId: "common",
    title: "俯漂",
    description: "在俯卧姿态下放松漂浮，理解身体在水中的浮力与平衡，是自由泳/蛙泳/蝶泳的入门基础。",
    prerequisites: [],
    teachingModuleId: "COMMON-04",
    order: 4,
  },
  {
    id: "common.water.streamline",
    stageId: "common",
    title: "流线型 / 蹬壁滑行",
    description: "蹬壁后保持双臂夹耳、身体成一条线的流线型姿态，是所有泳姿共用的低阻力基础姿态。",
    prerequisites: [],
    teachingModuleId: "COMMON-05",
    order: 5,
  },
]

const COMMON_FOR_EXHALE_ROUTES = [
  "common.water.adaptation",
  "common.water.exhale",
  "common.water.front_float",
  "common.water.streamline",
]

// --- 第10节 V1 自由泳技能树（普通路线） ---
const FREE_BASIC_SKILLS = buildRoute({
  strokeId: "free",
  routeId: "basic",
  stagePrefix: "free.basic",
  stage1Prerequisites: COMMON_FOR_EXHALE_ROUTES,
  stages: [
    // Stage 1: 自由泳腿
    [
      {
        id: "free.basic.kick.board",
        title: "扶板打腿",
        description: "扶住浮板进行自由泳打腿，隔离手臂动作，专注建立由髋部驱动的稳定打腿节奏。",
        teachingModuleId: "FREE-02",
      },
      {
        id: "free.basic.kick.no_board",
        title: "不扶板打腿",
        description: "不借助浮板独立完成自由泳打腿，检验打腿是否已经能维持身体平衡。",
        teachingModuleId: "FREE-02",
      },
      {
        id: "free.basic.kick.streamline",
        title: "流线型打腿",
        description: "在流线型姿态下打腿，把打腿动作和低阻力身体姿态结合起来。",
        teachingModuleId: "FREE-02",
      },
      {
        id: "free.basic.kick.side",
        title: "侧身打腿",
        description: "在侧卧姿态下打腿，为后续的身体转动和侧身呼吸做准备。",
        teachingModuleId: "FREE-02",
      },
    ],
    // Stage 2: 身体平衡
    [
      {
        id: "free.basic.balance.front_back",
        title: "前后平衡",
        description: "调整头部和身体重心，减少下半身下沉，让身体在纵向上保持水平。",
        teachingModuleId: "FREE-01",
      },
      {
        id: "free.basic.balance.left_right",
        title: "左右平衡",
        description: "保持身体左右对称、不摇摆的水平姿态，为转体打基础。",
        teachingModuleId: "FREE-01",
      },
      {
        id: "free.basic.balance.side",
        title: "侧身平衡",
        description: "在身体转向一侧时依然保持平衡，是自由泳转体和侧身呼吸之间的过渡技能。",
        teachingModuleId: "FREE-03",
      },
      {
        id: "free.basic.rotation",
        title: "转体",
        description: "建立肩髋协同、绕身体纵轴的自然转动，而不是只靠手臂拉动身体前进。",
        teachingModuleId: "FREE-03",
      },
    ],
    // Stage 3: 呼吸
    [
      {
        id: "free.basic.breath.continuous_exhale",
        title: "水下持续呼气",
        description: "把水中呼气应用到实际游进中，做到水下持续缓慢呼气、不憋气到最后一刻。",
        teachingModuleId: "COMMON-02",
      },
      {
        id: "free.basic.breath.side",
        title: "侧身呼吸",
        description: "借助身体转动自然转头呼吸，嘴部刚好出水即可，不需要抬头。",
        teachingModuleId: "FREE-04",
      },
      {
        id: "free.basic.breath.single_side",
        title: "单侧呼吸",
        description: "固定在一侧完成侧身呼吸，先建立稳定的单侧呼吸节奏。",
        teachingModuleId: "FREE-04",
      },
      {
        id: "free.basic.breath.bilateral",
        title: "双侧呼吸",
        description: "练习两侧都能完成侧身呼吸，为将来更灵活的呼吸节奏做准备。",
        teachingModuleId: "FREE-04",
      },
      {
        id: "free.basic.breath.rotation_combo",
        title: "呼吸与身体旋转结合",
        description: "让呼吸动作和身体转动自然配合，呼吸不打乱转体和打腿节奏。",
        teachingModuleId: "FREE-06",
      },
    ],
    // Stage 4: 手臂
    [
      {
        id: "free.basic.arm.single",
        title: "单臂划水",
        description: "单独练习一侧手臂的完整划水路径，降低协调难度，专注手臂技术。",
        teachingModuleId: "FREE-05",
      },
      {
        id: "free.basic.arm.entry",
        title: "入水",
        description: "练习手臂入水的位置和角度，避免入水过中线或手臂交叉。",
        teachingModuleId: "FREE-05",
      },
      {
        id: "free.basic.arm.extension",
        title: "前伸",
        description: "入水后向前充分延伸手臂，为抱水建立更长的有效划水距离。",
        teachingModuleId: "FREE-05",
      },
      {
        id: "free.basic.arm.catch",
        title: "抱水",
        description: "用前臂和手掌“扶住”水建立压力，而不是直接向下压水。",
        teachingModuleId: "FREE-05",
      },
      {
        id: "free.basic.arm.push",
        title: "推水",
        description: "完成抱水后加速向后推水直到自然出水，避免过早放弃推水。",
        teachingModuleId: "FREE-05",
      },
      {
        id: "free.basic.arm.exit",
        title: "出水",
        description: "推水完成后手臂放松出水，衔接下一次划水的恢复动作。",
        teachingModuleId: "FREE-05",
      },
      {
        id: "free.basic.arm.rotation_combo",
        title: "手臂与身体旋转结合",
        description: "让手臂划水借助身体转动发力，而不是单纯依靠手臂力量。",
        teachingModuleId: "FREE-06",
      },
    ],
    // Stage 5: 完整自由泳
    [
      {
        id: "free.basic.combo.arm_leg",
        title: "手 + 腿",
        description: "把手臂划水和打腿组合起来，建立基本的游进节奏。",
        teachingModuleId: "FREE-06",
      },
      {
        id: "free.basic.combo.arm_breath",
        title: "手 + 呼吸",
        description: "把手臂划水和侧身呼吸组合起来，让呼吸不打断划水节奏。",
        teachingModuleId: "FREE-06",
      },
      {
        id: "free.basic.combo.full",
        title: "手 + 腿 + 呼吸",
        description: "把打腿、划水和呼吸整合为完整的自由泳动作循环。",
        teachingModuleId: "FREE-06",
      },
      {
        id: "free.basic.distance.25m",
        title: "连续 25m",
        description: "在不过度喘气的情况下连续完成 25 米自由泳。",
        teachingModuleId: "FREE-07",
      },
      {
        id: "free.basic.distance.50m",
        title: "连续 50m",
        description: "在动作不明显变形的情况下把连续距离延长到 50 米。",
        teachingModuleId: "FREE-07",
      },
      {
        id: "free.basic.distance.100m",
        title: "连续 100m",
        description: "在保持技术质量的前提下把连续距离延长到 100 米。",
        teachingModuleId: "FREE-07",
      },
    ],
    // Stage 6: 效率
    [
      {
        id: "free.basic.efficiency.drag",
        title: "降低阻力",
        description: "通过更好的流线型和身体姿态减少游进时的水阻力。",
        teachingModuleId: "FREE-08",
      },
      {
        id: "free.basic.efficiency.body_position",
        title: "改善身体位置",
        description: "进一步优化身体在水中的水平姿态，减少下沉和多余起伏。",
        teachingModuleId: "FREE-08",
      },
      {
        id: "free.basic.efficiency.breathing",
        title: "改善呼吸",
        description: "让呼吸更省力，更不影响身体平衡和转体节奏。",
        teachingModuleId: "FREE-08",
      },
      {
        id: "free.basic.efficiency.reduce_waste",
        title: "减少无效动作",
        description: "去掉多余的身体摆动和不产生推进力的动作。",
        teachingModuleId: "FREE-08",
      },
      {
        id: "free.basic.efficiency.stroke_efficiency",
        title: "划水效率",
        description: "提高每一次划水产生的推进距离，减少完成相同距离所需的划水次数。",
        teachingModuleId: "FREE-08",
      },
      {
        id: "free.basic.efficiency.pace",
        title: "稳定配速",
        description: "在保持技术质量的同时，游出更稳定、可持续的配速。",
        teachingModuleId: "FREE-08",
      },
    ],
  ],
})

// --- 第11节 全浸式自由泳（TI）路线 ---
// TI 与普通路线共用同一份自由泳共同基础（PRD.md 第32节仅按"泳姿"划分前置技
// 能，未按路线区分），因此 Stage1 前置技能沿用与普通路线相同的 common.* 组合。
//
// 2026-09-10 更新：按用户提供的鱼式自由泳（Total Immersion）经典练习序列重新梳理为 5
// 个 Stage、16 个技能（原为 5 Stage、15 技能），对应 swimming coach.md 第6节 TI-01~16。
const FREE_TI_SKILLS = buildRoute({
  strokeId: "free",
  routeId: "ti",
  stagePrefix: "free.ti",
  stage1Prerequisites: COMMON_FOR_EXHALE_ROUTES,
  stages: [
    // TI Stage 1：平衡与漂浮
    [
      {
        id: "free.ti.superman_glide",
        title: "超人漂浮",
        description: "俯卧水面、双臂前伸如超人姿势，靠头、胸、前伸手臂调整重心，体会水中的整体平衡，是 TI 路线的起点动作。",
        teachingModuleId: "TI-01",
      },
      {
        id: "free.ti.superman_kick",
        title: "超人打腿",
        description: "在超人漂浮的基础上加入轻柔打腿，检验腿部是否放松、是否破坏了已经建立的平衡。",
        teachingModuleId: "TI-02",
      },
      {
        id: "free.ti.skate_position",
        title: "黄金侧位",
        description: "从俯卧转为侧身，一臂前伸一臂贴体，头、手、肩、髋对齐成一条流线，是后续所有换臂动作共同的回位姿势。",
        teachingModuleId: "TI-03",
      },
    ],
    // TI Stage 2：核心带动转动
    [
      {
        id: "free.ti.spear_skate",
        title: "穿刺侧滑",
        description: "在黄金侧位基础上，前方手臂做部分入水的穿刺动作，其余身体保持侧位不变。",
        teachingModuleId: "TI-04",
      },
      {
        id: "free.ti.spear_switch",
        title: "穿刺换边",
        description: "从一侧穿刺切换到另一侧，先带停顿练精准对位，再逐步去掉停顿练连贯性。",
        teachingModuleId: "TI-05",
      },
      {
        id: "free.ti.draw_a_line",
        title: "拉链式划线",
        description: "想象身体两侧各有一条与肩同宽的轨道线，手臂始终贴着这条线移动，建立身体的横向稳定性。",
        teachingModuleId: "TI-06",
      },
    ],
    // TI Stage 3：摆臂回收
    [
      {
        id: "free.ti.swing_skate",
        title: "摆臂侧滑",
        description: "在黄金侧位基础上加入部分出水回臂动作，练习回臂时身体侧位不被破坏。",
        teachingModuleId: "TI-07",
      },
      {
        id: "free.ti.swing_switch",
        title: "摆臂换边",
        description: "出水回臂与换边同时进行，先带停顿再逐步去掉停顿，是通向完整泳姿前的最后一步分解动作。",
        teachingModuleId: "TI-08",
      },
      {
        id: "free.ti.rag_doll",
        title: "布娃娃式回臂",
        description: "回臂手臂完全放松、像布娃娃一样自然摆动，核心保持稳定，用来放松肩部、避免回臂僵硬发力。",
        teachingModuleId: "TI-09",
      },
    ],
    // TI Stage 4：精细手部技术
    [
      {
        id: "free.ti.mail_slot",
        title: "信箱式入水",
        description: "手入水时像插信封一样从一个窄缝穿入，减少水花和气泡，练习精准、低扰动的入水点。",
        teachingModuleId: "TI-10",
      },
      {
        id: "free.ti.marionette_arm",
        title: "木偶手练习",
        description: "把手臂划水动作拆解成肩、肘、腕依次带动的顺序，像提线木偶一样体会每个环节。",
        teachingModuleId: "TI-11",
      },
      {
        id: "free.ti.elbow_circle",
        title: "高肘抓水",
        description: "练习抓水阶段的高肘姿势，让肘部保持高于手掌，为划水提供更有效的推进角度。",
        teachingModuleId: "TI-12",
      },
    ],
    // TI Stage 5：呼吸与整合
    [
      {
        id: "free.ti.sweet_spot",
        title: "甜蜜点",
        description: "找到一个既能顺畅换气、又不破坏身体平衡的头位和身位，是 TI 呼吸技术的核心练习。",
        teachingModuleId: "TI-13",
      },
      {
        id: "free.ti.weightless_head",
        title: "头部失重法",
        description: "靠身体转动带动腿部自然浮起，而不是刻意用力抬腿或压头，纠正换气时下沉的错误发力方式。",
        teachingModuleId: "TI-14",
      },
      {
        id: "free.ti.two_beat_kick",
        title: "二拍打腿",
        description: "每次划臂配合对侧腿的一次轻踢，是 TI 体系推荐的省力打腿节奏。",
        teachingModuleId: "TI-15",
      },
      {
        id: "free.ti.whole_stroke",
        title: "完整泳姿整合",
        description: "把以上所有分解动作以极慢、极受控的速度合并成一次完整的自由泳划水，作为 TI 路线的收尾和过关标准。",
        teachingModuleId: "TI-16",
      },
    ],
  ],
})

// --- 第12节 蛙泳技能树 ---
const BREAST_SKILLS = buildRoute({
  strokeId: "breast",
  stagePrefix: "breast",
  stage1Prerequisites: COMMON_FOR_EXHALE_ROUTES,
  stages: [
    // Stage 1 蛙泳腿
    [
      {
        id: "breast.kick.tuck",
        title: "收腿",
        description: "练习蛙泳收腿动作，把脚跟向臀部收拢，为翻脚蹬夹做准备。",
        teachingModuleId: "BREAST-02",
      },
      {
        id: "breast.kick.turn_out",
        title: "翻脚",
        description: "收腿后把脚掌向外翻开，让蹬夹时脚掌能有效推水。",
        teachingModuleId: "BREAST-02",
      },
      {
        id: "breast.kick.press_squeeze",
        title: "蹬夹",
        description: "翻脚后向后蹬水并最终并腿，是蛙泳腿产生推进力的关键阶段。",
        teachingModuleId: "BREAST-02",
      },
      {
        id: "breast.kick.glide",
        title: "滑行",
        description: "蹬夹完成后保持流线型滑行，而不是立即开始下一次收腿。",
        teachingModuleId: "BREAST-02",
      },
      {
        id: "breast.kick.continuous",
        title: "连续蛙腿",
        description: "把收腿、翻脚、蹬夹、滑行连贯起来，完成连续的蛙泳腿动作。",
        teachingModuleId: "BREAST-02",
      },
    ],
    // Stage 2 蛙泳手
    [
      {
        id: "breast.arm.out_sweep",
        title: "外划",
        description: "手臂从前伸位置向外划开，开始蛙泳划手的第一阶段。",
        teachingModuleId: "BREAST-03",
      },
      {
        id: "breast.arm.catch",
        title: "抱水",
        description: "外划到位后建立抱水压力，为内收做准备。",
        teachingModuleId: "BREAST-03",
      },
      {
        id: "breast.arm.insweep",
        title: "内收",
        description: "手臂向内、向下收拢，产生蛙泳划手的主要推进力。",
        teachingModuleId: "BREAST-03",
      },
      {
        id: "breast.arm.extension",
        title: "前伸",
        description: "收手后手臂快速向前伸出，衔接下一次划手或蹬腿滑行。",
        teachingModuleId: "BREAST-03",
      },
    ],
    // Stage 3 呼吸
    [
      {
        id: "breast.breath.lift_head",
        title: "抬头",
        description: "借助划手时身体自然上升的时机抬头，而不是主动用力抬头。",
        teachingModuleId: "BREAST-04",
      },
      {
        id: "breast.breath.inhale",
        title: "吸气",
        description: "抬头时短促吸气，不需要把整个头部抬出水面。",
        teachingModuleId: "BREAST-04",
      },
      {
        id: "breast.breath.underwater_exhale",
        title: "水下呼气",
        description: "手臂前伸的同时低头，开始持续、缓慢的水下呼气。",
        teachingModuleId: "BREAST-04",
      },
      {
        id: "breast.breath.rhythm",
        title: "呼吸节奏",
        description: "让吸气和呼气跟随划手节奏自然发生，避免呼吸打乱划手。",
        teachingModuleId: "BREAST-04",
      },
    ],
    // Stage 4 配合
    [
      {
        id: "breast.combo.arm_leg",
        title: "手腿配合",
        description: "把划手和蹬腿按核心节奏（划手→收腿→蹬夹→前伸）组合起来。",
        teachingModuleId: "BREAST-05",
      },
      {
        id: "breast.combo.breath",
        title: "呼吸配合",
        description: "把呼吸整合进划手蹬腿的节奏中，形成完整的动作循环。",
        teachingModuleId: "BREAST-05",
      },
      {
        id: "breast.combo.glide",
        title: "滑行",
        description: "在完整配合中保留滑行阶段，用流线型减少阻力，而不是省略滑行。",
        teachingModuleId: "BREAST-05",
      },
      {
        id: "breast.distance.25m",
        title: "连续 25m",
        description: "在不过度喘气、动作不变形的情况下连续完成 25 米蛙泳。",
        teachingModuleId: "BREAST-06",
      },
      {
        id: "breast.distance.50m",
        title: "连续 50m",
        description: "把连续蛙泳距离延长到 50 米，保持动作稳定。",
        teachingModuleId: "BREAST-06",
      },
    ],
    // Stage 5 效率
    [
      {
        id: "breast.efficiency.reduce_drag",
        title: "减少阻力",
        description: "通过更好的身体姿态和滑行减少蛙泳游进时的阻力。",
        teachingModuleId: "BREAST-07",
      },
      {
        id: "breast.efficiency.glide",
        title: "增加滑行",
        description: "延长每个周期的滑行时间，而不是急于开始下一次划手蹬腿。",
        teachingModuleId: "BREAST-07",
      },
      {
        id: "breast.efficiency.kick",
        title: "改善腿部动作",
        description: "进一步优化蹬夹的时机和幅度，提高蹬腿的推进效率。",
        teachingModuleId: "BREAST-07",
      },
      {
        id: "breast.efficiency.rhythm",
        title: "改善节奏",
        description: "让划手、呼吸、蹬腿、滑行的节奏更连贯、更省力。",
        teachingModuleId: "BREAST-07",
      },
    ],
  ],
})

// --- 第13节 仰泳技能树 ---
// 仰泳不需要 common.water.exhale 作为前置（PRD.md 第13/32节：仰泳面部始终露出
// 水面，不依赖水下持续呼气）。
const BACK_SKILLS = buildRoute({
  strokeId: "back",
  stagePrefix: "back",
  stage1Prerequisites: ["common.water.adaptation", "common.water.back_float", "common.water.streamline"],
  stages: [
    // Stage 1
    [
      {
        id: "back.kick.basic",
        title: "仰泳打腿",
        description: "在仰卧姿态下练习髋部带动的小幅度打腿。",
        teachingModuleId: "BACK-02",
      },
      {
        id: "back.kick.ankle",
        title: "脚踝放松",
        description: "专门练习放松脚踝，让打腿时脚尖能自然伸展。",
        teachingModuleId: "BACK-02",
      },
      {
        id: "back.body.position",
        title: "身体位置",
        description: "调整耳朵、臀部和身体伸展程度，建立稳定的仰卧水平姿态。",
        teachingModuleId: "BACK-01",
      },
    ],
    // Stage 2
    [
      {
        id: "back.arm.single",
        title: "单臂仰泳",
        description: "单独练习一侧手臂的完整仰泳划水，降低协调难度。",
        teachingModuleId: "BACK-03",
      },
      {
        id: "back.arm.entry",
        title: "入水",
        description: "练习仰泳手臂的入水位置，避免入水偏向头部中线。",
        teachingModuleId: "BACK-03",
      },
      {
        id: "back.arm.catch",
        title: "抱水",
        description: "入水后手臂下压建立水压，为推水做准备。",
        teachingModuleId: "BACK-03",
      },
      {
        id: "back.arm.push",
        title: "推水",
        description: "完成划水前半程后加速向后推进，直到手臂完成完整划水。",
        teachingModuleId: "BACK-03",
      },
    ],
    // Stage 3
    [
      {
        id: "back.rotation.body",
        title: "身体旋转",
        description: "练习肩髋协调、绕身体长轴的转动，而不是只靠手臂力量划水。",
        teachingModuleId: "BACK-04",
      },
      {
        id: "back.arm.alternating",
        title: "手臂交替",
        description: "让两侧手臂交替划水的节奏保持均匀，衔接顺畅。",
        teachingModuleId: "BACK-03",
      },
      {
        id: "back.stroke.rhythm",
        title: "节奏",
        description: "建立稳定的仰泳整体划水节奏，让身体旋转和划水协调配合。",
        teachingModuleId: "BACK-05",
      },
    ],
    // Stage 4
    [
      {
        id: "back.combo.full",
        title: "完整仰泳",
        description: "把打腿、划水、转体和呼吸整合成完整的仰泳动作循环。",
        teachingModuleId: "BACK-06",
      },
      {
        id: "back.distance.25m",
        title: "25m",
        description: "保持方向和动作稳定，连续完成 25 米仰泳。",
        teachingModuleId: "BACK-06",
      },
      {
        id: "back.distance.50m",
        title: "50m",
        description: "把连续仰泳距离延长到 50 米，动作不明显变形。",
        teachingModuleId: "BACK-06",
      },
      {
        id: "back.distance.100m",
        title: "100m",
        description: "把连续仰泳距离延长到 100 米，保持方向和节奏稳定。",
        teachingModuleId: "BACK-06",
      },
    ],
    // Stage 5
    [
      {
        id: "back.efficiency.reduce_resistance",
        title: "效率",
        description: "通过保持身体水平延展减少阻力，提高每次划水的推进距离。",
        teachingModuleId: "BACK-07",
      },
      {
        id: "back.efficiency.rhythm",
        title: "节奏",
        description: "用稳定节奏代替单纯追求划水力量，减少不必要的身体摆动。",
        teachingModuleId: "BACK-07",
      },
      {
        id: "back.efficiency.endurance",
        title: "耐力",
        description: "在保持技术质量的前提下，逐步提高连续仰泳的耐力。",
        teachingModuleId: "BACK-07",
      },
    ],
  ],
})

// --- 第14节 蝶泳技能树 ---
const FLY_SKILLS = buildRoute({
  strokeId: "fly",
  stagePrefix: "fly",
  stage1Prerequisites: COMMON_FOR_EXHALE_ROUTES,
  stages: [
    // Stage 1
    [
      {
        id: "fly.kick.dolphin_basic",
        title: "蝶泳腿基础",
        description: "建立从躯干和髋部开始的连续海豚腿波浪动作。",
        teachingModuleId: "FLY-01",
        safetyNotes: FLY_SAFETY_NOTE,
      },
      {
        id: "fly.kick.fin_action",
        title: "鱼鳍式动作",
        description: "想象身体像鱼尾一样连续摆动，避免只靠膝盖弯曲打腿。",
        teachingModuleId: "FLY-01",
        safetyNotes: FLY_SAFETY_NOTE,
      },
      {
        id: "fly.kick.hip_drive",
        title: "髋部发力",
        description: "练习让海豚腿的动力主要来自髋部，而不是膝盖。",
        teachingModuleId: "FLY-01",
        safetyNotes: FLY_SAFETY_NOTE,
      },
      {
        id: "fly.kick.wave",
        title: "波浪动作",
        description: "在流线型姿态下让波浪从核心传导到脚尖，减少水下阶段的阻力。",
        teachingModuleId: "FLY-02",
        safetyNotes: FLY_SAFETY_NOTE,
      },
    ],
    // Stage 2
    [
      {
        id: "fly.arm.single",
        title: "单臂蝶泳",
        description: "单独练习一侧手臂配合海豚腿，降低完整蝶泳的复杂度。",
        teachingModuleId: "FLY-03",
        safetyNotes: FLY_SAFETY_NOTE,
      },
      {
        id: "fly.body.wave",
        title: "身体波浪",
        description: "在加入手臂之前，先巩固贯穿全身、不因划水而中断的身体波浪。",
        teachingModuleId: "FLY-02",
        safetyNotes: FLY_SAFETY_NOTE,
      },
    ],
    // Stage 3
    [
      {
        id: "fly.arm.double",
        title: "双臂",
        description: "练习双臂蝶泳划水的入水、建压、推进和出水恢复。",
        teachingModuleId: "FLY-04",
        safetyNotes: FLY_SAFETY_NOTE,
      },
      {
        id: "fly.breath.basic",
        title: "呼吸",
        description: "在不破坏身体波浪节奏的情况下完成蝶泳呼吸。",
        teachingModuleId: "FLY-05",
        safetyNotes: FLY_SAFETY_NOTE,
      },
    ],
    // Stage 4
    [
      {
        id: "fly.combo.arm_leg",
        title: "手腿配合",
        description: "把海豚腿、双臂划水和呼吸组合成核心节奏，初期以短距离高质量为主。",
        teachingModuleId: "FLY-06",
        safetyNotes: FLY_SAFETY_NOTE,
      },
    ],
    // Stage 5
    [
      {
        id: "fly.distance.continuous",
        title: "连续蝶泳",
        description: "按 10m → 15m → 25m → 50m 逐级增加距离，动作崩坏时应降低距离，而不是勉强坚持。",
        teachingModuleId: "FLY-07",
        safetyNotes: FLY_SAFETY_NOTE,
      },
    ],
    // Stage 6
    [
      {
        id: "fly.efficiency.overall",
        title: "效率",
        description: "减少无效力量消耗，同时保持身体波浪和呼吸质量。",
        teachingModuleId: "FLY-08",
        safetyNotes: FLY_SAFETY_NOTE,
      },
      {
        id: "fly.efficiency.rhythm",
        title: "节奏",
        description: "避免为了速度增加频率而牺牲节奏，保持动作连贯。",
        teachingModuleId: "FLY-08",
        safetyNotes: FLY_SAFETY_NOTE,
      },
      {
        id: "fly.efficiency.endurance",
        title: "耐力",
        description: "在不明显增加疲劳的情况下提高蝶泳的推进效率和持续能力。",
        teachingModuleId: "FLY-08",
        safetyNotes: FLY_SAFETY_NOTE,
      },
    ],
  ],
})

export const SKILLS: Skill[] = [
  ...COMMON_SKILLS,
  ...FREE_BASIC_SKILLS,
  ...FREE_TI_SKILLS,
  ...BREAST_SKILLS,
  ...BACK_SKILLS,
  ...FLY_SKILLS,
]
