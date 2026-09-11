/**
 * English translations of every TeachingModule's text fields, keyed by
 * module id exactly as defined in src/data/curriculum/teachingModules.ts.
 * minimumMinutes/recommendedMinutes are language-independent numbers and
 * are NOT duplicated here. Used by the localize() helpers (src/i18n) when
 * the UI language is "en" — the Chinese fields remain the source of truth.
 */
export interface ModuleTranslationEN {
  name: string
  objective?: string
  techniquePoints: string[]
  commonMistakes: string[]
  exercises: string[]
  passCriteria: string[]
}

export const MODULE_TRANSLATIONS_EN: Record<string, ModuleTranslationEN> = {
  "COMMON-01": {
    name: "Water Adaptation",
    objective: "Build basic confidence and body control in the water.",
    techniquePoints: [
      "Enter the water without excessive tension",
      "Submerge your face in the water",
      "Tolerate water near your ears and nose",
      "Stay calm in shallow water",
    ],
    commonMistakes: [
      "Fear of getting the face wet",
      "Afraid to put the head underwater",
      "Excessive body tension",
      "Shoulders staying raised/hunched",
    ],
    exercises: [
      "Enter the water holding the pool edge",
      "Face submersion",
      "Opening eyes underwater",
      "Slow exhalation practice",
    ],
    passCriteria: ["Can naturally submerge the face in water while staying relaxed."],
  },
  "COMMON-02": {
    name: "Underwater Exhalation",
    objective: "Establish the basic breathing pattern of exhaling underwater and inhaling above water.",
    techniquePoints: [
      "Exhale continuously and slowly underwater",
      "Don't hold your breath until the last moment and then exhale forcefully",
      "Exhale mainly through the mouth and nose",
      "Inhale quickly once your face clears the water",
    ],
    commonMistakes: ["Holding the breath underwater", "Gasping violently after surfacing", "Irregular breathing rhythm"],
    exercises: ["Blowing bubbles at the pool edge", "Slow underwater exhalation practice", "Standing breathing drill"],
    passCriteria: ["Can complete 10 or more natural underwater exhalations in a row."],
  },
  "COMMON-03": {
    name: "Back Float",
    objective: "Understand the body's buoyancy and balance in the water.",
    techniquePoints: [
      "Relax the neck",
      "Open the chest",
      "Keep the hips as close to the surface as possible",
      "Don't kick hard just to stay afloat",
    ],
    commonMistakes: [
      "Lifting the head too high",
      "Hips sinking",
      "Excessive tension in the lower back",
      "Kicking frantically out of fear of sinking",
    ],
    exercises: ["Back floating at the pool edge", "Coach-assisted back float", "Independent back float"],
    passCriteria: ["Can hold a stable, independent back float in a safe environment."],
  },
  "COMMON-04": {
    name: "Front Float",
    objective: "Understand the body's buoyancy and balance in a prone position.",
    techniquePoints: [
      "Stretch the body out as long as possible",
      "Keep the head in a natural position",
      "Don't lift the head",
      "Relax the body",
    ],
    commonMistakes: ["Lifting the head", "Bending the knees", "Bending at the waist", "Body stiffness caused by tension"],
    exercises: [],
    passCriteria: [
      "Can float relaxed in a prone position, with the head not lifted and the body kept extended.",
    ],
  },
  "COMMON-05": {
    name: "Wall Push-off and Glide",
    objective: "Establish the streamlined body position needed for every stroke.",
    techniquePoints: [
      "Arms fully extended",
      "Arms squeezed against the ears",
      "Body kept in one straight line",
      "Hold the streamline after pushing off the wall",
      "Don't start kicking wildly right away",
    ],
    commonMistakes: ["Arms separating", "Lifting the head", "Body bending", "Weak push-off from the wall"],
    exercises: [],
    passCriteria: [
      "Can consistently perform repeated wall push-off glides while holding a streamlined body position.",
    ],
  },
  "FREE-01": {
    name: "Freestyle Body Balance",
    objective: "Keep the body as horizontal as possible and minimize the lower body sinking.",
    techniquePoints: [
      "Natural head position",
      "Eyes looking down",
      "Chest allowed to sink naturally",
      "Hips close to the surface",
      "Body relaxed",
    ],
    commonMistakes: ["Lifting the head", "Lower back sinking", "Kicking too hard", "Tense shoulders"],
    exercises: ["Front float", "Streamline glide", "Kickboard float", "Streamline kick"],
    passCriteria: [
      "During a prone glide, the hips and legs don't noticeably sink, and a horizontal position can be held for several seconds.",
    ],
  },
  "FREE-02": {
    name: "Freestyle Kick",
    objective: "Establish a stable, small-amplitude, continuous freestyle kick.",
    techniquePoints: [
      "Movement originates from the hips",
      "Knees stay relatively relaxed",
      "Ankles relaxed",
      "Point the toes / extend the instep",
      "Don't kick with too large an amplitude",
    ],
    commonMistakes: [
      "Actively bending and extending the knees",
      "Kicking with too large an amplitude",
      "Stiff ankles",
      "Kicking too hard, causing rapid fatigue",
    ],
    exercises: ["Kickboard kicking", "Streamline kicking", "Side-lying kick"],
    passCriteria: [
      "Can kick continuously with a kickboard for 30+ seconds without over-bending the knees, with a consistent kick amplitude.",
    ],
  },
  "FREE-03": {
    name: "Freestyle Body Rotation",
    objective: "Establish natural rotation of the body around its long axis.",
    techniquePoints: [
      "Shoulders and hips rotate together",
      "Don't rotate only the head",
      "Keep the body's long axis stable",
      "Rotation should serve the breathing and the stroke",
    ],
    commonMistakes: ["Rotating only the head", "No body rotation at all", "Over-rotating", "Body swaying side to side"],
    exercises: [
      "Side float",
      "On-land rotation drill",
      "Single-arm stroke combined with rotation",
      "Kickboard side glide",
    ],
    passCriteria: [
      "Can rotate 5+ times in a row with shoulders and hips rotating in sync, without the body swaying side to side.",
    ],
  },
  "FREE-04": {
    name: "Freestyle Side Breathing",
    objective: "Be able to breathe to the side without disrupting body balance.",
    techniquePoints: [
      "Rotate the body first, then let the head follow naturally",
      "Just enough for the mouth to clear the water",
      "No need to lift the whole head out of the water",
      "Exhale underwater ahead of time",
      "Inhale quickly once clear of the water",
    ],
    commonMistakes: [
      "Lifting the head to breathe",
      "Body sinking while breathing",
      "Not exhaling underwater",
      "Legs stopping while breathing",
    ],
    exercises: [
      "Side breathing at the pool edge",
      "Single-arm freestyle",
      "Side-lying kick",
      "Breathing once every 3 strokes drill",
    ],
    passCriteria: [
      "Can complete 10 consecutive side breaths on at least one side without the body noticeably sinking, and without breathing disrupting the kick rhythm.",
    ],
  },
  "FREE-05": {
    name: "Freestyle Arm Basics",
    objective: "Understand the basic freestyle arm stroke path.",
    techniquePoints: [
      "Consistent hand entry position",
      "Arm extends forward",
      "During the catch, use the forearm and hand to \"hold\" the water throughout, rather than pressing straight down",
      "The forearm gradually builds pressure against the water",
      "Exit the water naturally after finishing the push",
      "Avoid relying entirely on the palm \"slapping\" the water",
    ],
    commonMistakes: ["Entry crosses the body's centerline", "Arm crossing over too much", "Hand wobbling around", "Stopping the push phase too early"],
    exercises: [
      "Single-arm freestyle",
      "Catch-specific drill (feeling forearm pressure on the water in place or with a kickboard)",
      "High-elbow stroke",
    ],
    passCriteria: [
      "Can complete 10 full stroke cycles in a row with a fairly consistent entry position, finishing the push phase fully without giving up early.",
    ],
  },
  "FREE-06": {
    name: "Freestyle Arm-Leg Coordination",
    objective: "Combine kicking, body rotation, arms, and breathing together.",
    techniquePoints: ["Body stays balanced", "Arms alternate", "Body rotates naturally", "Breathing doesn't disrupt the rhythm"],
    commonMistakes: [
      "Legs stopping as soon as you breathe",
      "Arms and legs out of rhythm",
      "Body swaying side to side",
      "Sacrificing technique for speed",
    ],
    exercises: ["3-beat or 6-beat coordination drill", "One-sided breathing combined with arm-leg coordination", "Slow, full-stroke freestyle"],
    passCriteria: [
      "Can perform 6+ consecutive cycles of coordinated arms, legs, and breathing without the rhythm being disrupted by breathing.",
    ],
  },
  "FREE-07": {
    name: "Continuous Freestyle",
    objective: "Be able to swim freestyle continuously, progressing distance in stages: 25m → 50m → 100m → 200m.",
    techniquePoints: [],
    commonMistakes: [],
    exercises: ["Progress distance in stages: 25m → 50m → 100m → 200m"],
    passCriteria: ["Can complete the target distance continuously without excessive gasping for air."],
  },
  "FREE-08": {
    name: "Freestyle Efficiency",
    objective: "Reduce wasted movement and increase the distance gained per stroke.",
    techniquePoints: ["Streamline", "Body balance", "Stable rotation", "Efficient stroke technique", "Efficient breathing", "Relaxed recovery"],
    commonMistakes: [],
    exercises: [
      "Counting strokes (record stroke count per 25m)",
      "Slow, high-quality freestyle",
      "Periodic video review / self-observation (if possible)",
    ],
    passCriteria: [
      "Over the same distance, stroke count is lower than at the start of learning, and perceived effort/fatigue is reduced.",
    ],
  },
  "TI-01": {
    name: "Superman Glide",
    objective:
      "Feel the overall balance and \"weightless\" floating sensation of the body face-down at the surface — the starting move of the entire TI progression.",
    techniquePoints: [
      "Arms extended forward, squeezing the ears",
      "Head hanging naturally, eyes looking at the pool floor",
      "Chest relaxed and allowed to sink slightly",
      "Whole body as relaxed as possible, without deliberately tensing to hold the position",
    ],
    commonMistakes: [
      "Body stiff, unable to relax",
      "Lifting the head to look forward, causing the lower body to sink",
      "Over-tightening the core, which actually disrupts balance",
    ],
    exercises: ["Prone float in place", "Push off the wall and glide while holding the Superman Glide position"],
    passCriteria: [
      "Can hold a horizontal float for several seconds while moving slowly or staying still, with no noticeable rising or sinking of the body.",
    ],
  },
  "TI-02": {
    name: "Superman Kick",
    objective:
      "Add a gentle kick on top of the Superman Glide to check whether the legs stay relaxed and whether kicking disrupts the balance already established.",
    techniquePoints: [
      "Small kick amplitude, relaxed tempo",
      "Kick power comes from the hips, not the knees",
      "Body position stays unchanged while kicking",
    ],
    commonMistakes: [
      "Kicking too big, causing the body to sway side to side",
      "Over-bending the knees instead of driving from the hips",
      "Tense kicking rhythm, straining and holding the breath",
    ],
    exercises: ["Superman Glide with a gentle flutter kick added", "Superman Kick with a kickboard"],
    passCriteria: [
      "Can keep the horizontal balance established in the Superman Glide stage even after adding the kick, with no noticeable rising or sinking of the body.",
    ],
  },
  "TI-03": {
    name: "Skate Position",
    objective:
      "Establish the balance of a side-lying float, which serves as the return position shared by every arm-switch movement that follows.",
    techniquePoints: [
      "Body rotated onto its side",
      "One arm extended forward, the other resting against the body",
      "Head, hand, shoulder, and hip aligned in one straight line",
      "Not relying on kicking to hold the side position",
    ],
    commonMistakes: [
      "Relying on kicking rather than body position to hold the side",
      "Not rotating far enough to the side, staying close to prone",
      "Over-rotating to the side, ending up close to supine",
    ],
    exercises: ["Push off the wall and glide while holding the Skate Position", "Single-sided Skate Position drill with a kickboard"],
    passCriteria: [
      "Can extend one arm forward with the body rotated to the side and hold a stable glide for several seconds without needing to kick to maintain it.",
    ],
  },
  "TI-04": {
    name: "SpearSkate",
    objective:
      "Building on the Skate Position, practice a partial spearing motion with the lead arm while keeping the side position from breaking down.",
    techniquePoints: [
      "The lead arm slowly submerges along the line of the body's extension",
      "The side position stays stable throughout the spearing motion",
      "Start with a small spear depth and gradually increase it",
    ],
    commonMistakes: [
      "Body rotates back to prone during the spear",
      "Spearing too steeply, pointing toward the pool floor",
      "Spearing too fast, causing loss of balance",
    ],
    exercises: ["Skate Position combined with a slow lead-arm submersion", "Broken-down practice: hold the side position first, then add the spear"],
    passCriteria: ["After the lead arm completes the spear, the body still holds a stable side position."],
  },
  "TI-05": {
    name: "SpearSwitch",
    objective: "Practice switching from the Skate Position on one side to the other, building precise alignment at the moment of the switch.",
    techniquePoints: [
      "Start with a pause: hold the new side position after switching to confirm it",
      "Gradually shorten the pause",
      "The switch is driven by body rotation, not by whipping the arm",
    ],
    commonMistakes: [
      "Switching too fast to confirm whether the new side is stable",
      "Rotating only the arm, not the body",
      "The new side position is misaligned after the switch",
    ],
    exercises: ["A single switch with an extended pause", "Repeated switches with the pause gradually shortened"],
    passCriteria: [
      "Can perform multiple switches in a row, floating stably in the new Skate Position after each one.",
    ],
  },
  "TI-06": {
    name: "Draw a Line (Zipper)",
    objective:
      "Build lateral stability by keeping the arm moving near the body's centerline, reducing side-to-side wobble during the stroke.",
    techniquePoints: [
      "Imagine a track line on each side of the body, about shoulder-width apart",
      "The arm always moves along this line",
      "The core stays stable and doesn't twist with the arm movement",
    ],
    commonMistakes: [
      "Stroke path too wide, outside the shoulder-width track",
      "Body swaying side to side with the arm movement",
      "Movement becomes stiff from trying too hard to stay within the line",
    ],
    exercises: ["Skate Position combined with the \"draw a line\" visualization", "Adding the line-drawing requirement to switch practice"],
    passCriteria: [
      "During continuous switching and stroking, the arm path stays consistently within shoulder width, with no noticeable side-to-side wobble.",
    ],
  },
  "TI-07": {
    name: "SwingSkate",
    objective:
      "Building on the Skate Position, add a partial out-of-water arm recovery, practicing recovery without disrupting the balance of the side position.",
    techniquePoints: [
      "The recovering arm stays relaxed, moving close to the surface",
      "The side position is held throughout the recovery",
      "Start with a small recovery motion and gradually increase it",
    ],
    commonMistakes: [
      "Lifting the recovering arm too high, disrupting body balance",
      "Body rotating back to prone during the recovery",
      "Recovering too fast, with stiff movement",
    ],
    exercises: ["Skate Position combined with a small out-of-water arm recovery", "Gradually increasing the recovery motion up to a full recovery"],
    passCriteria: ["After completing one out-of-water arm recovery, the body still holds a stable Skate Position."],
  },
  "TI-08": {
    name: "SwingSwitch",
    objective: "Combine the out-of-water arm recovery with the side switch — the final drill before moving on to the full stroke.",
    techniquePoints: [
      "The recovery and the switch happen together",
      "Start with a pause to confirm the position after each switch",
      "Gradually remove the pause, transitioning to a continuous movement",
    ],
    commonMistakes: [
      "Recovery and switch out of sync",
      "Movement becomes rushed and uncontrolled once the pause is removed",
      "Starting the next stroke before the new side position has stabilized",
    ],
    exercises: ["SwingSwitch drill with a pause", "Gradually reducing the number of pauses, transitioning to continuous SwingSwitch"],
    passCriteria: [
      "Can perform multiple SwingSwitch cycles in a row with natural transitions between them, without noticeable pausing or fumbling.",
    ],
  },
  "TI-09": {
    name: "Rag Doll",
    objective: "Let the recovering arm go completely limp, reducing unnecessary tension in the shoulder.",
    techniquePoints: [
      "The recovering arm swings naturally like a rag doll, without actively driving it",
      "The core and body position stay stable, unaffected by the recovery",
      "Shoulder relaxed, avoiding shrugging",
    ],
    commonMistakes: [
      "The recovering arm stays tense and driven throughout",
      "Losing control of the arm and becoming sloppy in the pursuit of \"relaxation\"",
      "Shrugging the shoulder instead of a relaxed recovery",
    ],
    exercises: ["Rag Doll recovery combined with the Skate Position", "Comparison drill: tense recovery vs. relaxed recovery, to feel the difference in fatigue"],
    passCriteria: [
      "After multiple consecutive recoveries, the shoulder shows no noticeable soreness or tension, and the movement stays controlled.",
    ],
  },
  "TI-10": {
    name: "Mail Slot",
    objective: "Establish a precise, low-disturbance hand entry that reduces splash and bubbles.",
    techniquePoints: [
      "Fingers enter first, as if slipping into a narrow slot",
      "Entry point sits along the forward extension line, not too wide or too narrow",
      "After entry, extend forward with the momentum rather than pressing down immediately",
    ],
    commonMistakes: [
      "The palm slaps the surface on entry, producing a lot of splash",
      "Entry point too wide, outside the centerline track",
      "Pressing down immediately after entry, without extending first",
    ],
    exercises: ["In-place drill for hand entry angle and position", "Practicing the entry motion together with SpearSwitch"],
    passCriteria: ["Repeated entries stay low-splash and land at a precise point, with no noticeable slapping sound."],
  },
  "TI-11": {
    name: "Marionette Arm",
    objective: "Break down the arm's stroke path to build awareness of the sequence in which each joint moves.",
    techniquePoints: [
      "Break the arm motion into a sequence led by the shoulder, then the elbow, then the wrist",
      "Slow the tempo down and feel each segment individually",
      "Avoid stiffening all parts of the arm at once",
    ],
    commonMistakes: [
      "Moving the whole arm stiffly as one unit, with no sequencing",
      "Just swinging the arm forcefully, ignoring the movement sequence",
      "Practicing too fast to feel each stage",
    ],
    exercises: ["Slow on-land breakdown of the arm motion", "Slow arm-motion practice in water, holding the edge or standing in place"],
    passCriteria: [
      "Can clearly perform the shoulder-elbow-wrist sequenced arm motion at slow speed, without noticeable hitching or stiffness.",
    ],
  },
  "TI-12": {
    name: "High Elbow Catch",
    objective: "Practice the high-elbow position during the catch, giving the stroke a more effective angle for propulsion.",
    techniquePoints: [
      "After entry, the hand and forearm first form a downward-and-backward catching surface",
      "Keep the elbow higher than the hand, not dropping it too early",
      "Make the catch smooth rather than chasing speed",
    ],
    commonMistakes: [
      "Pressing the whole arm down with the elbow dropping too, commonly called \"dropped elbow\"",
      "Applying force in the catch too early, making the motion stiff",
      "Catching surface too small, generating almost no propulsion",
    ],
    exercises: ["On-land drill for elbow-position awareness", "Slow catch practice in the water, with mirror or partner feedback"],
    passCriteria: ["Can maintain the elbow higher than the hand throughout the catch, with no noticeable dropped elbow."],
  },
  "TI-13": {
    name: "Sweet Spot",
    objective:
      "Find a head and body position that allows smooth breathing without disrupting body balance — the core drill of TI breathing technique.",
    techniquePoints: [
      "When turning to breathe, let the body's rotation carry the head, rather than lifting the head on its own",
      "Find the minimum head turn that just clears the mouth and nose for a breath",
      "Return the head to neutral quickly after breathing, without lingering too long",
    ],
    commonMistakes: [
      "Lifting the head alone to breathe, breaking the body's streamline",
      "Turning the head too far, exposing the whole head",
      "Returning to neutral too slowly after breathing, disrupting the rhythm of the next stroke",
    ],
    exercises: ["Skate Position combined with breathing practice", "Side-breathing drill with a kickboard to find your personal \"sweet spot\" angle"],
    passCriteria: [
      "Can find a consistent breathing head position where body balance and streamline aren't noticeably disrupted during repeated breaths.",
    ],
  },
  "TI-14": {
    name: "Weightless Head",
    objective: "Let body rotation naturally lift the legs, rather than deliberately kicking the legs up or pressing the head down.",
    techniquePoints: [
      "Head stays neutral and relaxed, neither actively lifted nor pressed down",
      "Body rotation drives the overall change in position",
      "The legs rising is a natural result of rotation and balance, not an active kicking-up motion",
    ],
    commonMistakes: [
      "Deliberately pressing the head down while breathing, causing the lower body to sink",
      "Deliberately kicking the legs up instead of relying on rotation",
      "Head position changing too much before and after breathing",
    ],
    exercises: ["Drill focused on keeping the head neutral while breathing", "Slow freestyle with the cue \"head still, body rotates\""],
    passCriteria: [
      "The head stays essentially neutral during breathing, and the lower body doesn't noticeably sink because of it.",
    ],
  },
  "TI-15": {
    name: "Two-Beat Kick",
    objective: "Establish an energy-efficient kick rhythm with one kick per arm stroke.",
    techniquePoints: [
      "Each arm stroke on one side is paired with one light kick from the opposite leg",
      "Kick amplitude is small, serving mainly for balance and rhythm rather than propulsion",
      "Kick and stroke rhythms stay in sync rather than working independently",
    ],
    commonMistakes: [
      "Kick rhythm out of sync with the stroke rhythm",
      "Kick amplitude too large, turning into continuous multi-beat kicking",
      "Relying too much on the kick for propulsion, neglecting body rotation and extension",
    ],
    exercises: ["Feeling the stroke-to-kick timing in place", "Slow freestyle, focusing on counting the ratio of kicks to strokes"],
    passCriteria: [
      "Can maintain a rhythm of one light kick per arm stroke during slow freestyle, without the legs feeling especially strained.",
    ],
  },
  "TI-16": {
    name: "Whole Stroke Integration",
    objective:
      "Merge all of the above drills, at an extremely slow and controlled pace, into a complete freestyle stroke — the capstone and pass standard of the TI progression.",
    techniquePoints: [
      "Gradually reduce the number of strokes needed to cover the same distance (strokes per length)",
      "Efficiency gains should come from better balance, rotation, and extension — not from simply pulling harder or faster",
      "Maintain the body line and rhythm established in the earlier stages",
    ],
    commonMistakes: [
      "Focusing on a single technique point while ignoring overall coordination",
      "Sacrificing balance and rotation quality for the sake of speed",
      "Reverting to old stroke habits when combining the drills, even after mastering them separately",
    ],
    exercises: [],
    passCriteria: [
      "Can swim freestyle continuously with low tension, while maintaining body balance, stable rotation, low movement noise, efficient breathing, and fluid motion — with stroke count reduced compared to the start of learning.",
    ],
  },
  "BREAST-01": {
    name: "Breaststroke Body Position",
    techniquePoints: ["Body horizontal", "Maintain a streamline during the glide phase", "Reduce up-and-down bobbing"],
    commonMistakes: ["Too much up-and-down bobbing", "Not holding a streamline during the glide phase"],
    exercises: ["Wall push-off glide", "On-land breaststroke body position drill"],
    passCriteria: ["Can hold a horizontal, streamlined body during the glide phase, with noticeably reduced bobbing."],
  },
  "BREAST-02": {
    name: "Breaststroke Kick",
    techniquePoints: ["Recovery (drawing the heels up)", "Turning the feet outward", "Kick and squeeze (whip and press together)", "Bringing the legs together", "Glide"],
    commonMistakes: ["Feet not turned outward", "Just stomping downward instead of whipping", "No glide after the kick", "Legs not moving in sync"],
    exercises: ["Breaststroke kick with a kickboard", "On-land drill for the recovery and foot turn-out", "Broken-down kick-squeeze-glide drill"],
    passCriteria: [
      "Can complete 10 breaststroke kicks in a row with the feet turning out fully and a clear glide after each kick-and-squeeze.",
    ],
  },
  "BREAST-03": {
    name: "Breaststroke Arms",
    techniquePoints: ["Outsweep", "Catch", "Insweep", "Forward extension"],
    commonMistakes: ["Pulling the arms too wide", "Movement too big overall", "Not extending forward quickly after bringing the hands in"],
    exercises: ["Standing or edge-supported arm-pull drill", "Breaststroke arms with a pull buoy between the legs"],
    passCriteria: [
      "Can complete 10 breaststroke arm cycles in a row, extending forward quickly after the insweep, with a controlled range of motion.",
    ],
  },
  "BREAST-04": {
    name: "Breaststroke Breathing",
    techniquePoints: [
      "During the outsweep and insweep, let the body's natural rise lift the head to inhale",
      "Keep the inhale short — no need to lift the whole head clear of the water",
      "As the arms extend forward, lower the head and start exhaling underwater",
      "Exhale continuously and slowly underwater, not holding it until the last moment",
      "Avoid lifting the whole body or the shoulders out of the water",
    ],
    commonMistakes: [
      "Lifting the head too early or too far during the arm pull",
      "Not lowering the head during the forward extension, causing a pause after breathing",
      "Inhaling for too long, disrupting the arm-pull rhythm",
      "Holding the breath underwater, then gasping after surfacing",
      "Inconsistent breathing rhythm",
    ],
    exercises: [
      "Standing drill simulating the arm pull with breathing",
      "Broken-down drill: arm pull + head-lift inhale",
      "Broken-down drill: forward extension + head-down exhale",
      "Breaststroke arms with breathing (no kick)",
    ],
    passCriteria: [
      "Breathing happens naturally in time with the arm pull; can complete 10 cycles in a row without noticeable breath-holding or gasping.",
    ],
  },
  "BREAST-05": {
    name: "Full Breaststroke Coordination",
    objective: "Integrate the arm pull, breathing, leg recovery, kick-and-squeeze, forward extension, and glide into one complete rhythm.",
    techniquePoints: [
      "Core rhythm: pull → breathe → recover the legs → kick-and-squeeze → extend forward → glide",
      "The glide isn't \"stopping\" — it's actively using the body's streamline to reduce drag",
    ],
    commonMistakes: [],
    exercises: [
      "Combine the broken-down drills step by step: practice \"pull → breathe\" first, then add \"recover → kick-and-squeeze → extend → glide\"",
      "Slow breaststroke emphasizing glide duration",
    ],
    passCriteria: ["Can complete 5+ full stroke cycles in a row following the core rhythm, without skipping the glide phase."],
  },
  "BREAST-06": {
    name: "Continuous Breaststroke",
    objective: "Be able to swim breaststroke continuously to a target distance, progressing in stages: 25m → 50m → 100m → 200m.",
    techniquePoints: ["Keep the technique consistent rather than simply chasing speed."],
    commonMistakes: [],
    exercises: [
      "Swim in segments (rest after 25m, gradually increasing the distance)",
      "Count stroke cycles and try to cover the same distance in fewer cycles",
    ],
    passCriteria: [
      "Can complete the target distance continuously without excessive gasping or noticeable breakdown in technique.",
    ],
  },
  "BREAST-07": {
    name: "Breaststroke Efficiency",
    techniquePoints: ["Reduce drag", "Extend the glide", "Reduce oversized movements", "Improve propulsion efficiency per cycle"],
    commonMistakes: ["Arm pull or kick too big, breaking the streamline", "Not enough glide time, transitioning between phases too quickly"],
    exercises: ["Count stroke cycles and try to reduce the number", "Slow breaststroke emphasizing the glide phase"],
    passCriteria: [
      "Over the same distance, stroke-cycle count is lower than at the start of learning, with no noticeable breakdown in technique.",
    ],
  },
  "BACK-01": {
    name: "Backstroke Body Balance",
    techniquePoints: ["Ears close to the surface", "Eyes looking up", "Hips close to the surface", "Keep the body extended"],
    commonMistakes: ["Hips sinking", "Head too high or too low", "Body bent instead of extended"],
    exercises: ["Back float at the pool edge", "Back float with a light kick", "Extending the duration of an independent back float"],
    passCriteria: [
      "Can independently hold a horizontal supine position for several seconds without the hips noticeably sinking.",
    ],
  },
  "BACK-02": {
    name: "Backstroke Kick",
    techniquePoints: ["Driven from the hips", "Small amplitude", "Ankles relaxed", "Toes naturally pointed"],
    commonMistakes: ["Knees breaking the surface", "Kick amplitude too large", "Stiff ankles"],
    exercises: ["Backstroke kick with a kickboard (or arms crossed on the chest)", "Streamline backstroke kick", "Side-lying backstroke kick"],
    passCriteria: [
      "Can kick continuously for 30+ seconds without the knees breaking the surface, with a consistent kick amplitude.",
    ],
  },
  "BACK-03": {
    name: "Backstroke Arms",
    techniquePoints: [
      "Arms alternate",
      "Consistent entry position",
      "Shoulders rotate naturally",
      "After entry, press the arm down to build pressure against the water (catch phase)",
      "After the first half of the pull, accelerate the push backward (push phase)",
      "Complete the full stroke with the arm",
    ],
    commonMistakes: [
      "Entry drifting toward the head's centerline",
      "Stroke path too shallow, failing to build effective pressure",
      "Not enough shoulder rotation, relying only on arm strength to pull",
    ],
    exercises: ["Single-arm backstroke", "On-land drill for entry angle", "Backstroke arms with a pull buoy between the legs"],
    passCriteria: [
      "Can complete 10 full strokes in a row with a fairly consistent entry position and an even alternating rhythm between the arms.",
    ],
  },
  "BACK-04": {
    name: "Backstroke Body Rotation",
    techniquePoints: ["Shoulders and hips coordinated", "Reduce pulling flat-backed with no rotation", "Body rotates around its long axis"],
    commonMistakes: ["Pulling with arm strength alone, with no body rotation", "Over-rotating, causing the swimmer to drift off course"],
    exercises: ["On-land drill for coordinated shoulder-hip rotation", "Slow backstroke with pronounced body rotation"],
    passCriteria: [
      "Can feel the shoulders and hips rotating naturally with the stroke throughout continuous swimming, while staying on course.",
    ],
  },
  "BACK-05": {
    name: "Backstroke Breathing Rhythm",
    techniquePoints: [
      "Backstroke allows continuous breathing — the point isn't to avoid breathing but to establish a steady rhythm (for example, inhaling on the left-arm stroke and exhaling on the right, though not everyone needs a fixed pattern)",
    ],
    commonMistakes: ["Holding the breath, afraid to breathe", "Breathing rhythm completely out of sync with the stroke"],
    exercises: ["Fixed-rhythm breathing backstroke (e.g., one breath per stroke)", "Free-breathing backstroke, with no fixed rhythm"],
    passCriteria: [
      "Can keep breathing throughout continuous backstroke without noticeable breath-holding or swallowing water.",
    ],
  },
  "BACK-06": {
    name: "Full Backstroke",
    objective: "Be able to swim backstroke continuously to a target distance, progressing in stages: 25m → 50m → 100m → 200m.",
    techniquePoints: ["Maintain direction, body position, and stroke rhythm."],
    commonMistakes: [],
    exercises: [
      "Swim in segments (rest after 25m, gradually increasing the distance)",
      "Straight-line backstroke drill for staying on course (using the lane line or a ceiling reference point)",
    ],
    passCriteria: [
      "Can complete the target distance continuously without drifting off the lane or noticeable breakdown in technique.",
    ],
  },
  "BACK-07": {
    name: "Backstroke Efficiency",
    techniquePoints: [
      "Reduce drag (keep the body horizontal and extended)",
      "Steady rhythm rather than chasing pulling power",
      "Reduce unnecessary head and body movement",
      "Increase the distance covered per stroke",
    ],
    commonMistakes: ["Speeding up stroke rate for speed, but technique breaks down", "Increased side-to-side body sway"],
    exercises: ["Count strokes and try to cover the same distance in fewer strokes", "Slow, high-quality full backstroke"],
    passCriteria: [
      "Over the same distance, stroke count is lower than at the start of learning, while direction and rhythm stay steady.",
    ],
  },
  "FLY-01": {
    name: "Dolphin Kick",
    objective: "Establish a continuous wave motion that starts from the torso and hips.",
    techniquePoints: [
      "Continuous body wave",
      "Hips involved",
      "Knees are not the only source of power",
      "Ankles relaxed",
      "Imagine the body moving continuously like a fish tail or mermaid fin (a finning motion)",
    ],
    commonMistakes: ["Bending only the knees", "Body stiff", "The wave breaks apart", "Overexerting"],
    exercises: ["Dolphin kick with a kickboard", "Streamline dolphin kick off the wall", "Side-lying dolphin kick (to feel the hips driving the motion)"],
    passCriteria: [
      "Can perform 10+ consecutive dolphin kicks with the wave traveling from the torso to the toes, without the knees being the only source of power.",
    ],
  },
  "FLY-02": {
    name: "Streamline Dolphin Kick",
    objective: "Combine the dolphin kick with a streamlined body position to reduce drag during the underwater phase.",
    techniquePoints: [
      "Arms extended forward, against the ears",
      "The wave travels from the core to the toes, rather than moving the legs alone",
      "Body stays in one line, without swaying side to side from the kick",
    ],
    commonMistakes: ["Streamline loose, arms separating", "The wave motion interrupts the body's extension"],
    exercises: ["Streamline dolphin kick off the wall", "Broken down: streamline glide first, then gradually add the dolphin kick"],
    passCriteria: [
      "Can perform continuous dolphin kicks in a streamlined position without the body noticeably breaking apart.",
    ],
  },
  "FLY-03": {
    name: "One-Arm Butterfly",
    objective: "Reduce the complexity of the full butterfly stroke.",
    techniquePoints: ["Maintain body rhythm", "One arm completes the stroke", "Combined with the dolphin kick", "Avoid breaking the body wave for the sake of the arm stroke"],
    commonMistakes: ["The body wave stops during the single-arm stroke", "The other arm's position is unstable, affecting balance"],
    exercises: ["One-arm butterfly with breathing", "One-arm butterfly (the other hand held still, extended forward)"],
    passCriteria: ["Can perform 5+ consecutive one-arm butterfly strokes with the body wave staying continuous."],
  },
  "FLY-04": {
    name: "Two-Arm Pull",
    objective: "Understand the two-arm butterfly pull; beginners are not expected to chase a large, powerful pull from the start.",
    techniquePoints: ["Entry", "Build pressure outward/downward", "Push backward", "Exit and recover"],
    commonMistakes: ["Entry too wide or too narrow", "Overexerting the arms on the exit, disrupting the rhythm", "Stroke path too deep or too shallow"],
    exercises: ["Standing or edge-supported simulation of the butterfly pull", "Butterfly arms with a pull buoy between the legs (no kick)"],
    passCriteria: ["Can perform 5+ consecutive two-arm butterfly pulls with a fairly consistent entry position."],
  },
  "FLY-05": {
    name: "Butterfly Breathing",
    objective: "Breathe without disrupting the body's rhythm.",
    techniquePoints: ["Keep the breathing motion as brief as possible", "Avoid lifting the head too much", "Exhale underwater ahead of time", "Keep the body wave continuous"],
    commonMistakes: [
      "Lifting the head too high or too early",
      "Body wave interrupted after breathing",
      "Not exhaling underwater beforehand, then gasping after surfacing",
    ],
    exercises: ["Butterfly kick with breathing (no arms)", "One-arm butterfly with breathing"],
    passCriteria: [
      "Can perform 5+ consecutive butterfly breaths without the body wave being noticeably interrupted by breathing.",
    ],
  },
  "FLY-06": {
    name: "Full Butterfly Coordination",
    objective:
      "Combine the dolphin kick, arms, body wave, and breathing into the core rhythm. Early on, focus on short distances with high quality — don't sacrifice technique just to complete a distance.",
    techniquePoints: ["Core rhythm: dolphin kick + arms + body wave + breathing"],
    commonMistakes: ["Sacrificing body wave quality just to rack up more stroke cycles", "Breathing out of sync with the stroke"],
    exercises: ["Short-distance (5-10m) full butterfly", "Break down then recombine: dolphin kick + arms, then add breathing"],
    passCriteria: [
      "Can complete 3-5 full butterfly stroke cycles in a row without the technique noticeably breaking down.",
    ],
  },
  "FLY-07": {
    name: "Short-Distance Full Butterfly",
    objective:
      "Progress distance in stages: 10m → 15m → 25m → 50m. Butterfly shouldn't simply copy freestyle's long-distance training logic — when technique noticeably breaks down, reduce the distance or return to broken-down drills.",
    techniquePoints: [],
    commonMistakes: [
      "Sacrificing body wave and breathing quality just to add distance",
      "Forcing through after technique breaks down instead of stopping to reset",
    ],
    exercises: ["Increase distance in the suggested stages", "Immediately return to broken-down drills or reduce distance when technique noticeably breaks down"],
    passCriteria: ["Can complete the current stage's target distance without a noticeable drop in technique quality."],
  },
  "FLY-08": {
    name: "Butterfly Efficiency",
    techniquePoints: ["Reduce wasted effort", "Maintain the body wave", "Improve breathing", "Maintain rhythm", "Improve propulsion efficiency without noticeably increasing fatigue"],
    commonMistakes: ["Increasing stroke rate for speed at the cost of body wave quality", "Ignoring rhythm, with technique getting sloppier over time"],
    exercises: ["Count stroke cycles and try to cover the same distance in fewer cycles", "Slow, high-quality short-distance butterfly"],
    passCriteria: [
      "Over the same distance, stroke-cycle count is lower than at the start of learning, with technique quality staying consistent.",
    ],
  },
}
