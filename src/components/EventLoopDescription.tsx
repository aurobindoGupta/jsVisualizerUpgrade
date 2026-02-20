import React from 'react';
import InfoDialog from './InfoDialog';

const eventLoopPseudocode = `
while (EventLoop.waitForTask()) {
  const taskQueue = EventLoop.selectTaskQueue();
  if (taskQueue.hasNextTask()) {
    taskQueue.processNextTask();
  }

  const microtaskQueue = EventLoop.microTaskQueue;
  while (microtaskQueue.hasNextMicrotask()) {
    microtaskQueue.processNextMicrotask();
  }

  rerender();
}
`.trim();

interface EventLoopDescriptionProps {
  open: boolean;
  onClose: () => void;
}

const EventLoopDescription = ({
  open,
  onClose,
}: EventLoopDescriptionProps) => (
  <InfoDialog
    open={open}
    onClose={onClose}
    title="About the Event Loop"
    learnMoreHref="https://www.w3.org/TR/html52/webappapis.html#event-loops-processing-model"
    learnMoreLabel="Learn more from the HTML Scripting Spec"
  >
    <p>
      <b>TL;DR</b>{' '}
      <em>
        The <b>Event Loop</b> processes Tasks and Microtasks. It places them
        into the Call Stack for execution one at a time. It also controls when
        rerendering occurs.
      </em>
    </p>
    <hr className="my-2 border-gray-200" />
    <p>
      The Event Loop is a looping algorithm that processes the Tasks/Microtasks
      in the Task Queue and Microtask Queue. It handles selecting the next
      Task/Microtask to be run and placing it in the Call Stack for execution.
    </p>
    <p>The Event Loop algorithm consists of four key steps:</p>
    <ol className="list-decimal list-inside space-y-1 pl-2">
      <li>
        <b>Evaluate Script:</b> Synchronously execute the script as though it
        were a function body. Run until the Call Stack is empty.
      </li>
      <li>
        <b>Run a Task:</b> Select the oldest Task from the Task Queue. Run it
        until the Call Stack is empty.
      </li>
      <li>
        <b>Run all Microtasks:</b> Select the oldest Microtask from the
        Microtask Queue. Run it until the Call Stack is empty. Repeat until the
        Microtask Queue is empty.
      </li>
      <li>
        <b>Rerender the UI:</b> Rerender the UI. Then, return to step 2. (This
        step only applies to browsers, not NodeJS).
      </li>
    </ol>
    <p>Let's model the Event Loop with some JavaScript pseudocode:</p>
    <pre className="text-sm bg-gray-50 rounded p-3 overflow-x-auto">
      <code>{eventLoopPseudocode}</code>
    </pre>
  </InfoDialog>
);

export default EventLoopDescription;
