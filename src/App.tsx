import React, { useState, useEffect } from "react";
import { Toaster } from "sonner";

import AppRoot from "./AppRoot";
import { useEventPlayback } from "./hooks/useEventPlayback";
import DEFAULT_CODE from "./assets/defaultCode";
import type { VisiblePanels } from "./types";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [example, setExample] = useState("none");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [visiblePanels, setVisiblePanels] = useState<VisiblePanels>({
    taskQueue: true,
    microtaskQueue: true,
    callStack: true,
    eventLoop: true,
  });
  const [showCallStackDescription, setShowCallStackDescription] =
    useState(false);
  const [showEventLoopDescription, setShowEventLoopDescription] =
    useState(false);
  const [showTaskQueueDescription, setShowTaskQueueDescription] =
    useState(false);
  const [showMicrotaskQueueDescription, setShowMicrotaskQueueDescription] =
    useState(false);

  const {
    tasks,
    microtasks,
    frames,
    markers,
    mode,
    isAutoPlaying,
    currentStep,
    consoleLogs,
    hasReachedEnd,
    runCode,
    stepNext,
    autoPlay,
    pauseAutoPlay,
    transitionToEdit,
  } = useEventPlayback();

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const urlCode = search.get("code");
    const loaded =
      (urlCode ? atob(urlCode) : "") ||
      localStorage.getItem("code") ||
      DEFAULT_CODE;
    setCode(loaded);
  }, []);

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem("code", newCode);
  };

  const handleChangeExample = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    setCode(value === "none" ? "" : value);
    setExample(value);
    transitionToEdit();
  };

  const handleChangeVisiblePanel = (panel: keyof VisiblePanels) => () => {
    setVisiblePanels((prev) => ({ ...prev, [panel]: !prev[panel] }));
  };

  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      <AppRoot
        mode={mode}
        example={example}
        code={code}
        tasks={tasks}
        microtasks={microtasks}
        frames={frames}
        markers={markers}
        visiblePanels={visiblePanels}
        isAutoPlaying={isAutoPlaying}
        isDrawerOpen={isDrawerOpen}
        showCallStackDescription={showCallStackDescription}
        showEventLoopDescription={showEventLoopDescription}
        showTaskQueueDescription={showTaskQueueDescription}
        showMicrotaskQueueDescription={showMicrotaskQueueDescription}
        hasReachedEnd={hasReachedEnd}
        currentStep={currentStep}
        consoleLogs={consoleLogs}
        onChangeVisiblePanel={handleChangeVisiblePanel}
        onCloseDrawer={() => setIsDrawerOpen(false)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onChangeExample={handleChangeExample}
        onChangeCode={handleChangeCode}
        onClickRun={() => runCode(code)}
        onClickEdit={transitionToEdit}
        onClickPauseAutoStep={pauseAutoPlay}
        onClickResume={autoPlay}
        onClickStop={transitionToEdit}
        onClickStep={stepNext}
        onShowCallStackDescription={() => setShowCallStackDescription(true)}
        onHideCallStackDescription={() => setShowCallStackDescription(false)}
        onShowEventLoopDescription={() => setShowEventLoopDescription(true)}
        onHideEventLoopDescription={() => setShowEventLoopDescription(false)}
        onShowTaskQueueDescription={() => setShowTaskQueueDescription(true)}
        onHideTaskQueueDescription={() => setShowTaskQueueDescription(false)}
        onShowMicrotaskQueueDescription={() =>
          setShowMicrotaskQueueDescription(true)
        }
        onHideMicrotaskQueueDescription={() =>
          setShowMicrotaskQueueDescription(false)
        }
      />
      <Analytics />
    </>
  );
}
