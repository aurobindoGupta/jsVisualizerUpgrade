import React from 'react';
import InfoDialog from './InfoDialog';

interface TaskQueueDescriptionProps {
  open: boolean;
  onClose: () => void;
}

const TaskQueueDescription = ({
  open,
  onClose,
}: TaskQueueDescriptionProps) => (
  <InfoDialog
    open={open}
    onClose={onClose}
    title="About the Task Queue"
    learnMoreHref="https://www.w3.org/TR/html52/webappapis.html#task-queues"
    learnMoreLabel="Learn more from the HTML Scripting Spec"
  >
    <p>
      <b>TL;DR</b>{' '}
      <em>
        The <b>Task Queue</b> is a FIFO queue of Tasks that are going to be
        executed by the Event Loop. Tasks are synchronous blocks of code that
        can enqueue other Tasks while they're running.
      </em>
    </p>
    <hr className="my-2 border-gray-200" />
    <p>
      If the Call Stack keeps track of the functions that are executing right
      now, then the <b>Task Queue</b> keeps track of functions that are going to
      be executed in the future.
    </p>
    <p>
      The <b>Task Queue</b> is a FIFO queue of Tasks that are processed by the
      Event Loop. Tasks are synchronous blocks of code. You can think of them as
      Function objects.
    </p>
    <p>
      The Event Loop works by continuously looping through the{' '}
      <b>Task Queue</b> and processing the Tasks it contains one by one. A
      single iteration of the Event Loop is called a tick.
    </p>
    <p>
      To process a Task, the Event Loop invokes the Function associated with it.
      While a Task is running, it has exclusive access to the Call Stack. The
      Event Loop waits to process the next Task until the current Task is
      finished, and the Call Stack is empty.
    </p>
    <p>
      While a Task is running, it can enqueue other Tasks to be processed in
      subsequent ticks of the Event Loop. There are several ways to do this, the
      simplest of which is <code className="bg-gray-100 px-1 rounded">setTimeout(taskFn, 0)</code>. Tasks can also come from
      external sources such as DOM and network events.
    </p>
  </InfoDialog>
);

export default TaskQueueDescription;
