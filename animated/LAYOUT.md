⚙️ Framer Motion Structure for Glimt Video
Global Setup
Animation library: framer-motion

Tech stack: Next.js or plain React, styled with Tailwind or styled-components

Base layout: Fullscreen <section> containers with motion.div for each animated segment

Scene-by-Scene Component Plan
🔹 Scene 1: The Ticket from Hell
Components:

<SupportUI />: Fuzzy ticket mock with fake Zendesk layout

<MotionCursor />: Custom cursor with animate={{ x, y }} on hover hesitation

<ErrorText />: Animates in with opacity and scale

Motion:

jsx
Copy
Edit
<motion.div initial={{ opacity: 0, blur: 5 }} animate={{ opacity: 1, blur: 0 }} />
<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} />
🔹 Scene 2: Introducing Glimt
Components:

<LogoReveal />

<DashboardMock />

<TagList /> with floating badges

Motion:

Stagger tag animations:

jsx
Copy
Edit
<motion.div initial="hidden" animate="show" variants={containerVariants}>
  {tags.map((tag, i) => (
    <motion.span key={i} variants={tagVariant}>{tag}</motion.span>
  ))}
</motion.div>
🔹 Scene 3: Install & Auto-Capture
Components:

<CodeSnippet />

<SessionReplay />

<AgentView />

Motion:

Typewriter animation for CLI

Fade-in & scale for session list

🔹 Scene 4: Replay & Insight
Components:

<CursorPath />: Animate through UI elements

<CommentBubble />: Animates into the timeline

<PrivacyMask />: Applies blur to form fields

Motion:

Use motion.path for cursor trajectory

Blur with CSS filter + motion opacity

🔹 Scene 5: Collaboration
Components:

<ShareUI />: Share modal or dropdown

<SlackEmbed />: Simulated Slack UI

<CommentThread />

Motion:

jsx
Copy
Edit
<motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} />
🔹 Scene 6: Benefits
Components:

<MetricPopup />: CSAT, Speed

<IconRow />: Privacy, Performance badges

Motion:

Bounce or scale for metric reveal

Sparkle or glow effects using spring transitions

🔹 Scene 7: Differentiation
Components:

<SplitScreen />: Left side legacy, right side Glimt

<OverlayText />

Motion:

Animate divider sweeping across the screen

Slide-in comparisons with x axis motion

🔹 Scene 8: Call to Action
Components:

<LogoCTA />

<JoinButton />

<FinalTagline />

Motion:

Subtle looped hover effect on button

Fade-in logo and CTA on scroll or timed delay

✨ Extras
Consider using ScrollTrigger or timed auto-play mode

Use layoutId transitions for smooth shared element animation

SVG path animation for click trails or UI outlines

