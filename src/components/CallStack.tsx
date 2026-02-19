import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { getPastelForIndex } from '../styles/colors';
import '../styles/index.css';
import CardHeaderWithAbout from './CardHeaderWithAbout';
import type { Frame } from '../types';

interface CallStackProps {
  frames: Frame[];
  onClickAbout: () => void;
}

const CallStack = ({ frames, onClickAbout }: CallStackProps) => (
  <div className="m-2 flex flex-col bg-yellow-400 rounded-lg shadow-sm min-w-[230px] max-w-[230px] flex-1 overflow-hidden">
    <div className="p-2">
      <CardHeaderWithAbout title="Call Stack" onClickAbout={onClickAbout} />
    </div>
    <div className="flex flex-col-reverse flex-1 overflow-y-auto scroll-on-hover-y px-2 pb-2">
      <AnimatePresence>
        {frames.map(({ id, name }, idx) => (
          <motion.div
            key={id}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-[165px] h-[30px] flex items-center justify-center rounded shadow-sm text-sm font-medium my-1 mx-auto"
            style={{ backgroundColor: getPastelForIndex(idx) }}
            aria-label={`Stack frame: ${name}`}
          >
            {name}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);

export default CallStack;
