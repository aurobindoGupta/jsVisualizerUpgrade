import React, { useEffect, useRef } from 'react';
import type { ConsoleEntry } from '../types';

interface ConsolePanelProps {
  consoleLogs: ConsoleEntry[];
}

const entryClass: Record<ConsoleEntry['type'], string> = {
  log: 'text-gray-300',
  warn: 'text-amber-400',
  error: 'text-red-400',
};

const ConsolePanel = ({ consoleLogs }: ConsolePanelProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  return (
    <div className="mx-2 mb-1 bg-gray-900 rounded-lg shadow-sm overflow-hidden flex flex-col h-[120px]">
      <div className="px-2 py-1 bg-gray-800 text-gray-400 text-xs font-mono font-semibold shrink-0">
        Console
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-1 font-mono text-xs">
        {consoleLogs.length === 0 ? (
          <span className="text-gray-600 italic">Console output will appear here...</span>
        ) : (
          consoleLogs.map((entry, i) => (
            <div key={i} className={`whitespace-pre-wrap leading-5 ${entryClass[entry.type]}`}>
              {'> '}{entry.message}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ConsolePanel;
