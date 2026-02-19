import React from 'react';

import Header from './components/Header';
import RunOrEditButton from './components/RunOrEditButton';
import ShareButton from './components/ShareButton';
import ExampleSelector from './components/ExampleSelector';
import CodeEditor from './components/CodeEditor';
import CallStack from './components/CallStack';
import TaskQueue from './components/TaskQueue';
import ExecutionModelStepper from './components/ExecutionModelStepper';
import FabControls from './components/FabControls';
import Drawer from './components/Drawer';
import CallStackDescription from './components/CallStackDescription';
import EventLoopDescription from './components/EventLoopDescription';
import TaskQueueDescription from './components/TaskQueueDescription';
import MicrotaskQueueDescription from './components/MicrotaskQueueDescription';
import Attribution from './components/Attribution';
import type {
  AppMode,
  EventLoopStep,
  Frame,
  Task,
  Microtask,
  CodeMarker,
  VisiblePanels,
} from './types';

interface AppRootProps {
  mode: AppMode;
  example: string;
  code: string;
  tasks: Task[];
  microtasks: Microtask[];
  frames: Frame[];
  markers: CodeMarker[];
  visiblePanels: VisiblePanels;
  isAutoPlaying: boolean;
  isDrawerOpen: boolean;
  showCallStackDescription: boolean;
  showEventLoopDescription: boolean;
  showTaskQueueDescription: boolean;
  showMicrotaskQueueDescription: boolean;
  hasReachedEnd: boolean;
  currentStep: EventLoopStep;
  onChangeVisiblePanel: (panel: keyof VisiblePanels) => () => void;
  onCloseDrawer: () => void;
  onOpenDrawer: () => void;
  onChangeExample: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeCode: (code: string) => void;
  onClickRun: () => void;
  onClickEdit: () => void;
  onClickPauseAutoStep: () => void;
  onClickAutoStep: () => void;
  onClickStepBack: () => void;
  onClickStep: () => boolean;
  onShowCallStackDescription: () => void;
  onHideCallStackDescription: () => void;
  onShowEventLoopDescription: () => void;
  onHideEventLoopDescription: () => void;
  onShowTaskQueueDescription: () => void;
  onHideTaskQueueDescription: () => void;
  onShowMicrotaskQueueDescription: () => void;
  onHideMicrotaskQueueDescription: () => void;
}

const AppRoot = ({
  mode,
  example,
  code,
  tasks,
  microtasks,
  frames,
  markers,
  visiblePanels,
  isAutoPlaying,
  isDrawerOpen,
  showCallStackDescription,
  showEventLoopDescription,
  showTaskQueueDescription,
  showMicrotaskQueueDescription,
  hasReachedEnd,
  currentStep,
  onChangeVisiblePanel,
  onCloseDrawer,
  onOpenDrawer,
  onChangeExample,
  onChangeCode,
  onClickRun,
  onClickEdit,
  onClickPauseAutoStep,
  onClickAutoStep,
  onClickStepBack,
  onClickStep,
  onShowCallStackDescription,
  onHideCallStackDescription,
  onShowEventLoopDescription,
  onHideEventLoopDescription,
  onShowTaskQueueDescription,
  onHideTaskQueueDescription,
  onShowMicrotaskQueueDescription,
  onHideMicrotaskQueueDescription,
}: AppRootProps) => (
  <div className="w-screen h-screen flex flex-row overflow-hidden bg-slate-100">
    <Drawer
      open={isDrawerOpen}
      visiblePanels={visiblePanels}
      onChange={onChangeVisiblePanel}
      onClose={onCloseDrawer}
    />

    {/* Left panel */}
    <div className="flex flex-col">
      <Header onClickLogo={onOpenDrawer} />
      <div className="flex flex-row items-center">
        <ExampleSelector
          example={example}
          locked={mode === 'running'}
          onChangeExample={onChangeExample}
        />
        <RunOrEditButton
          mode={mode}
          runDisabled={code.trim() === ''}
          onClickRun={onClickRun}
          onClickEdit={onClickEdit}
        />
        <ShareButton code={code} />
      </div>
      <CodeEditor
        code={code}
        markers={markers}
        locked={mode !== 'editing'}
        onChangeCode={onChangeCode}
      />
      <Attribution />
    </div>

    {/* Right panel */}
    <div className="flex flex-col flex-1">
      <div>
        {visiblePanels.taskQueue && (
          <TaskQueue
            title="Task Queue"
            tasks={tasks}
            onClickAbout={onShowTaskQueueDescription}
          />
        )}
        {visiblePanels.microtaskQueue && (
          <TaskQueue
            title="Microtask Queue"
            tasks={microtasks}
            onClickAbout={onShowMicrotaskQueueDescription}
          />
        )}
      </div>
      <div className="flex flex-1 flex-row overflow-hidden">
        {visiblePanels.callStack && (
          <CallStack
            frames={frames}
            onClickAbout={onShowCallStackDescription}
          />
        )}
        {visiblePanels.eventLoop && (
          <ExecutionModelStepper
            step={currentStep}
            onClickAbout={onShowEventLoopDescription}
          />
        )}
      </div>
    </div>

    <FabControls
      visible={mode === 'visualizing'}
      isAutoPlaying={isAutoPlaying}
      hasReachedEnd={hasReachedEnd}
      onClickPauseAutoStep={onClickPauseAutoStep}
      onClickAutoStep={onClickAutoStep}
      onClickStepBack={onClickStepBack}
      onClickStep={onClickStep}
    />

    <CallStackDescription
      open={showCallStackDescription}
      onClose={onHideCallStackDescription}
    />
    <EventLoopDescription
      open={showEventLoopDescription}
      onClose={onHideEventLoopDescription}
    />
    <TaskQueueDescription
      open={showTaskQueueDescription}
      onClose={onHideTaskQueueDescription}
    />
    <MicrotaskQueueDescription
      open={showMicrotaskQueueDescription}
      onClose={onHideMicrotaskQueueDescription}
    />
  </div>
);

export default AppRoot;
