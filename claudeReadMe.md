# JS Visualizer 9000 — Refactor Changelog

A full modernization of the client codebase carried out by Claude Code. All changes are listed in the order they were made.

---

## Phase 1 — Tooling & Project Setup

1. Replaced `react-scripts` (Create React App 2.1.8) with Vite 6 as the build tool.
2. Created `vite.config.ts` at the project root, configuring the React plugin, a path alias for `src/`, and dev server port 3000.
3. Created `tsconfig.json` to enable TypeScript with strict mode, ESNext module resolution, JSX support, and the `@/` path alias.
4. Created `tsconfig.node.json` as a companion config scoped to the Vite config file itself.
5. Created `tailwind.config.ts`, pointing content scanning at all `.ts` and `.tsx` source files, with dark mode support and the project's primary/secondary color palette extended.
6. Created `postcss.config.js` with the Tailwind CSS and Autoprefixer plugins.
7. Moved `index.html` from the `public/` folder to the project root, as required by Vite.
8. Updated `index.html` to remove all `%PUBLIC_URL%` CRA placeholders and replaced the CRA script injection with a direct `<script type="module">` tag pointing to `src/index.tsx`.
9. Rewrote `package.json` completely — removed all old dependencies (`react-scripts`, `@material-ui/core`, `@material-ui/icons`, `react-pose`, `brace`, `react-measure`, `uuid`) and added the new stack: `react@18`, `react-dom@18`, `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `tailwindcss`, `postcss`, `autoprefixer`, `framer-motion`, `lucide-react`, `react-ace@11`, `ace-builds`, `@headlessui/react`, and `sonner`.
10. Updated npm scripts to `dev`, `build`, `preview`, and `typecheck`.
11. Updated `src/styles/index.css` to add the three Tailwind directives at the top while preserving the existing scroll-on-hover utility classes and fixing the invalid `display: auto` to `display: flex`.
12. Created `src/vite-env.d.ts` to reference Vite's client type definitions and declare module types for PNG, JPG, and SVG asset imports.

---

## Phase 2 — Entry Point

13. Created `src/index.tsx` to replace the old `src/index.js`.
14. Switched from the deprecated `ReactDOM.render` to the React 18 `createRoot` API.
15. Removed the `SnackbarProvider` wrapper that previously surrounded the entire app, since Sonner does not require a context provider.
16. Added the global CSS import directly in the entry point.
17. Deleted the old `src/index.js`.

---

## Phase 3 — Core Types and Utilities

18. Created `src/types/index.ts` to centralise all shared TypeScript interfaces and types used across the app, including `Frame`, `Task`, `Microtask`, `CodeMarker`, `AppMode`, `EventLoopStep`, `ExecutionEvent`, `ExecutionEventPayload`, and `VisiblePanels`.
19. Created `src/utils/events.ts` to replace the old `events.js`.
20. Removed the `lodash` dependency from `events.ts` and replaced the `_.get` call with native optional chaining.
21. Updated the WebSocket URL detection to use `import.meta.env.MODE` instead of `process.env.NODE_ENV`, which is the correct Vite equivalent.
22. Added a WebSocket `error` event listener to the fetch function for more reliable error handling.
23. Added full TypeScript types to the fetch function's parameter and return value.
24. Deleted the old `src/utils/events.js`.

---

## Phase 4 — Event Playback Hook

25. Created `src/hooks/useEventPlayback.ts`, extracting all event playback state and logic out of the monolithic `App.js` class component.
26. Replaced the class instance variables `currEventIdx` and `events` with `useRef` so they can be mutated without triggering re-renders.
27. Added `isAutoPlayingRef` and `modeRef` as additional refs so the async auto-play while-loop can always read the latest values without stale closure issues.
28. Implemented `setModeSync` and `setAutoPlayingSync` helpers that update both the ref and the state simultaneously to keep them in sync.
29. Ported all queue management functions — `pushCallStackFrame`, `popCallStackFrame`, `enqueueMicrotask`, `dequeueMicrotask`, `enqueueTask`, `dequeueTask` — as inline state updaters using the functional `setState` pattern.
30. Replaced `uuid()` calls with the built-in `crypto.randomUUID()` for generating frame and microtask IDs, removing the `uuid` package dependency entirely.
31. Replaced all `enqueueSnackbar` calls from the old notistack system with `toast`, `toast.warning`, and `toast.error` from Sonner.
32. Replaced the `autoPlayEvents` class method with an async function that reads from refs inside the while-loop to avoid stale state.
33. Exposed a clean public API from the hook: `tasks`, `microtasks`, `frames`, `markers`, `mode`, `isAutoPlaying`, `currentStep`, `hasReachedEnd`, `runCode`, `stepNext`, `autoPlay`, `pauseAutoPlay`, and `transitionToEdit`.

---

## Phase 5 — App Component

34. Created `src/App.tsx` to replace the old `src/App.js` class component.
35. Converted the class component to a function component using React hooks.
36. Moved the remaining UI state (`code`, `example`, `isDrawerOpen`, `visiblePanels`, and the four `show*Description` booleans) into individual `useState` calls.
37. Replaced `componentDidMount` with a `useEffect` for reading the initial code from the URL query parameter or localStorage.
38. Wired up all state and callbacks from `useEventPlayback` and passed them down to `AppRoot`.
39. Added the Sonner `<Toaster>` component directly inside `App`, replacing the old `SnackbarProvider` wrapper.
40. Removed the `withSnackbar` HOC, `SnackbarProvider`, `IconButton`, and `CloseIcon` imports entirely.
41. Removed the `AppWithSnackbar` HOC composition pattern that wrapped the class component.
42. Deleted the old `src/App.js`.

---

## Phase 6 — Layout Component

43. Created `src/AppRoot.tsx` to replace the old `src/AppRoot.js`.
44. Removed `MuiThemeProvider`, `createMuiTheme`, and all Material-UI color imports.
45. Replaced all inline style objects with Tailwind utility classes for the container, left panel, right panel, code controls row, and bottom-right section.
46. Added a full TypeScript props interface for the component.
47. Replaced `blueGrey[100]` background with the Tailwind `bg-slate-100` class.
48. Deleted the old `src/AppRoot.js`.

---

## Phase 7 — Simple Components

49. Created `src/components/Header.tsx`, replacing `<Typography variant="h5">` with a plain `<h1>` tag styled with Tailwind classes.
50. Replaced the inline style object for the JS logo image with Tailwind utility classes.
51. Deleted the old `src/components/Header.js`.
52. Created `src/components/Attribution.tsx`, replacing `<Typography>` with a plain `<p>` tag and `<Link>` with a plain `<a>` tag, both styled with Tailwind.
53. Removed the `withStyles` HOC from Attribution.
54. Deleted the old `src/components/Attribution.js`.
55. Created `src/components/CardHeaderWithAbout.tsx`, replacing `<CardHeader>` with a plain `<span>` and the MUI `<Button>` wrapped in a blue theme provider with a plain `<button>` styled with Tailwind.
56. Removed the `withStyles` HOC, `MuiThemeProvider`, `createMuiTheme`, and `blue` color import from CardHeaderWithAbout.
57. Deleted the old `src/components/CardHeaderWithAbout.js`.

---

## Phase 8 — Form Controls

58. Created `src/components/ExampleSelector.tsx`, replacing the MUI `<FormControl>`, `<Select>`, and `<MenuItem>` components with a native HTML `<select>` element styled with Tailwind.
59. Replaced MUI `<Divider>` elements between example groups with disabled `<option>` separator elements.
60. Removed the `withStyles` HOC from ExampleSelector.
61. Deleted the old `src/components/ExampleSelector.js`.
62. Created `src/components/RunOrEditButton.tsx`, replacing the MUI `<Button>` and themed `GreenButton`/`BlueButton` wrappers with plain `<button>` elements styled with Tailwind.
63. Replaced `<CircularProgress>` with the `Loader2` icon from Lucide React with a Tailwind `animate-spin` class.
64. Replaced `<SendIcon>` with `<Send>` and `<CodeIcon>` with `<Code2>` from Lucide React.
65. Removed `MuiThemeProvider`, `createMuiTheme`, `withStyles`, and all MUI color imports from RunOrEditButton.
66. Deleted the old `src/components/RunOrEditButton.js`.
67. Created `src/components/ShareButton.tsx`, replacing the MUI `<Popper>`, `<Paper>`, and `<TextField>` with a custom absolutely-positioned popover built entirely with Tailwind.
68. Added a click-outside overlay `<div>` to close the popover when clicking elsewhere on the page.
69. Replaced `<LinkIcon>` with `<Link2>` from Lucide React.
70. Removed `withStyles`, `MuiThemeProvider`, `createMuiTheme`, `PinkButton`, and all MUI pink theme code from ShareButton.
71. Deleted the old `src/components/ShareButton.js`.

---

## Phase 9 — Drawer and Code Editor

72. Created `src/components/Drawer.tsx`, replacing the MUI `<Drawer>` with a Headless UI `<Dialog>` configured as a slide-in side panel.
73. Replaced `<FormGroup>`, `<FormControlLabel>`, and `<Checkbox>` with plain `<label>` and `<input type="checkbox">` elements styled with Tailwind.
74. Replaced `<FormLabel>` with a plain styled `<p>` tag.
75. Added a close button with the `<X>` icon from Lucide React in the top-right corner of the drawer panel.
76. Added a `DialogBackdrop` from Headless UI to dim the page behind the open drawer.
77. Extracted the panel list into a typed constant array to avoid repetition.
78. Removed the `withStyles` HOC and all MUI imports from Drawer.
79. Deleted the old `src/components/Drawer.js`.
80. Created `src/components/CodeEditor.tsx`, replacing the `brace` imports with the equivalent `ace-builds` imports for the JavaScript mode and Solarized Light theme.
81. Replaced the MUI `<Paper>` wrapper with a plain `<div>` styled with Tailwind.
82. Removed the `withStyles` HOC and all MUI imports from CodeEditor.
83. Removed the invalid `showLineNumbers` prop (not present in react-ace v11's type definitions) — the gutter already displays line numbers.
84. Updated the marker type annotation to use `as const` for the `type: 'text'` literal.
85. Deleted the old `src/components/CodeEditor.js`.

---

## Phase 10 — Description Dialogs

86. Created `src/components/InfoDialog.tsx` as a new shared base dialog component, used by all four educational description panels.
87. Built InfoDialog using the Headless UI `<Dialog>`, `<DialogPanel>`, `<DialogTitle>`, and `<DialogBackdrop>` primitives, styled entirely with Tailwind.
88. The InfoDialog accepts `title`, `learnMoreHref`, `learnMoreLabel`, `open`, `onClose`, and `children` as props, making all four description components thin wrappers around it.
89. Created `src/components/CallStackDescription.tsx` using InfoDialog, replacing the MUI `<Dialog>`, `<DialogTitle>`, `<DialogContent>`, `<DialogContentText>`, `<DialogActions>`, `<Button>`, `<Link>`, and `<Divider>` components with plain HTML elements.
90. Removed the `withStyles` HOC from CallStackDescription.
91. Deleted the old `src/components/CallStackDescription.js`.
92. Created `src/components/EventLoopDescription.tsx` using InfoDialog with the same pattern, preserving the pseudocode block in a `<pre><code>` element styled with Tailwind.
93. Deleted the old `src/components/EventLoopDescription.js`.
94. Created `src/components/TaskQueueDescription.tsx` using InfoDialog.
95. Deleted the old `src/components/TaskQueueDescription.js`.
96. Created `src/components/MicrotaskQueueDescription.tsx` using InfoDialog.
97. Deleted the old `src/components/MicrotaskQueueDescription.js`.

---

## Phase 11 — Animated Components

98. Created `src/components/CallStack.tsx`, replacing the class component with a function component.
99. Replaced `posed` and `PoseGroup` from react-pose with `motion.div` and `AnimatePresence` from Framer Motion for the call stack frame enter/exit animations.
100. Removed `<RootRef>` (a MUI-specific ref forwarding utility) since Framer Motion handles refs natively.
101. Removed `react-measure` and the `Measure` component — the fixed-dimension absolute positioning pattern was replaced with a simpler `flex-col-reverse` layout that handles overflow naturally.
102. Replaced `<Card>`, `<CardContent>`, `<Paper>`, and `<Typography>` with plain `<div>` elements styled with Tailwind.
103. Frame animations retained the original behavior: new frames slide in from above (y: -200 → 0) and exit upward (y: 0 → -200) with a 300ms tween.
104. Added `aria-label` attributes to each animated stack frame for accessibility.
105. Deleted the old `src/components/CallStack.js`.
106. Created `src/components/TaskQueue.tsx`, replacing the class component with a function component.
107. Replaced `posed` and `PoseGroup` (with `preEnterPose`) with `motion.div` and `AnimatePresence` using Framer Motion's `mode="popLayout"`.
108. Task animations retained the original behavior: tasks slide in from the right (x: 200 → 0) and exit to the left (x: 0 → -200) with a 300ms tween.
109. Replaced `<Card>`, `<CardContent>`, `<Paper>`, and `<Typography>` with plain `<div>` elements styled with Tailwind.
110. Removed `react-measure` and `<Measure>` from TaskQueue as well.
111. Deleted the old `src/components/TaskQueue.js`.
112. Created `src/components/FabControls.tsx`, replacing `<Fab>`, `<Tooltip>`, and `<Zoom>` from MUI with Framer Motion `<AnimatePresence>` and `<motion.button>` elements.
113. FAB animations use a spring scale (0 → 1 on appear, 1 → 0 on disappear), matching the original MUI Zoom transition behavior.
114. Replaced `<PlayArrowIcon>` with `<Play>`, `<FastForwardIcon>` with `<FastForward>`, and `<PauseIcon>` with `<Pause>` from Lucide React.
115. Removed all `MuiThemeProvider`, `createMuiTheme`, `GreenFab`, `BlueFab`, `YellowFab`, and `withStyles` code from FabControls.
116. Changed positioning from `position: absolute` inline style to Tailwind `fixed bottom-5 right-5`.
117. Deleted the old `src/components/FabControls.js`.
118. Created `src/components/ExecutionModelStepper.tsx`, replacing the MUI `<Stepper>`, `<Step>`, `<StepLabel>`, `<StepContent>`, and `<Typography>` with a fully custom Tailwind stepper.
119. Each step shows a numbered circle that turns blue when active and green when completed, with the step description only visible for the currently active step.
120. Removed `MuiThemeProvider`, `createMuiTheme`, the blue theme override, `withStyles`, and all MUI Stepper imports.
121. Replaced `<Card>` and `<CardContent>` with plain `<div>` elements styled with Tailwind.
122. Deleted the old `src/components/ExecutionModelStepper.js`.

---

## Phase 12 — Styles and Cleanup

123. Created `src/styles/colors.ts` to replace the old `src/styles/colors.js`.
124. Removed the Flow type annotation comment from colors.
125. Added `as const` to the pastels array to make it a readonly typed tuple in TypeScript.
126. Deleted the old `src/styles/colors.js`.
127. Deleted the entire `src/notistack/` directory (custom copy of the notistack library), as it is fully replaced by Sonner.
128. Deleted `package-lock.json` to remove the duplicate lock file (the project now uses npm exclusively with a fresh `package-lock.json` generated after install).
129. Deleted `yarn.lock` to resolve the mixed package manager state.
130. Removed `node_modules` and performed a clean `npm install` to ensure a consistent dependency tree with only the new packages.

---

## Phase 13 — Type Error Fixes and Build Verification

131. Added `"allowJs": true` to `tsconfig.json` so that the plain JavaScript asset files (`defaultCode.js`, `examples1.js`, `examples2.js`, `examples3.js`) can be imported from TypeScript files without errors.
132. Fixed the TypeScript error on `import.meta.env` by adding a `/// <reference types="vite/client" />` directive in `src/vite-env.d.ts`.
133. Added `declare module '*.png'` and related image module declarations to `src/vite-env.d.ts` to resolve the type error on the JS logo import in Header.
134. Removed the `showLineNumbers` prop from `CodeEditor.tsx` as it does not exist in react-ace v11's type definitions (line numbers are shown automatically via `showGutter`).
135. Ran `npx tsc --noEmit` — zero type errors.
136. Ran `npx vite build` — production build succeeded, output to `dist/`, total JS bundle 992 KB (296 KB gzipped).

---

---

## Phase 14 — Loupe-Inspired Improvements + Loader Fix

137. Fixed the spinner drift bug in `src/components/RunOrEditButton.tsx`: replaced the raw `<Loader2>` element positioned with `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` with a wrapper `<div className="absolute inset-0 flex items-center justify-center pointer-events-none">` containing the icon. The root cause was SVG's default `display: inline` interacting with the baseline alignment rules of the `inline-flex` parent, causing the 50% anchor to shift south-east.
138. Changed `CallStack.tsx` panel background from `bg-yellow-400` to `bg-sky-200` (light blue) to visually distinguish the call stack from other panels.
139. Added an optional `color` prop (Tailwind class string, defaulting to `bg-yellow-400`) to `TaskQueue.tsx`, replacing the hardcoded yellow background so each queue instance can have its own color.
140. Updated `AppRoot.tsx` to pass `color="bg-orange-200"` to the Task Queue instance and `color="bg-violet-200"` to the Microtask Queue instance, giving each a distinct warm-orange and light-purple appearance respectively.
141. Changed `ExecutionModelStepper.tsx` panel background from `bg-yellow-400` to `bg-emerald-200` (light green), making the Event Loop stepper immediately identifiable.
142. Added the `ConsoleEntry` interface (`{ type: 'log' | 'warn' | 'error'; message: string }`) to `src/types/index.ts`.
143. Added `consoleLogs: ConsoleEntry[]` state (initialised to `[]`) to `useEventPlayback.ts`.
144. Updated `playNextEvent` in `useEventPlayback.ts` so that `ConsoleLog`, `ConsoleWarn`, `ConsoleError`, and `ErrorFunction` events push an entry to `consoleLogs` in addition to showing a Sonner toast.
145. Updated `resetVisualization` in `useEventPlayback.ts` to clear `consoleLogs` back to `[]` whenever a new run starts.
146. Exposed `consoleLogs` from the `useEventPlayback` hook return value.
147. Created `src/components/ConsolePanel.tsx`: a persistent dark terminal-style panel (`bg-gray-900`) with a "Console" header bar. Each log entry is color-coded — `text-gray-300` for log, `text-amber-400` for warn, `text-red-400` for error — and prefixed with `> `. The panel has a fixed height with `overflow-y-auto` and auto-scrolls to the latest entry via a `useEffect` + `useRef` on a sentinel `<div>` at the bottom. An italic placeholder message is shown when no entries exist yet.
148. Threaded `consoleLogs` from `useEventPlayback` through `App.tsx` down to `AppRoot.tsx` as a new prop.
149. Added `ConsolePanel` to `AppRoot.tsx`, rendered below `<CodeEditor>` and above `<Attribution>` in the left panel.
150. Changed the auto-play delay in `useEventPlayback.ts` from `500ms` to `800ms` for a pace that is slow enough to follow visually.
151. Updated `runCode()` in `useEventPlayback.ts` to call `autoPlayEvents()` immediately after switching to `visualizing` mode, so the animation starts automatically the moment code finishes fetching — no manual button press required.
152. Redesigned `src/components/FabControls.tsx`: removed the Auto Step button (no longer needed since auto-play starts automatically) and replaced it with four context-aware buttons — **Pause** (yellow, visible while auto-playing), **Resume** (blue, visible when paused and not at end), **Step** (green, visible when paused), and **Stop** (red, always visible while visualizing). Stop returns the app to editing mode. Added `StopCircle` from Lucide React.
153. Updated `AppRoot.tsx` props interface: removed `onClickAutoStep` and `onClickStepBack`; added `onClickResume` and `onClickStop`.
154. Updated `App.tsx`: removed the `onClickAutoStep` and `onClickStepBack` prop passes; added `onClickResume={autoPlay}` and `onClickStop={transitionToEdit}` to `<AppRoot>`.
155. Ran `npx tsc --noEmit` — zero type errors after all Phase 14 changes.
156. Ran `npx vite build` — production build succeeded.

---

## Summary of Files Created

- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `index.html` (moved from `public/index.html`)
- `src/vite-env.d.ts`
- `src/index.tsx`
- `src/App.tsx`
- `src/AppRoot.tsx`
- `src/types/index.ts`
- `src/utils/events.ts`
- `src/hooks/useEventPlayback.ts`
- `src/styles/colors.ts`
- `src/components/Header.tsx`
- `src/components/Attribution.tsx`
- `src/components/CardHeaderWithAbout.tsx`
- `src/components/ExampleSelector.tsx`
- `src/components/RunOrEditButton.tsx`
- `src/components/ShareButton.tsx`
- `src/components/Drawer.tsx`
- `src/components/CodeEditor.tsx`
- `src/components/InfoDialog.tsx`
- `src/components/CallStackDescription.tsx`
- `src/components/EventLoopDescription.tsx`
- `src/components/TaskQueueDescription.tsx`
- `src/components/MicrotaskQueueDescription.tsx`
- `src/components/CallStack.tsx`
- `src/components/TaskQueue.tsx`
- `src/components/FabControls.tsx`
- `src/components/ExecutionModelStepper.tsx`
- `src/components/ConsolePanel.tsx`

## Summary of Files Deleted

- `src/index.js`
- `src/App.js`
- `src/AppRoot.js`
- `src/utils/events.js`
- `src/styles/colors.js`
- `src/notistack/` (entire directory)
- `src/components/Header.js`
- `src/components/Attribution.js`
- `src/components/CardHeaderWithAbout.js`
- `src/components/ExampleSelector.js`
- `src/components/RunOrEditButton.js`
- `src/components/ShareButton.js`
- `src/components/Drawer.js`
- `src/components/CodeEditor.js`
- `src/components/CallStackDescription.js`
- `src/components/EventLoopDescription.js`
- `src/components/TaskQueueDescription.js`
- `src/components/MicrotaskQueueDescription.js`
- `src/components/CallStack.js`
- `src/components/TaskQueue.js`
- `src/components/FabControls.js`
- `src/components/ExecutionModelStepper.js`
- `package-lock.json` (old)
- `yarn.lock`
- `node_modules/` (rebuilt fresh)
