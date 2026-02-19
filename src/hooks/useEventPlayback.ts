import { useState, useRef } from 'react';
import { toast } from 'sonner';
import type {
  Frame,
  Task,
  Microtask,
  CodeMarker,
  AppMode,
  EventLoopStep,
  ExecutionEvent,
} from '../types';
import { fetchEventsForCode } from '../utils/events';

const pause = (millis: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, millis));

const PLAYABLE_EVENTS = new Set([
  'EnterFunction',
  'ExitFunction',
  'EnqueueMicrotask',
  'DequeueMicrotask',
  'InitTimeout',
  'BeforeTimeout',
  'Rerender',
  'ConsoleLog',
  'ConsoleWarn',
  'ConsoleError',
  'ErrorFunction',
]);

export function useEventPlayback() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [microtasks, setMicrotasks] = useState<Microtask[]>([]);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [markers, setMarkers] = useState<CodeMarker[]>([]);
  const [mode, setMode] = useState<AppMode>('editing');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<EventLoopStep>('none');

  // Mutable refs — not state — so they can be read inside async loops
  // without stale closure issues
  const currEventIdx = useRef(0);
  const eventsRef = useRef<ExecutionEvent[]>([]);
  const isAutoPlayingRef = useRef(false);
  const modeRef = useRef<AppMode>('editing');

  function setModeSync(m: AppMode) {
    modeRef.current = m;
    setMode(m);
  }

  function setAutoPlayingSync(v: boolean) {
    isAutoPlayingRef.current = v;
    setIsAutoPlaying(v);
  }

  function hasReachedEnd() {
    return currEventIdx.current >= eventsRef.current.length;
  }

  function getCurrentEvent(): ExecutionEvent | undefined {
    return eventsRef.current[currEventIdx.current];
  }

  function seekToNextPlayableEvent() {
    while (!hasReachedEnd() && !PLAYABLE_EVENTS.has(getCurrentEvent()!.type)) {
      const event = getCurrentEvent()!;
      if (event.type === 'UncaughtError') {
        toast.error(
          `Uncaught ${event.payload.name} Exception: ${event.payload.message}`
        );
      }
      if (event.type === 'EarlyTermination') {
        toast.warning(event.payload.message ?? 'Script terminated early');
      }
      currEventIdx.current += 1;
    }
  }

  function playNextEvent(): boolean {
    seekToNextPlayableEvent();
    const event = getCurrentEvent();
    if (!event) return true;

    const { type, payload } = event;

    if (type === 'ConsoleLog') toast(payload.message ?? '');
    if (type === 'ConsoleWarn') toast.warning(payload.message ?? '');
    if (type === 'ConsoleError') toast.error(payload.message ?? '');
    if (type === 'ErrorFunction') {
      toast.error(
        `Uncaught Exception in "${payload.name}": ${payload.message}`
      );
    }
    if (type === 'EnterFunction') {
      setMarkers((prev) => prev.concat({ start: payload.start!, end: payload.end! }));
      setFrames((prev) =>
        prev.concat({ id: crypto.randomUUID(), name: payload.name! })
      );
    }
    if (type === 'ExitFunction') {
      setMarkers((prev) => prev.slice(0, -1));
      setFrames((prev) => prev.slice(0, -1));
    }
    if (type === 'EnqueueMicrotask') {
      setMicrotasks((prev) =>
        prev.concat({ id: crypto.randomUUID(), name: payload.name! })
      );
    }
    if (type === 'DequeueMicrotask') {
      setMicrotasks((prev) => prev.slice(1));
    }
    if (type === 'InitTimeout') {
      setTasks((prev) =>
        prev.concat({ id: payload.id!, name: payload.callbackName! })
      );
    }
    if (type === 'BeforeTimeout') {
      setTasks((prev) => prev.filter((t) => t.id !== payload.id));
    }

    currEventIdx.current += 1;
    seekToNextPlayableEvent();
    const nextEvent = getCurrentEvent();

    const nextStep: EventLoopStep | undefined =
      nextEvent === undefined
        ? 'rerender'
        : nextEvent.type === 'Rerender'
        ? 'rerender'
        : nextEvent.type === 'BeforeTimeout'
        ? 'runTask'
        : nextEvent.type === 'DequeueMicrotask'
        ? 'runMicrotasks'
        : undefined;

    if (nextStep) setCurrentStep(nextStep);

    // Automatically advance into the function after dequeue
    if (
      ['DequeueMicrotask', 'BeforeTimeout'].includes(type) &&
      nextEvent?.type === 'EnterFunction'
    ) {
      return playNextEvent();
    }

    return hasReachedEnd();
  }

  async function autoPlayEvents() {
    setAutoPlayingSync(true);
    while (modeRef.current === 'visualizing' && isAutoPlayingRef.current) {
      const endReached = playNextEvent();
      if (endReached) {
        setAutoPlayingSync(false);
        break;
      }
      await pause(500);
    }
  }

  function resetVisualization() {
    setFrames([]);
    setTasks([]);
    setMicrotasks([]);
    setMarkers([]);
    setAutoPlayingSync(false);
    setCurrentStep('none');
  }

  async function runCode(code: string) {
    resetVisualization();
    setModeSync('running');
    try {
      const fetchedEvents = await fetchEventsForCode(code);
      currEventIdx.current = 0;
      eventsRef.current = fetchedEvents;
      setModeSync('visualizing');
      setCurrentStep('evaluateScript');
    } catch (e) {
      currEventIdx.current = 0;
      toast.error((e as Error).message);
      setModeSync('editing');
      setCurrentStep('none');
    }
  }

  function transitionToEdit() {
    resetVisualization();
    setModeSync('editing');
  }

  return {
    tasks,
    microtasks,
    frames,
    markers,
    mode,
    isAutoPlaying,
    currentStep,
    hasReachedEnd: hasReachedEnd(),
    runCode,
    stepNext: playNextEvent,
    autoPlay: autoPlayEvents,
    pauseAutoPlay: () => setAutoPlayingSync(false),
    transitionToEdit,
  };
}
