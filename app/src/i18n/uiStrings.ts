import { useLanguage } from "./LanguageContext"

type StringParams = Record<string, string | number>
type StringFn = (params?: StringParams) => string

interface StringEntry {
  zh: StringFn
  en: StringFn
}

/** Wraps a plain string as a `StringFn` that ignores params — for the many
 * entries that never need interpolation. */
function plain(text: string): StringFn {
  return () => text
}

/**
 * Every static UI string in the app (chrome, labels, messages — NOT
 * curriculum content, which lives in `localize.ts` instead since it's
 * seeded data keyed by skill/module id rather than a fixed UI copy deck).
 * Looked up by `useT()`'s `t(key, params?)`, dotted-namespaced per page so
 * two pages can each have their own "loading" entry etc. without colliding.
 */
const UI_STRINGS: Record<string, StringEntry> = {
  // --- shared across pages ---
  "common.loading": { zh: plain("正在加载…"), en: plain("Loading…") },
  "common.noCurriculumData": {
    zh: plain("还没有课程数据，请尝试刷新页面重新初始化。"),
    en: plain("No curriculum data yet — try refreshing the page to reinitialize."),
  },
  "common.minutes": { zh: (p) => `${p?.n ?? 0} 分钟`, en: (p) => `${p?.n ?? 0} min` },
  "common.commonBasics": { zh: plain("通用基础技能"), en: plain("Common Basics") },
  "common.none": { zh: plain("无"), en: plain("None") },
  "common.cancel": { zh: plain("取消"), en: plain("Cancel") },

  // --- nav (AppShell) ---
  "nav.home": { zh: plain("首页"), en: plain("Home") },
  "nav.training": { zh: plain("训练"), en: plain("Training") },
  "nav.history": { zh: plain("历史"), en: plain("History") },
  "nav.settings": { zh: plain("设置"), en: plain("Settings") },

  // --- HomePage ---
  "home.title": { zh: plain("首页"), en: plain("Home") },
  "home.overallProgress": { zh: plain("总体进度"), en: plain("Overall Progress") },
  "home.totalTrainingTime": { zh: plain("累计训练时间"), en: plain("Total Training Time") },
  "home.mostRecentSession": { zh: plain("最近一次训练"), en: plain("Most Recent Session") },
  "home.noSessionYet": {
    zh: plain("还没有训练记录，开始你的第一次训练吧。"),
    en: plain("No training sessions yet — start your first one."),
  },
  "home.todaysSuggestion": { zh: plain("今天建议"), en: plain("Today's Suggestion") },
  "home.recommendedMinutes": { zh: (p) => `建议练习 ${p?.n} 分钟`, en: (p) => `Recommended: ${p?.n} min` },
  "home.startTodayTraining": { zh: plain("开始今天训练"), en: plain("Start Today's Training") },

  // --- SkillTreePage ---
  "skillTree.title": { zh: plain("技能树"), en: plain("Skill Tree") },
  "skillTree.strokeNotFound": {
    zh: (p) => `未找到泳姿 "${p?.strokeId}"。`,
    en: (p) => `Stroke "${p?.strokeId}" not found.`,
  },

  // --- SkillDetailPage ---
  "skillDetail.title": { zh: plain("技能详情"), en: plain("Skill Detail") },
  "skillDetail.skillNotFound": {
    zh: (p) => `未找到技能 "${p?.skillId}"。`,
    en: (p) => `Skill "${p?.skillId}" not found.`,
  },
  "skillDetail.status": { zh: plain("状态"), en: plain("Status") },
  "skillDetail.manualUnlockTag": { zh: plain("（手动解锁）"), en: plain(" (Manually Unlocked)") },
  "skillDetail.lockedExplanation": {
    zh: plain(
      "这个技能的前置技能还没有达到建议的熟练度。如果你认为自己已经具备这项能力，可以手动解锁——PRD 第8节允许这样做，因为成年人学习差异很大。手动解锁只会让你能开始训练这一个技能，不会自动帮你解锁更后面的技能。",
    ),
    en: plain(
      "This skill's prerequisites haven't reached the recommended proficiency yet. If you feel you already have this ability, you can unlock it manually — adult learners progress very differently, so this is allowed. Manually unlocking only opens this one skill; it won't automatically unlock anything further down the tree.",
    ),
  },
  "skillDetail.manualUnlockButton": { zh: plain("手动解锁此技能"), en: plain("Manually Unlock This Skill") },
  "skillDetail.unlocking": { zh: plain("解锁中…"), en: plain("Unlocking…") },
  "skillDetail.startTrainingLink": { zh: plain("开始训练这个技能"), en: plain("Start Training This Skill") },
  "skillDetail.estimatedTime": { zh: plain("预计学习时间"), en: plain("Estimated Learning Time") },
  "skillDetail.minutesRange": {
    zh: (p) => `${p?.min}～${p?.max} 分钟`,
    en: (p) => `${p?.min}–${p?.max} min`,
  },
  "skillDetail.prerequisites": { zh: plain("前置技能"), en: plain("Prerequisites") },
  "skillDetail.whyLearn": { zh: plain("为什么要学习"), en: plain("Why Learn This") },
  "skillDetail.techniquePoints": { zh: plain("技术要领"), en: plain("Technique Points") },
  "skillDetail.exercises": { zh: plain("练习方法"), en: plain("Practice Methods") },
  "skillDetail.commonMistakesChecklist": {
    zh: plain("常见错误 · 自我检查"),
    en: plain("Common Mistakes · Self-Check"),
  },
  "skillDetail.passCriteria": { zh: plain("过关标准"), en: plain("Mastery Criteria") },
  "skillDetail.checklistDisclaimer": {
    zh: plain("以上勾选仅供自查参考，不会被保存，也不影响解锁——解锁只看下面的熟练度自评（PRD 第19节）。"),
    en: plain(
      "These checkboxes are for self-review only — they aren't saved and don't affect unlocking, which is based solely on the proficiency self-assessment below.",
    ),
  },
  "skillDetail.myTrainingAndAssessment": { zh: plain("我的训练与自评"), en: plain("My Training & Self-Assessment") },
  "skillDetail.myTrainingTime": { zh: (p) => `我的训练时间：${p?.n} 分钟`, en: (p) => `My Training Time: ${p?.n} min` },
  "skillDetail.lastPracticed": { zh: plain("最近一次练习："), en: plain("Last Practiced: ") },
  "skillDetail.myProficiency": {
    zh: (p) => `我的熟练度：${p?.n}/5 · ${p?.label}`,
    en: (p) => `My Proficiency: ${p?.n}/5 · ${p?.label}`,
  },
  "skillDetail.confidence": { zh: (p) => `信心：${p?.n}/5`, en: (p) => `Confidence: ${p?.n}/5` },
  "skillDetail.stability": { zh: (p) => `稳定性：${p?.n}/5`, en: (p) => `Stability: ${p?.n}/5` },
  "skillDetail.myNotes": { zh: plain("我的备注"), en: plain("My Notes") },
  "skillDetail.noNotes": { zh: plain("暂无备注"), en: plain("No notes yet") },

  // --- TrainingPage ---
  "training.title": { zh: plain("今日训练"), en: plain("Today's Training") },
  "training.step1ChooseStroke": { zh: plain("1. 选择泳姿"), en: plain("1. Choose a Stroke") },
  "training.chooseRoute": { zh: plain("选择路线"), en: plain("Choose a Route") },
  "training.step2ChooseSkill": { zh: plain("2. 选择技能"), en: plain("2. Choose a Skill") },
  "training.noSkillsOnRoute": {
    zh: plain("这条路线暂时还没有可训练的技能。"),
    en: plain("No trainable skills on this route yet."),
  },
  "training.nextSetTime": { zh: plain("下一步：设置训练时间"), en: plain("Next: Set Training Time") },
  "training.step3SetTime": { zh: plain("3. 设置训练时间（分钟）"), en: plain("3. Set Training Time (minutes)") },
  "training.target": { zh: (p) => `目标 ${p?.n} 分钟`, en: (p) => `Target: ${p?.n} min` },
  "training.startTimer": { zh: plain("开始计时"), en: plain("Start Timer") },
  "training.pause": { zh: plain("暂停"), en: plain("Pause") },
  "training.resume": { zh: plain("继续"), en: plain("Resume") },
  "training.finish": { zh: plain("结束训练"), en: plain("Finish Training") },
  "training.thisSession": { zh: plain("本次训练"), en: plain("This Session") },
  "training.step4Proficiency": { zh: plain("4. 自评 · 熟练度"), en: plain("4. Self-Assessment · Proficiency") },
  "training.thresholdHint": {
    zh: (p) => `达到 ${p?.n} 及以上，会建议解锁下一阶段。`,
    en: (p) => `Reaching ${p?.n} or above will suggest unlocking the next stage.`,
  },
  "training.confidence": { zh: plain("信心"), en: plain("Confidence") },
  "training.stability": { zh: plain("稳定性"), en: plain("Stability") },
  "training.fatigue": { zh: plain("疲劳程度"), en: plain("Fatigue Level") },
  "training.notesStep": { zh: plain("5. 感受（可选）"), en: plain("5. Notes (optional)") },
  "training.saveFailed": { zh: plain("保存失败，请重试。"), en: plain("Failed to save, please try again.") },
  "training.saveTraining": { zh: plain("保存训练"), en: plain("Save Training") },
  "training.saving": { zh: plain("保存中…"), en: plain("Saving…") },
  "training.trainingSaved": { zh: plain("训练已保存"), en: plain("Training Saved") },
  "training.durationAndProficiency": {
    zh: (p) => `${p?.n} 分钟 · 熟练度 ${p?.proficiency}/5`,
    en: (p) => `${p?.n} min · Proficiency ${p?.proficiency}/5`,
  },
  "training.messageUnlocked": {
    zh: plain("已达到解锁标准，相关技能可能已解锁——去技能树看看吧。"),
    en: plain("You've reached the unlock threshold — related skills may now be unlocked. Check the skill tree."),
  },
  "training.messageAlreadyMastered": {
    zh: plain(
      "这个技能之前已经达标，相关技能仍保持解锁——这次自评分数较低不会改变这一点，如果感觉生疏可以针对性再练习。",
    ),
    en: plain(
      "This skill was already mastered before — related skills stay unlocked, and this lower score doesn't change that. If it felt rusty, feel free to practice it again.",
    ),
  },
  "training.messageKeepGoing": {
    zh: plain("继续加油，熟练度达到 3 及以上会建议解锁下一阶段。"),
    en: plain("Keep it up — reaching a proficiency of 3 or above will suggest unlocking the next stage."),
  },
  "training.backHome": { zh: plain("返回首页"), en: plain("Back to Home") },
  "training.trainAgain": { zh: plain("再训练一次"), en: plain("Train Again") },

  // --- HistoryPage ---
  "history.title": { zh: plain("训练历史"), en: plain("Training History") },
  "history.periodDay": { zh: plain("今天"), en: plain("Today") },
  "history.periodWeek": { zh: plain("本周"), en: plain("This Week") },
  "history.periodMonth": { zh: plain("本月"), en: plain("This Month") },
  "history.periodAll": { zh: plain("全部"), en: plain("All Time") },
  "history.totalTrainingTime": { zh: (p) => `${p?.period}总训练时间`, en: (p) => `${p?.period} Total Training Time` },
  "history.sessionCount": { zh: (p) => `${p?.period}训练次数`, en: (p) => `${p?.period} Sessions` },
  "history.sessionCountValue": { zh: (p) => `${p?.n} 次`, en: (p) => `${p?.n}` },
  "history.averageSessionLength": { zh: plain("平均每次训练时间"), en: plain("Average Session Length") },
  "history.timeByStroke": { zh: (p) => `${p?.period}各泳姿训练时间`, en: (p) => `${p?.period} Time by Stroke` },
  "history.noSessionsInRange": {
    zh: plain("这个时间范围内还没有训练记录。"),
    en: plain("No training sessions in this range yet."),
  },
  "history.monthlyTrainingTime": { zh: plain("每月训练时间"), en: plain("Monthly Training Time") },
  "history.noSessionsYet": { zh: plain("还没有训练记录。"), en: plain("No training sessions yet.") },
  "history.skillsProgressed": { zh: (p) => `${p?.period}技能进步`, en: (p) => `${p?.period} Skills Progressed` },
  "history.noSkillsMasteredInRange": {
    zh: plain("这个时间范围内还没有技能达到解锁标准。"),
    en: plain("No skills reached mastery in this range yet."),
  },

  // --- SettingsPage ---
  "settings.title": { zh: plain("设置"), en: plain("Settings") },
  "settings.language": { zh: plain("界面语言"), en: plain("Language") },
  "settings.exportTitle": { zh: plain("导出我的数据"), en: plain("Export My Data") },
  "settings.exportDescription": {
    zh: plain("导出为 JSON 备份文件，包含设置、技能进度和训练记录，不含课程内容本身。"),
    en: plain("Exports a JSON backup containing your settings, skill progress, and training sessions — not the curriculum content itself."),
  },
  "settings.exporting": { zh: plain("导出中…"), en: plain("Exporting…") },
  "settings.exportButton": { zh: plain("导出我的数据"), en: plain("Export My Data") },
  "settings.exportedAs": { zh: (p) => `已导出：${p?.filename}`, en: (p) => `Exported: ${p?.filename}` },
  "settings.exportFailed": { zh: plain("导出失败，请重试。"), en: plain("Export failed, please try again.") },
  "settings.importTitle": { zh: plain("导入我的数据"), en: plain("Import My Data") },
  "settings.importDescription": {
    zh: plain(
      "从之前导出的 JSON 备份恢复数据。导入会用备份内容覆盖当前设备上的全部训练记录、技能进度和设置——请确认这是你想要的操作。",
    ),
    en: plain(
      "Restore data from a previously exported JSON backup. Importing overwrites all training sessions, skill progress, and settings on this device with the backup's contents — make sure that's what you want.",
    ),
  },
  "settings.invalidJson": { zh: plain("文件不是有效的 JSON。"), en: plain("The file isn't valid JSON.") },
  "settings.readFileFailed": {
    zh: plain("读取文件失败，请重试。"),
    en: plain("Failed to read the file, please try again."),
  },
  "settings.importFailed": {
    zh: plain("导入失败，数据未被修改，请重试。"),
    en: plain("Import failed — your data wasn't changed. Please try again."),
  },
  "settings.backupTime": { zh: plain("备份时间："), en: plain("Backup Time: ") },
  "settings.sessionCountLine": { zh: (p) => `训练记录：${p?.n} 条`, en: (p) => `Training Sessions: ${p?.n}` },
  "settings.progressCountLine": { zh: (p) => `技能进度：${p?.n} 条`, en: (p) => `Skill Progress Records: ${p?.n}` },
  "settings.unresolvedWarning": {
    zh: (p) => `有 ${p?.n} 条记录关联的技能已在新版本课程中调整，相关数据已保留但暂不关联具体技能。`,
    en: (p) => `${p?.n} record(s) reference skills that have changed in a newer curriculum version — the data is kept but no longer linked to a specific skill.`,
  },
  "settings.confirmImport": { zh: plain("确认导入（覆盖当前数据）"), en: plain("Confirm Import (Overwrite Current Data)") },
  "settings.importing": { zh: plain("导入中…"), en: plain("Importing…") },
  "settings.importSuccess": {
    zh: plain("导入成功。请刷新页面以查看恢复后的数据。"),
    en: plain("Import successful. Please refresh the page to see the restored data."),
  },
  "settings.refreshPage": { zh: plain("刷新页面"), en: plain("Refresh Page") },
}

/**
 * `t(key, params?)` bound to the current language — the one hook every
 * component needs for static UI copy. Throws (via a console.error + a
 * visible fallback of the raw key, rather than a crash) if a key is
 * missing, since that's a programmer error worth surfacing during
 * development without taking down the page for the person using it.
 */
export function useT(): (key: string, params?: StringParams) => string {
  const { language } = useLanguage()
  return (key: string, params?: StringParams): string => {
    const entry = UI_STRINGS[key]
    if (!entry) {
      console.error(`Missing UI string for key "${key}"`)
      return key
    }
    return entry[language](params)
  }
}
