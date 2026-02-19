export interface Frame {
  id: string;
  name: string;
}

export interface Task {
  id: number;
  name: string;
}

export interface Microtask {
  id: string;
  name: string;
}

export interface CodeMarker {
  start: number;
  end: number;
}

export type AppMode = 'editing' | 'running' | 'visualizing';

export type EventLoopStep =
  | 'none'
  | 'evaluateScript'
  | 'runTask'
  | 'runMicrotasks'
  | 'rerender';

export interface ExecutionEventPayload {
  id?: number;
  name?: string;
  callbackName?: string;
  start?: number;
  end?: number;
  message?: string;
  error?: {
    name?: string;
    message?: string;
  };
}

export interface ExecutionEvent {
  type: string;
  payload: ExecutionEventPayload;
}

export interface VisiblePanels {
  taskQueue: boolean;
  microtaskQueue: boolean;
  callStack: boolean;
  eventLoop: boolean;
}
