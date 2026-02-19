import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, FastForward, Pause } from 'lucide-react';

interface FabControlsProps {
  visible: boolean;
  isAutoPlaying: boolean;
  hasReachedEnd: boolean;
  onClickStep: () => boolean;
  onClickStepBack: () => void;
  onClickAutoStep: () => void;
  onClickPauseAutoStep: () => void;
}

const fabVariants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
};

const FabControls = ({
  visible,
  isAutoPlaying,
  hasReachedEnd,
  onClickStep,
  onClickAutoStep,
  onClickPauseAutoStep,
}: FabControlsProps) => (
  <div className="fixed bottom-5 right-5 flex flex-col items-end gap-2">
    <AnimatePresence>
      {visible && !isAutoPlaying && (
        <motion.button
          key="auto"
          variants={fabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-label="Auto Step"
          title="Auto Step"
          disabled={hasReachedEnd}
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white shadow-lg flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
          onClick={onClickAutoStep}
        >
          <FastForward size={22} />
        </motion.button>
      )}

      {visible && isAutoPlaying && (
        <motion.button
          key="pause"
          variants={fabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-label="Pause Auto Step"
          title="Pause Auto Step"
          disabled={hasReachedEnd}
          className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-black shadow-lg flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
          onClick={onClickPauseAutoStep}
        >
          <Pause size={22} />
        </motion.button>
      )}

      {visible && (
        <motion.button
          key="step"
          variants={fabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-label="Step"
          title="Step"
          disabled={isAutoPlaying || hasReachedEnd}
          className="flex items-center gap-2 px-5 h-14 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white shadow-lg font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed"
          onClick={onClickStep}
        >
          <Play size={20} />
          Step
        </motion.button>
      )}
    </AnimatePresence>
  </div>
);

export default FabControls;
