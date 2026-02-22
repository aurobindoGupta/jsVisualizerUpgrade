import React from 'react';
import InfoDialog from './InfoDialog';

interface CallStackDescriptionProps {
  open: boolean;
  onClose: () => void;
}

const CallStackDescription = ({ open, onClose }: CallStackDescriptionProps) => (
  <InfoDialog
    open={open}
    onClose={onClose}
    title="About the Call Stack"
    learnMoreHref="https://www.ecma-international.org/ecma-262/9.0/index.html#sec-execution-contexts"
    learnMoreLabel="Learn more from the JavaScript Spec"
  >
    <p>
      <b>TL;DR</b>{' '}
      <em>
        The <b>Call Stack</b> tracks function calls. It is a LIFO stack of
        frames. Each frame represents a function call.
      </em>
    </p>
    <hr className="my-2 border-gray-200" />
    <p>
      The <b>Call Stack</b> is a fundamental part of the JavaScript language. It
      is a record-keeping structure that allows us to perform function calls.
      Each function call is represented as a frame on the <b>Call Stack</b>.
      This is how the JavaScript engine keeps track of which functions have been
      called and in what order. The JS engine uses this information to ensure
      execution picks back up in the right spot after a function returns.
    </p>
    <p>
      When a JavaScript program first starts executing, the <b>Call Stack</b> is
      empty. When the first function call is made, a new frame is pushed onto
      the top of the <b>Call Stack</b>. When that function returns, its frame is
      popped off of the <b>Call Stack</b>.
    </p>
  </InfoDialog>
);

export default CallStackDescription;
