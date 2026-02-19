import React from 'react';
import CardHeaderWithAbout from './CardHeaderWithAbout';
import type { EventLoopStep } from '../types';

interface ExecutionModelStepperProps {
  step: EventLoopStep;
  onClickAbout: () => void;
}

const STEPS: { id: EventLoopStep; label: string; description: string }[] = [
  {
    id: 'evaluateScript',
    label: 'Evaluate Script',
    description:
      'Synchronously execute the script as though it were a function body. Run until the Call Stack is empty.',
  },
  {
    id: 'runTask',
    label: 'Run a Task',
    description:
      'Select the oldest Task from the Task Queue. Run it until the Call Stack is empty.',
  },
  {
    id: 'runMicrotasks',
    label: 'Run all Microtasks',
    description:
      'Select the oldest Microtask from the Microtask Queue. Run it until the Call Stack is empty. Repeat until the Microtask Queue is empty.',
  },
  {
    id: 'rerender',
    label: 'Rerender',
    description:
      'Rerender the UI. Then, return to step 2. (This step only applies to browsers, not NodeJS).',
  },
];

const STEP_ORDER: EventLoopStep[] = [
  'none',
  'evaluateScript',
  'runTask',
  'runMicrotasks',
  'rerender',
];

const ExecutionModelStepper = ({
  step,
  onClickAbout,
}: ExecutionModelStepperProps) => {
  const currentIdx = STEP_ORDER.indexOf(step);

  return (
    <div className="m-2 flex flex-col bg-yellow-400 rounded-lg shadow-sm flex-1 max-w-xs overflow-y-auto">
      <div className="p-2">
        <CardHeaderWithAbout title="Event Loop" onClickAbout={onClickAbout} />
      </div>
      <div className="flex flex-col gap-4 px-3 pb-4">
        {STEPS.map((s, i) => {
          const stepOrderIdx = i + 1; // offset by 1 because 'none' is at 0
          const isActive = step === s.id;
          const isCompleted = currentIdx > stepOrderIdx;

          return (
            <div
              key={s.id}
              className={`flex gap-3 transition-opacity ${
                step === 'none' || isActive || isCompleted
                  ? 'opacity-100'
                  : 'opacity-40'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isActive ? 'text-blue-800' : 'text-gray-800'
                  }`}
                >
                  {s.label}
                </p>
                {isActive && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    {s.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionModelStepper;
