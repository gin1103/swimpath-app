# SwimPath

个人自学游泳训练与技能进阶 PWA。

## 1. 产品定位

SwimPath 是一个个人使用的游泳自学辅助工具。

核心目标不是单纯记录游泳时间，而是建立：

> **泳姿 → 技能树 → 学习阶段 → 训练时间 → 技能自评 → 阶段解锁 → 下一阶段训练**

的完整学习闭环。

用户通过 App 了解：

1. 当前正在学习什么
2. 这个技能需要掌握什么
3. 推荐练习多久
4. 常见错误是什么
5. 什么情况下认为自己基本掌握
6. 下一阶段是什么
7. 自己已经训练了多少时间
8. 自己的技术进步情况

---

# 2. 产品原则

## 2.1 本地优先

第一版本：

* 无账号
* 无登录
* 无服务器
* 无云数据库
* 数据默认只保存在本机
* 支持 JSON 数据导出
* 支持 JSON 数据导入
* 完全离线可使用

用户数据必须与课程内容分离。

---

# 3. 技术方案

## Frontend

* React
* TypeScript
* Vite

## UI

优先使用简单、稳定、移动端友好的 UI 方案。

不要为了视觉效果引入大量依赖。

## Storage

使用 IndexedDB 保存用户数据。

建议通过 Dexie 或类似成熟 IndexedDB 封装库访问数据库，而不是在业务组件中直接大量操作原生 IndexedDB。

IndexedDB 适合存储复杂结构化数据，并且可以在网络不可用时继续工作。浏览器的本地数据仍然可能因为用户清除网站数据、浏览器策略、存储限制等原因丢失，因此必须提供数据导出/导入机制。

## PWA

使用 Service Worker 缓存：

* HTML
* JavaScript
* CSS
* 图标
* 课程数据
* 必要静态资源

目标：

> 用户进入泳池后，即使手机没有网络，App 仍然可以查看课程、开始计时、记录训练和修改进度。

---

# 4. 核心用户

第一阶段只考虑：

> 一个成年人，自学游泳。

不要设计多人账号、社交、教练系统。

---

# 5. 四种泳姿

系统支持：

1. 自由泳
2. 蛙泳
3. 仰泳
4. 蝶泳

自由泳包含两条学习路线：

### 普通自由泳

### 全浸式自由泳 / TI 路线

TI 不作为第五种泳姿，而是自由泳下的一条技术路线。

数据结构：

```text
自由泳
├── 普通路线
└── 全浸式自由泳路线
```

---

# 6. 技能树设计

技能不是简单的课程列表，而是有前后依赖关系的 Skill Tree。

每一个技能都有：

```text
技能名称
所属泳姿
所属阶段
前置技能
推荐学习时间
典型训练次数
技术目标
技术要领
常见错误
练习方法
过关标准
用户熟练度
用户备注
```

说明：通用基础技能（见第 32 节）不属于任何单一泳姿，"所属泳姿"字段对这些技能为空。

---

# 7. 技能熟练度

采用 0～5：

```text
0 = 未开始
1 = 了解动作
2 = 可以尝试
3 = 可以基本完成
4 = 比较稳定
5 = 熟练
```

注意：

> 熟练度是用户自评，不代表专业教练认证。

---

# 8. 解锁规则

技能不会因为达到时间自动认为用户已经学会。

推荐逻辑：

```text
达到建议训练时间
        ↓
进行自评
        ↓
满足过关条件？
   ↙          ↘
 是            否
 ↓             ↓
解锁下一阶段   继续训练
```

"过关条件"只使用第 19 节的熟练度自评（0～5，>=3 视为满足）。技能详情页里的"过关标准" checklist（见第 15 节）只是给用户自查的参考清单，不会逐项持久化，也不单独影响解锁判断。

但必须允许用户：

> 手动解锁下一阶段。

因为成年人学习游泳差异很大。

---

# 9. 时间模型

不要把学习时间设计成绝对标准。

使用：

```text
minimum_minutes
recommended_minutes
typical_sessions
```

例如：

```json
{
  "minimum_minutes": 60,
  "recommended_minutes": 120,
  "typical_sessions": "2-4"
}
```

这些时间属于：

> 成人初学者的产品参考值

不是医学、体育教学或科学意义上的统一标准。

实际学习时间受：

* 水性
* 怕水程度
* 年龄
* 运动能力
* 过去运动经验
* 每次训练时间
* 是否有人指导
* 泳池环境

影响。

后续如果有可靠资料，应给课程数据增加 source 字段。

---

# 10. V1 自由泳技能树

## Stage 0：通用基础技能（共享）

自由泳不单独定义水中适应/水中呼气/漂浮/流线型这些技能，而是复用跨泳姿共享的通用基础技能（见第 32 节）。

Stage 1 的前置技能：

* common.water.adaptation
* common.water.exhale
* common.water.front_float
* common.water.streamline

---

## Stage 1：自由泳腿

### 1.1 扶板打腿

### 1.2 不扶板打腿

### 1.3 流线型打腿

### 1.4 侧身打腿

目标：

理解：

* 脚踝放松
* 腿部连续动作
* 不过度屈膝
* 身体保持水平

---

## Stage 2：身体平衡

### 2.1 前后平衡

### 2.2 左右平衡

### 2.3 侧身平衡

### 2.4 转体

重点：

> 自由泳不是单纯依靠手臂向前拉身体。

---

## Stage 3：呼吸

### 3.1 水下持续呼气

### 3.2 侧身呼吸

### 3.3 单侧呼吸

### 3.4 双侧呼吸

### 3.5 呼吸与身体旋转结合

常见错误：

* 抬头
* 过度转头
* 呼吸时身体停止
* 水下憋气
* 呼吸时身体下沉

---

## Stage 4：手臂

### 4.1 单臂划水

### 4.2 入水

### 4.3 前伸

### 4.4 抱水

### 4.5 推水

### 4.6 出水

### 4.7 手臂与身体旋转结合

---

## Stage 5：完整自由泳

### 5.1 手 + 腿

### 5.2 手 + 呼吸

### 5.3 手 + 腿 + 呼吸

### 5.4 连续 25m

### 5.5 连续 50m

### 5.6 连续 100m

---

## Stage 6：效率

### 6.1 降低阻力

### 6.2 改善身体位置

### 6.3 改善呼吸

### 6.4 减少无效动作

### 6.5 划水效率

### 6.6 稳定配速

---

# 11. 全浸式自由泳路线

自由泳 → TI

> 2026-09-10 更新：以下技能树已按鱼式自由泳（Total Immersion）经典练习序列重新梳理为 5
> 个 Stage、16 个技能，替换此前更笼统的 5 Stage、15 技能版本。

## TI Stage 1：平衡与漂浮

### 超人漂浮

### 超人打腿

### 黄金侧位

---

## TI Stage 2：核心带动转动

### 穿刺侧滑

### 穿刺换边

### 拉链式划线

---

## TI Stage 3：摆臂回收

### 摆臂侧滑

### 摆臂换边

### 布娃娃式回臂

---

## TI Stage 4：精细手部技术

### 信箱式入水

### 木偶手练习

### 高肘抓水

---

## TI Stage 5：呼吸与整合

### 甜蜜点

### 头部失重法

### 二拍打腿

### 完整泳姿整合

注意：

App 不应声称：

> TI 一定比普通自由泳更快/更有效。

应该描述为：

> 一种强调平衡、流线、身体旋转和降低阻力的自由泳学习理念。

---

# 12. 蛙泳技能树

## Stage 0：通用基础技能（共享）

蛙泳复用跨泳姿共享的通用基础技能（见第 32 节），不单独定义。

Stage 1 蛙泳腿的前置技能：

* common.water.adaptation
* common.water.exhale
* common.water.front_float
* common.water.streamline

## Stage 1 蛙泳腿

* 收腿
* 翻脚
* 蹬夹
* 滑行
* 连续蛙腿

## Stage 2 蛙泳手

* 外划
* 抱水
* 内收
* 前伸

## Stage 3 呼吸

* 抬头
* 吸气
* 水下呼气
* 呼吸节奏

## Stage 4 配合

* 手腿配合
* 呼吸配合
* 滑行
* 连续 25m
* 连续 50m

## Stage 5 效率

* 减少阻力
* 增加滑行
* 改善腿部动作
* 改善节奏

---

# 13. 仰泳技能树

## Stage 0：通用基础技能（共享）

仰泳复用跨泳姿共享的通用基础技能（见第 32 节），不单独定义。仰泳不需要 common.water.exhale 作为前置——仰泳面部始终露出水面，不依赖水下持续呼气这个技能。

Stage 1 的前置技能：

* common.water.adaptation
* common.water.back_float
* common.water.streamline

## Stage 1

* 仰泳打腿
* 脚踝放松
* 身体位置

## Stage 2

* 单臂仰泳
* 入水
* 抱水
* 推水

## Stage 3

* 身体旋转
* 手臂交替
* 节奏

## Stage 4

* 完整仰泳
* 25m
* 50m
* 100m

## Stage 5

* 效率
* 节奏
* 耐力

---

# 14. 蝶泳技能树

蝶泳必须设计成更加渐进的路线。

## Stage 0：通用基础技能（共享）

蝶泳复用跨泳姿共享的通用基础技能（见第 32 节），不单独定义。

Stage 1 的前置技能：

* common.water.adaptation
* common.water.exhale
* common.water.front_float
* common.water.streamline

## Stage 1

* 蝶泳腿基础
* 鱼鳍式动作
* 髋部发力
* 波浪动作

## Stage 2

* 单臂蝶泳
* 身体波浪

## Stage 3

* 双臂
* 呼吸

## Stage 4

* 手腿配合

## Stage 5

* 连续蝶泳

## Stage 6

* 效率
* 节奏
* 耐力

---

# 15. 技能详情页

每个技能必须统一使用以下结构：

```text
技能名称

学习阶段

预计学习时间

前置技能

为什么要学习

技术要领

练习方法

常见错误

自我检查

过关标准

我的训练时间

我的熟练度

我的备注
```

例如：

```text
自由泳 · 侧身呼吸

建议学习时间：
45～90 分钟

技术要领：

1. 身体保持水平
2. 呼吸时转头，而不是抬头
3. 水下持续呼气
4. 嘴巴刚好离开水面
5. 呼吸后恢复头部位置

常见错误：

□ 抬头
□ 身体下沉
□ 呼吸时停止打腿
□ 转头过度

过关标准：

□ 可以连续完成 10 次
□ 身体不会明显下沉
□ 呼吸不会明显停顿
□ 至少一侧比较稳定

我的熟练度：

☆☆☆☆☆
```

如果某个字段的课程内容暂缺（例如"过关标准"尚未撰写完整），页面应展示统一的占位文案（例如"该项内容持续完善中"），而不是留空或报错。

"常见错误"和"过关标准"这两组 checklist 只是自评时的参考提示，用户逐项打勾的状态不持久化，App 不需要为它们单独存储数据；实际驱动解锁建议的只有第 19 节的熟练度数值。

---

# 16. 首页

首页必须非常简单。

显示：

```text
当前泳姿
当前阶段
当前技能
总体进度
累计训练时间
最近一次训练
今天建议训练内容
```

说明："当前泳姿 / 当前阶段 / 当前技能"不是用户手动设置或单独持久化的字段，而是由应用逻辑从 SkillProgress 状态推导：优先取状态为 learning 中最近一次练习的技能；如果没有 learning 状态的技能，取第一个 available 的技能。这个推导逻辑属于 Application/Domain 层，不需要在 UserSettings 中保存"当前技能"指针。

核心按钮：

> 开始今天训练

---

# 17. 今日训练

用户点击：

> 开始训练

进入：

```text
选择泳姿
↓
选择技能
↓
设置训练时间
↓
开始计时
↓
暂停/继续
↓
结束训练
↓
自评
↓
记录备注
```

训练结束后：

```text
本次训练：
45 分钟

技能：
自由泳 · 侧身呼吸

熟练度：
3/5

感受：
__________

[保存训练]
```

---

# 18. 自动进度

保存训练后：

```text
技能累计训练时间 += 本次训练时间
```

然后判断：

```text
达到推荐时间？
```

如果达到：

> 建议进行阶段自评。

而不是直接解锁。

---

# 19. 自评系统

每个技能可以进行：

### 熟练度

0～5

### 信心

1～5

### 稳定性

1～5

### 疲劳程度

1～5

最终形成：

```text
技能状态：

训练时间：90分钟
熟练度：3/5
信心：4/5
稳定性：3/5
```

---

# 20. 训练历史

显示：

```text
总训练时间
训练次数
平均每次训练时间
各泳姿训练时间
每月训练时间
技能进步
```

支持：

* 日
* 周
* 月
* 全部

---

# 21. 数据模型

建议核心实体：

```text
Stroke
Skill
Exercise
TrainingSession
SkillProgress
UserSettings
```

说明：

> 自评数据（熟练度/信心/稳定性/疲劳）不单独建 Assessment 表，通过 SkillProgress 的当前值，加上 TrainingSession 每次训练自带的自评字段序列，来呈现历史趋势，避免数据冗余和两处真相来源。

> 前置技能关系使用 Skill.prerequisites 内嵌数组表达，不单独建 SkillPrerequisite 表。通用基础技能跨泳姿共享（见第 32 节）不需要额外的多对多关系表——common.* 技能本身就是普通的 Skill 记录，只是被多条泳姿路线的 prerequisites 数组同时引用。

UserSettings（示例字段，具体可按需增减）：

```ts
type UserSettings = {
  preferredUnit: "metric"

  defaultSessionMinutes?: number

  hasSeenSafetyNotice: boolean
}
```

---

# 22. Skill 数据结构

```ts
type Skill = {
  id: string

  strokeId?: string  // 通用基础技能（common.*）没有所属泳姿，此字段为空

  routeId?: string

  stageId: string

  title: string

  description: string

  prerequisites: string[]

  minimumMinutes?: number

  recommendedMinutes?: number

  typicalSessions?: string

  objectives: string[]

  techniquePoints: string[]

  commonMistakes: string[]

  exercises: string[]

  passCriteria: string[]

  safetyNotes?: string[]

  sources?: Source[]

  order: number
}
```

课程版本：

课程数据整体标注一个 curriculumVersion（例如 "1.0.0"），随课程数据一起打包分发，不需要出现在每条 Skill 记录里。SkillProgress 只通过 skillId 关联技能；如果导入数据引用的 skillId 在当前课程版本中已不存在，处理方式见第 26 节数据导入。

---

# 23. SkillProgress

```ts
type SkillProgress = {
  skillId: string

  status:
    | "locked"
    | "available"
    | "learning"
    | "completed"

  totalMinutes: number

  proficiency: 0 | 1 | 2 | 3 | 4 | 5

  confidence: 1 | 2 | 3 | 4 | 5

  stability: 1 | 2 | 3 | 4 | 5

  lastPracticedAt?: string

  completedAt?: string

  notes?: string

  manualOverride?: boolean
}
```

---

# 24. TrainingSession

```ts
type TrainingSession = {
  id: string

  date: string

  durationMinutes: number

  strokeId: string

  skillId: string

  notes?: string

  proficiency?: number

  confidence?: number

  stability?: number

  fatigue?: number
}
```

MVP 只支持一次训练关联一个技能（对应 P4 的产品决定）。一次训练涉及多个技能、按技能分摊训练时长的场景，见第 31 节"未来版本候选功能"。

---

# 25. 数据导出

必须支持：

```text
设置
↓
导出我的数据
↓
swim-path-backup-YYYY-MM-DD.json
```

导出的 JSON 必须包含：

* 用户设置
* 技能进度
* 训练记录
* 自评
* 用户备注

但不需要导出课程静态数据。

---

# 26. 数据导入

导入时：

1. 验证 JSON schema
2. 显示数据摘要
3. 用户确认
4. 写入 IndexedDB
5. 显示导入成功

必须防止错误 JSON 导致整个数据库损坏。

如果导入数据中某条记录的 skillId 在当前课程版本中已不存在（例如课程结构调整后），不应报错或直接丢弃该条记录，而是保留数据，并在导入摘要中提示用户"部分记录关联的技能已在新版本课程中调整，相关数据已保留但暂不关联具体技能"。

---

# 27. MVP 功能范围

第一版只做：

* 四种泳姿
* 自由泳 TI 路线
* 技能树
* 技能详情
* 技能解锁
* 训练计时
* 训练记录
* 自评
* 熟练度
* 首页进度
* 训练历史
* JSON 导出
* JSON 导入
* PWA
* 离线使用

第一版暂时不做：

* AI 视频分析
* 云同步
* 登录
* 社交
* 排行榜
* 教练系统
* 在线社区
* 复杂动画
* 游泳姿势自动识别
* 心率设备连接
* Apple Health / Google Health

---

# 28. 开发顺序

详细的分阶段开发流程以 CLAUDE.md 中的 "Development Workflow"（15 个步骤）为准，本节不重复维护一份独立的阶段列表，避免两份文档顺序不一致。

高层里程碑对照：

* 项目初始化 + 架构 + 数据模型 → 对应 CLAUDE.md 步骤 1-3
* 课程种子数据 → 对应 CLAUDE.md 步骤 4
* 首页 / 技能树 / 技能详情 → 对应 CLAUDE.md 步骤 5-7
* 训练计时 / 训练记录 / 进度解锁 → 对应 CLAUDE.md 步骤 8-10
* 统计 / 导入导出 → 对应 CLAUDE.md 步骤 11-12
* PWA / 离线 / 测试 / UI 打磨 → 对应 CLAUDE.md 步骤 13-15

---

# 29. 开发原则

任何时候都不要为了快速实现而：

* 把课程数据硬编码到 React Component
* 把训练记录存 localStorage
* 把业务逻辑散落在页面
* 重复实现数据库逻辑
* 为简单功能引入大型依赖
* 在没有需求的情况下增加后端
* 自动把用户标记为“已掌握”

课程内容必须与用户数据分离。

业务逻辑必须与 UI 分离。

数据库访问必须与业务逻辑分离。

---

# 30. 安全提示 UI

App 展示的安全原则来自 swimming coach.md 第 17 节。除了在 Skill.safetyNotes 中按技能补充说明外，还必须在以下两处统一展示，不能只依赖逐技能填写：

## 30.1 首次使用引导

用户第一次打开 App 时，展示一次性安全须知（不可跳过，需要用户确认后才能继续），内容至少包括：

```text
本应用是训练辅助工具，不是救生或游泳安全认证工具。
完成技能不代表已具备水上自救能力。
请根据自身实际游泳能力选择安全环境。
感到头晕、胸闷、明显疼痛或异常不适时立即停止训练。
```

确认后写入 UserSettings.hasSeenSafetyNotice，不再重复弹出；用户可以在设置中随时回看。

## 30.2 高强度技能页面

蝶泳相关技能，以及涉及水下呼吸/闭气练习的技能详情页，必须在页面顶部展示不可关闭的安全提示条：优先使用该技能的 safetyNotes，如果为空则展示通用安全提示。

---

# 31. 未来版本候选功能

以下功能明确不在第一版范围内，记录于此是为了避免被误认为遗漏，具体是否/何时实现留待后续迭代评估：

* 单次训练关联多个技能，并按技能分摊训练时长（当前 TrainingSession 只关联一个 skillId，见第 24 节）
* 课程内容来源与证据等级字段（source / sourceType / evidenceLevel / coachNotes），用于未来引入更专业的教练资料（Skill.sources 字段已预留，Source 类型暂不定义）
* 训练计时的中断恢复：App 进程被系统完全杀死后，重新打开时检测并恢复未保存的进行中训练（当前只保证计时在锁屏/后台时依然准确，不保证进程被杀死后可恢复）

---

# 32. 通用基础技能（跨泳姿共享）

以下技能不属于任何单一泳姿，四条泳姿路线共享同一份 SkillProgress：用户只需要评估一次，不需要在学习第二种泳姿时重新练习和自评（对应 P2 的产品决定）。

| 技能 ID | 技能名称 | 对应教学内容 |
|---|---|---|
| common.water.adaptation | 水中适应 | swimming coach.md COMMON-01 |
| common.water.exhale | 水中呼气 | swimming coach.md COMMON-02 |
| common.water.back_float | 仰漂 | swimming coach.md COMMON-03 |
| common.water.front_float | 俯漂 | swimming coach.md COMMON-04 |
| common.water.streamline | 流线型 / 蹬壁滑行 | swimming coach.md COMMON-05 |

这些技能的 `strokeId` 为空，`stageId` 统一记为 `common`。各泳姿路线第一个正式技能把它们列为前置技能：

* 自由泳 Stage 1：common.water.adaptation, common.water.exhale, common.water.front_float, common.water.streamline
* 蛙泳 Stage 1：common.water.adaptation, common.water.exhale, common.water.front_float, common.water.streamline
* 仰泳 Stage 1：common.water.adaptation, common.water.back_float, common.water.streamline
* 蝶泳 Stage 1：common.water.adaptation, common.water.exhale, common.water.front_float, common.water.streamline

仰泳不需要 common.water.exhale 作为前置——仰泳面部始终露出水面，不依赖水下持续呼气这个技能，这也是 swimming coach.md 里仰泳路线本身没有把水下呼气作为重点的原因。

前置技能关系继续用 Skill.prerequisites 内嵌数组表达（见第 22 节），不需要为此单独建 SkillPrerequisite 表：common.* 技能本质上就是普通的 Skill 记录，只是被多条路线的 prerequisites 数组同时引用。

---

# 33. 产品成功标准

第一版不是：

> “看起来像一个漂亮的 App。”

而是：

> 用户去泳池时，可以打开 App，知道今天练什么；训练结束后可以记录；几周后可以清楚看到自己学到了什么。

这是 SwimPath 的核心价值。
