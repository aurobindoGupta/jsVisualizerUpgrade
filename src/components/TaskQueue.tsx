import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { pastels } from '../styles/colors';
import '../styles/index.css';
import CardHeaderWithAbout from './CardHeaderWithAbout';
import type { Task, Microtask } from '../types';

interface TaskQueueProps {
  title: string;
  tasks: (Task | Microtask)[];
  onClickAbout: () => void;
  color?: string;
}

const TaskQueue = ({ title, tasks, onClickAbout, color = 'bg-yellow-400' }: TaskQueueProps) => (
  <div className={`m-2 flex flex-col ${color} rounded-lg shadow-sm h-[120px] max-h-[140px] overflow-hidden`}>
    <div className="px-2 pt-2">
      <CardHeaderWithAbout
        title={title}
        onClickAbout={onClickAbout}
        slideButtonLeft
      />
    </div>
    <div className="flex flex-row flex-1 overflow-x-auto scroll-on-hover-x px-2 pb-2">
      <AnimatePresence mode="popLayout">
        {tasks.map(({ id, name }, idx) => (
          <motion.div
            key={id}
            initial={{ x: 200, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="inline-flex items-center justify-center min-w-[125px] px-2 py-1 m-1 rounded shadow-sm text-sm font-medium shrink-0"
            style={{ backgroundColor: pastels[idx % pastels.length] }}
          >
            {name}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);

export default TaskQueue;
