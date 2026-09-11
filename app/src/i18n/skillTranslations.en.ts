/**
 * English translations of every curriculum Skill's title/description,
 * keyed by skill id exactly as defined in src/data/curriculum/skills.ts.
 * Used by the localize() helpers (src/i18n) when the UI language is "en" —
 * the Chinese fields on Skill remain the source of truth / fallback.
 */
export const SKILL_TRANSLATIONS_EN: Record<string, { title: string; description: string }> = {
  // --- Common skills (shared across strokes) ---
  "common.water.adaptation": {
    title: "Water Adaptation",
    description:
      "Build basic comfort and safety in the water, including submerging the face, opening the eyes underwater, and staying relaxed in shallow water.",
  },
  "common.water.exhale": {
    title: "Underwater Exhale",
    description:
      "Practice the basic breathing pattern of exhaling continuously underwater and inhaling quickly above the surface, which underlies the breathing technique for most strokes.",
  },
  "common.water.back_float": {
    title: "Back Float",
    description:
      "Float relaxed on your back to understand buoyancy and balance in the water, the entry-level foundation for backstroke.",
  },
  "common.water.front_float": {
    title: "Front Float",
    description:
      "Float relaxed face-down to understand buoyancy and balance in the water, the entry-level foundation for freestyle, breaststroke, and butterfly.",
  },
  "common.water.streamline": {
    title: "Streamline / Push-off Glide",
    description:
      "After pushing off the wall, hold a streamlined position with arms squeezing the ears and the body forming one straight line, the low-drag base position shared by all strokes.",
  },

  // --- Freestyle, basic route ---
  "free.basic.kick.board": {
    title: "Kickboard Kicking",
    description:
      "Hold a kickboard while performing the freestyle kick, isolating the arms so you can focus on building a steady, hip-driven kicking rhythm.",
  },
  "free.basic.kick.no_board": {
    title: "Kicking Without a Board",
    description:
      "Perform the freestyle kick on your own without a kickboard, testing whether the kick can already maintain body balance by itself.",
  },
  "free.basic.kick.streamline": {
    title: "Streamline Kicking",
    description:
      "Kick while holding a streamlined position, combining the kicking action with a low-drag body posture.",
  },
  "free.basic.kick.side": {
    title: "Side Kicking",
    description: "Kick while lying on your side, preparing for later body rotation and side breathing.",
  },
  "free.basic.balance.front_back": {
    title: "Front-to-Back Balance",
    description:
      "Adjust the head and body's center of gravity to reduce lower-body sinking and keep the body level along its length.",
  },
  "free.basic.balance.left_right": {
    title: "Side-to-Side Balance",
    description:
      "Maintain a symmetrical, level body position without swaying side to side, laying the groundwork for body rotation.",
  },
  "free.basic.balance.side": {
    title: "Side Balance",
    description:
      "Stay balanced while the body rotates onto its side, a transitional skill between freestyle body rotation and side breathing.",
  },
  "free.basic.rotation": {
    title: "Body Rotation",
    description:
      "Develop natural rotation around the body's long axis driven by coordinated shoulders and hips, rather than relying solely on the arms to pull the body forward.",
  },
  "free.basic.breath.continuous_exhale": {
    title: "Continuous Underwater Exhale",
    description:
      "Apply underwater exhaling to actual swimming, exhaling continuously and slowly underwater instead of holding your breath until the last moment.",
  },
  "free.basic.breath.side": {
    title: "Side Breathing",
    description:
      "Turn the head to breathe naturally along with the body's rotation, letting just the mouth clear the surface without lifting the head.",
  },
  "free.basic.breath.single_side": {
    title: "One-Side Breathing",
    description: "Breathe to a fixed side to first establish a stable one-sided breathing rhythm.",
  },
  "free.basic.breath.bilateral": {
    title: "Bilateral Breathing",
    description: "Practice breathing to both sides, preparing for a more flexible breathing rhythm later on.",
  },
  "free.basic.breath.rotation_combo": {
    title: "Breathing Combined with Body Rotation",
    description:
      "Coordinate breathing naturally with body rotation so that breathing doesn't disrupt the rotation or kicking rhythm.",
  },
  "free.basic.arm.single": {
    title: "Single-Arm Stroke",
    description:
      "Practice the complete stroke path of one arm at a time, reducing coordination demands so you can focus on arm technique.",
  },
  "free.basic.arm.entry": {
    title: "Hand Entry",
    description:
      "Practice the position and angle of the arm's entry into the water, avoiding crossing over the midline.",
  },
  "free.basic.arm.extension": {
    title: "Forward Extension",
    description:
      "Fully extend the arm forward after entry, creating a longer effective pulling distance for the catch.",
  },
  "free.basic.arm.catch": {
    title: "Catch",
    description:
      'Use the forearm and palm to "hold" the water and build pressure, rather than pressing straight down on it.',
  },
  "free.basic.arm.push": {
    title: "Push (Propulsive Phase)",
    description:
      "After the catch, accelerate the push backward through the water until the hand naturally exits, avoiding letting go of the push too early.",
  },
  "free.basic.arm.exit": {
    title: "Hand Exit",
    description:
      "After finishing the push, let the arm relax and exit the water, leading into the recovery of the next stroke.",
  },
  "free.basic.arm.rotation_combo": {
    title: "Arm Stroke Combined with Body Rotation",
    description: "Let the arm stroke draw power from body rotation rather than relying purely on arm strength.",
  },
  "free.basic.combo.arm_leg": {
    title: "Arms + Legs",
    description: "Combine the arm stroke and kick to establish a basic swimming rhythm.",
  },
  "free.basic.combo.arm_breath": {
    title: "Arms + Breathing",
    description: "Combine the arm stroke with side breathing so that breathing doesn't interrupt the stroke rhythm.",
  },
  "free.basic.combo.full": {
    title: "Arms + Legs + Breathing",
    description: "Integrate kicking, stroking, and breathing into a complete freestyle stroke cycle.",
  },
  "free.basic.distance.25m": {
    title: "Continuous 25m",
    description: "Swim 25 meters of freestyle continuously without excessive gasping for breath.",
  },
  "free.basic.distance.50m": {
    title: "Continuous 50m",
    description: "Extend the continuous distance to 50 meters without noticeable breakdown in technique.",
  },
  "free.basic.distance.100m": {
    title: "Continuous 100m",
    description: "Extend the continuous distance to 100 meters while maintaining technical quality.",
  },
  "free.basic.efficiency.drag": {
    title: "Reduce Drag",
    description: "Reduce water resistance while swimming through a better streamline and body position.",
  },
  "free.basic.efficiency.body_position": {
    title: "Improve Body Position",
    description:
      "Further refine the body's horizontal position in the water, reducing sinking and excess undulation.",
  },
  "free.basic.efficiency.breathing": {
    title: "Improve Breathing",
    description: "Make breathing more effortless so it interferes less with body balance and rotation rhythm.",
  },
  "free.basic.efficiency.reduce_waste": {
    title: "Reduce Wasted Motion",
    description: "Eliminate excess body movement and any motion that doesn't generate propulsion.",
  },
  "free.basic.efficiency.stroke_efficiency": {
    title: "Stroke Efficiency",
    description:
      "Increase the distance covered per stroke, reducing the number of strokes needed to cover the same distance.",
  },
  "free.basic.efficiency.pace": {
    title: "Steady Pace",
    description: "Swim at a more stable, sustainable pace while maintaining technical quality.",
  },

  // --- Freestyle, Total Immersion (TI) route ---
  "free.ti.superman_glide": {
    title: "Superman Glide",
    description:
      "Float face-down with both arms extended forward like Superman, using the head, chest, and extended arms to adjust your center of gravity and feel overall balance in the water — the starting move of the TI route.",
  },
  "free.ti.superman_kick": {
    title: "Superman Kick",
    description:
      "Add a gentle kick to the Superman Glide to check whether the legs stay relaxed and whether kicking disrupts the balance you've already built.",
  },
  "free.ti.skate_position": {
    title: "Skate Position",
    description:
      "Rotate from face-down to your side with one arm extended forward and the other along your body, aligning head, hand, shoulder, and hip into one streamlined line — the return position shared by all later arm-switch drills.",
  },
  "free.ti.spear_skate": {
    title: "Spear Skate",
    description:
      "From the Skate Position, spear the leading arm partway into the water while keeping the rest of the body in the same side-lying position.",
  },
  "free.ti.spear_switch": {
    title: "SpearSwitch",
    description:
      "Switch the spearing arm from one side to the other, first with a pause to nail precise alignment, then gradually removing the pause for fluidity.",
  },
  "free.ti.draw_a_line": {
    title: "Draw a Line",
    description:
      "Imagine a shoulder-width track running along each side of the body, and keep the arm moving along that line to build lateral stability.",
  },
  "free.ti.swing_skate": {
    title: "Swing Skate",
    description:
      "From the Skate Position, add a partial out-of-water arm recovery, practicing keeping the side-lying position intact while the arm swings back.",
  },
  "free.ti.swing_switch": {
    title: "SwingSwitch",
    description:
      "Combine the out-of-water arm recovery with the side switch, first with a pause and then gradually removing it — the last broken-down drill before the whole stroke.",
  },
  "free.ti.rag_doll": {
    title: "Rag Doll",
    description:
      "Let the recovering arm go completely limp and swing naturally like a rag doll while the core stays stable, relaxing the shoulder and avoiding a stiff, forced recovery.",
  },
  "free.ti.mail_slot": {
    title: "Mail Slot",
    description:
      "Enter the water hand-first through a narrow slot, as if posting a letter through a mail slot, minimizing splash and bubbles to practice a precise, low-disturbance entry point.",
  },
  "free.ti.marionette_arm": {
    title: "Marionette Arm",
    description:
      "Break the arm stroke down into a sequence led by the shoulder, then elbow, then wrist, feeling each link the way a marionette's strings move in order.",
  },
  "free.ti.elbow_circle": {
    title: "High-Elbow Catch",
    description:
      "Practice a high-elbow position during the catch phase, keeping the elbow higher than the hand to give the stroke a more effective propulsive angle.",
  },
  "free.ti.sweet_spot": {
    title: "Sweet Spot",
    description:
      "Find a head and body position that allows smooth breathing without disturbing body balance — the core drill of TI breathing technique.",
  },
  "free.ti.weightless_head": {
    title: "Weightless Head",
    description:
      "Let body rotation naturally lift the legs, rather than forcibly kicking them up or pressing the head down, correcting the tendency to sink while breathing.",
  },
  "free.ti.two_beat_kick": {
    title: "Two-Beat Kick",
    description:
      "Pair each arm stroke with a single light kick from the opposite leg, the energy-efficient kicking rhythm recommended by the TI system.",
  },
  "free.ti.whole_stroke": {
    title: "Whole Stroke Integration",
    description:
      "Merge all of the drills above into one complete freestyle stroke at an extremely slow, controlled speed, serving as the capstone and pass criterion for the TI route.",
  },

  // --- Breaststroke ---
  "breast.kick.tuck": {
    title: "Leg Recovery (Tuck)",
    description:
      "Practice the breaststroke leg recovery by drawing the heels up toward the hips, preparing for the foot turnout and the propulsive kick.",
  },
  "breast.kick.turn_out": {
    title: "Foot Turnout",
    description: "After tucking the legs, turn the feet outward so the soles can push water effectively during the kick.",
  },
  "breast.kick.press_squeeze": {
    title: "Press and Squeeze",
    description:
      "After the foot turnout, press the legs back through the water and bring them together, the key phase that generates propulsion in the breaststroke kick.",
  },
  "breast.kick.glide": {
    title: "Glide",
    description:
      "After completing the press and squeeze, hold a streamlined glide instead of immediately starting the next leg recovery.",
  },
  "breast.kick.continuous": {
    title: "Continuous Breaststroke Kick",
    description: "Link the tuck, turnout, press-and-squeeze, and glide together into a continuous breaststroke kick.",
  },
  "breast.arm.out_sweep": {
    title: "Out-Sweep",
    description: "Sweep the arms outward from the extended position, starting the first phase of the breaststroke pull.",
  },
  "breast.arm.catch": {
    title: "Catch",
    description: "After the out-sweep is complete, build catch pressure on the water in preparation for the insweep.",
  },
  "breast.arm.insweep": {
    title: "Insweep",
    description: "Sweep the arms inward and downward, generating the main propulsion of the breaststroke pull.",
  },
  "breast.arm.extension": {
    title: "Forward Extension",
    description:
      "After the pull, shoot the arms quickly forward, leading into the next pull or the kick-and-glide.",
  },
  "breast.breath.lift_head": {
    title: "Head Lift",
    description: "Lift the head using the body's natural rise during the arm pull, rather than forcibly lifting it.",
  },
  "breast.breath.inhale": {
    title: "Inhale",
    description: "Take a quick breath while the head is lifted, without needing to lift the whole head out of the water.",
  },
  "breast.breath.underwater_exhale": {
    title: "Underwater Exhale",
    description: "As the arms extend forward, lower the head and begin a continuous, slow exhale underwater.",
  },
  "breast.breath.rhythm": {
    title: "Breathing Rhythm",
    description:
      "Let inhaling and exhaling follow the pull's rhythm naturally, avoiding letting breathing disrupt the stroke.",
  },
  "breast.combo.arm_leg": {
    title: "Arm-Leg Coordination",
    description: "Combine the pull and kick in the core rhythm (pull → tuck → press-and-squeeze → extend).",
  },
  "breast.combo.breath": {
    title: "Breathing Coordination",
    description: "Integrate breathing into the pull-and-kick rhythm to form a complete stroke cycle.",
  },
  "breast.combo.glide": {
    title: "Glide",
    description:
      "Keep the glide phase within the full stroke coordination, using the streamline to reduce drag rather than skipping the glide.",
  },
  "breast.distance.25m": {
    title: "Continuous 25m",
    description: "Swim 25 meters of breaststroke continuously without excessive gasping or breakdown in technique.",
  },
  "breast.distance.50m": {
    title: "Continuous 50m",
    description: "Extend the continuous breaststroke distance to 50 meters while keeping the technique stable.",
  },
  "breast.efficiency.reduce_drag": {
    title: "Reduce Drag",
    description: "Reduce resistance while swimming breaststroke through a better body position and glide.",
  },
  "breast.efficiency.glide": {
    title: "Extend the Glide",
    description: "Lengthen the glide within each stroke cycle rather than rushing into the next pull and kick.",
  },
  "breast.efficiency.kick": {
    title: "Improve Kick Technique",
    description:
      "Further refine the timing and range of the press-and-squeeze to improve kick propulsion efficiency.",
  },
  "breast.efficiency.rhythm": {
    title: "Improve Rhythm",
    description: "Make the rhythm of the pull, breath, kick, and glide more fluid and effortless.",
  },

  // --- Backstroke ---
  "back.kick.basic": {
    title: "Backstroke Kick",
    description: "Practice a small, hip-driven kick while lying on your back.",
  },
  "back.kick.ankle": {
    title: "Ankle Relaxation",
    description: "Specifically practice relaxing the ankles so the toes can point naturally during the kick.",
  },
  "back.body.position": {
    title: "Body Position",
    description:
      "Adjust the position of the ears, hips, and overall body extension to establish a stable, level position on the back.",
  },
  "back.arm.single": {
    title: "Single-Arm Backstroke",
    description: "Practice the complete backstroke pull with one arm at a time, reducing coordination demands.",
  },
  "back.arm.entry": {
    title: "Hand Entry",
    description: "Practice the backstroke arm's entry position, avoiding entering too close to the head's midline.",
  },
  "back.arm.catch": {
    title: "Catch",
    description: "After entry, press the arm downward to build water pressure in preparation for the push.",
  },
  "back.arm.push": {
    title: "Push",
    description: "After the first half of the pull, accelerate backward until the arm completes the full stroke.",
  },
  "back.rotation.body": {
    title: "Body Rotation",
    description:
      "Practice rotation around the body's long axis driven by coordinated shoulders and hips, rather than relying solely on arm strength.",
  },
  "back.arm.alternating": {
    title: "Alternating Arms",
    description: "Keep the rhythm of the alternating left and right arm strokes even, with smooth transitions.",
  },
  "back.stroke.rhythm": {
    title: "Stroke Rhythm",
    description: "Establish a stable overall backstroke rhythm so body rotation and the arm stroke work together.",
  },
  "back.combo.full": {
    title: "Full Backstroke",
    description: "Integrate the kick, pull, body rotation, and breathing into a complete backstroke cycle.",
  },
  "back.distance.25m": {
    title: "25m",
    description: "Swim 25 meters of backstroke continuously while keeping direction and technique stable.",
  },
  "back.distance.50m": {
    title: "50m",
    description: "Extend the continuous backstroke distance to 50 meters without noticeable breakdown in technique.",
  },
  "back.distance.100m": {
    title: "100m",
    description: "Extend the continuous backstroke distance to 100 meters while keeping direction and rhythm stable.",
  },
  "back.efficiency.reduce_resistance": {
    title: "Efficiency",
    description: "Reduce resistance by keeping the body level and extended, increasing the distance covered per stroke.",
  },
  "back.efficiency.rhythm": {
    title: "Rhythm",
    description: "Replace a pure focus on stroke power with a steady rhythm, reducing unnecessary body movement.",
  },
  "back.efficiency.endurance": {
    title: "Endurance",
    description: "Gradually build endurance for continuous backstroke swimming while maintaining technical quality.",
  },

  // --- Butterfly ---
  "fly.kick.dolphin_basic": {
    title: "Basic Dolphin Kick",
    description: "Build a continuous dolphin kick wave that originates from the torso and hips.",
  },
  "fly.kick.fin_action": {
    title: "Fin-Like Action",
    description: "Imagine the body undulating continuously like a fish's tail, avoiding kicking with just the knees bending.",
  },
  "fly.kick.hip_drive": {
    title: "Hip-Driven Power",
    description: "Practice generating the dolphin kick's power mainly from the hips rather than the knees.",
  },
  "fly.kick.wave": {
    title: "Wave Action",
    description:
      "While in a streamlined position, let the wave travel from the core all the way to the toes, reducing drag during the underwater phase.",
  },
  "fly.arm.single": {
    title: "Single-Arm Butterfly",
    description:
      "Practice one arm at a time together with the dolphin kick, reducing the complexity of the full butterfly stroke.",
  },
  "fly.body.wave": {
    title: "Body Wave",
    description: "Before adding the arms, solidify a full-body wave that isn't interrupted by the arm stroke.",
  },
  "fly.arm.double": {
    title: "Both Arms",
    description: "Practice the entry, catch, propulsion, and recovery of the double-arm butterfly pull.",
  },
  "fly.breath.basic": {
    title: "Breathing",
    description: "Perform butterfly breathing without disrupting the rhythm of the body wave.",
  },
  "fly.combo.arm_leg": {
    title: "Arm-Leg Coordination",
    description:
      "Combine the dolphin kick, arm pull, and breathing into the core rhythm, focusing early on short, high-quality distances.",
  },
  "fly.distance.continuous": {
    title: "Continuous Butterfly",
    description:
      "Increase distance step by step through 10m, 15m, 25m, and 50m; if technique breaks down, drop back to a shorter distance rather than forcing through.",
  },
  "fly.efficiency.overall": {
    title: "Efficiency",
    description: "Reduce wasted effort while maintaining the quality of the body wave and breathing.",
  },
  "fly.efficiency.rhythm": {
    title: "Rhythm",
    description: "Avoid sacrificing rhythm for a faster stroke rate, keeping the motion fluid.",
  },
  "fly.efficiency.endurance": {
    title: "Endurance",
    description:
      "Improve butterfly propulsion efficiency and sustained capability without a marked increase in fatigue.",
  },
}
