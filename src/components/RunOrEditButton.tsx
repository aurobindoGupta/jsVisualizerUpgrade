import React from 'react';
import { Loader2, Send, Code2 } from 'lucide-react';
import type { AppMode } from '../types';

interface RunOrEditButtonProps {
  mode: AppMode;
  runDisabled: boolean;
  onClickRun: () => void;
  onClickEdit: () => void;
}

const RunOrEditButton = ({
  mode,
  runDisabled,
  onClickRun,
  onClickEdit,
}: RunOrEditButtonProps) => (
  <div>
    {mode === 'editing' || mode === 'running' ? (
      <div className="relative inline-flex m-2">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium transition-colors"
          disabled={runDisabled || mode === 'running'}
          onClick={onClickRun}
        >
          Run
          <Send size={16} />
        </button>
        {mode === 'running' && (
          <Loader2
            size={24}
            className="animate-spin text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
        )}
      </div>
    ) : (
      <button
        className="flex items-center gap-2 m-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
        onClick={onClickEdit}
      >
        Edit
        <Code2 size={16} />
      </button>
    )}
  </div>
);

export default RunOrEditButton;
