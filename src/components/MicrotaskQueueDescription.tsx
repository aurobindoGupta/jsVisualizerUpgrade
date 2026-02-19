import React from 'react';
import InfoDialog from './InfoDialog';

interface MicrotaskQueueDescriptionProps {
  open: boolean;
  onClose: () => void;
}

const MicrotaskQueueDescription = ({
  open,
  onClose,
}: MicrotaskQueueDescriptionProps) => (
  <InfoDialog
    open={open}
    onClose={onClose}
    title="About the Microtask Queue"
    learnMoreHref="https://www.w3.org/TR/html52/webappapis.html#microtask-queue"
    learnMoreLabel="Learn more from the HTML Scripting Spec"
  >
    <p>
      <b>TL;DR</b>{' '}
      <em>
        The <b>Microtask Queue</b> was added in ES6 to handle Promises. It's a
        lot like the Task Queue. The main difference is how Microtasks are
        enqueued and when they are processed.
      </em>
    </p>
    <hr className="my-2 border-gray-200" />
    <p>
      The <b>Microtask Queue</b> is a FIFO queue of Microtasks that are
      processed by the Event Loop. The <b>Microtask Queue</b> is very similar to
      the Task Queue. It was added to JavaScript's execution model as part of
      ES6 in order to handle Promise resolution callbacks.
    </p>
    <p>
      Microtasks are a lot like Tasks. They are synchronous blocks of code
      (think of them as Function objects) that have exclusive access to the Call
      Stack while running. And just like Tasks, Microtasks are able to enqueue
      additional Microtasks or Tasks to be run next.
    </p>
    <p>
      The only difference between Microtasks and Tasks is where they are stored,
      and when they are processed.
    </p>
    <ul className="list-disc list-inside space-y-1 pl-2">
      <li>
        Tasks are stored in Task Queues. But Microtasks are stored in the{' '}
        <b>Microtask Queue</b> (there's only one of these).
      </li>
      <li>
        Tasks are processed in a loop, and rendering is performed in-between
        Tasks. But the <b>Microtask Queue</b> is emptied out after a Task
        completes, and before re-rendering occurs.
      </li>
    </ul>
  </InfoDialog>
);

export default MicrotaskQueueDescription;
