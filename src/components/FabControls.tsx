import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, FastForward, Pause, StopCircle } from 'lucide-react';

interface FabControlsProps {
  visible: boolean;
  isAutoPlaying: boolean;
  hasReachedEnd: boolean;
  onClickStep: () => boolean;
  onClickPauseAutoStep: () => void;
  onClickResume: () => void;
  onClickStop: () => void;
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
  onClickPauseAutoStep,
  onClickResume,
  onClickStop,
}: FabControlsProps) => (
  <div className="fixed bottom-5 right-5 flex flex-col items-end gap-2">
    <AnimatePresence>
      {/* Pause — shown while auto-playing */}
      {visible && isAutoPlaying && (
        <motion.button
          key="pause"
          variants={fabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-label="Pause"
          title="Pause auto-play"
          className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg flex items-center justify-center transition-colors cursor-pointer"
          onClick={onClickPauseAutoStep}
        >
          <Pause size={22} />
        </motion.button>
      )}

      {/* Resume — shown when paused and not at end */}
      {visible && !isAutoPlaying && !hasReachedEnd && (
        <motion.button
          key="resume"
          variants={fabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-label="Resume"
          title="Resume auto-play"
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-colors cursor-pointer"
          onClick={onClickResume}
        >
          <FastForward size={22} />
        </motion.button>
      )}

      {/* Step — shown when paused */}
      {visible && !isAutoPlaying && (
        <motion.button
          key="step"
          variants={fabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-label="Step"
          title="Step"
          disabled={hasReachedEnd}
          className="flex items-center gap-2 px-5 h-14 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white shadow-lg font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed"
          onClick={onClickStep}
        >
          <Play size={20} />
          Step
        </motion.button>
      )}

      {/* Stop — always shown while visualizing */}
      {visible && (
        <motion.button
          key="stop"
          variants={fabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-label="Stop"
          title="Stop and return to editor"
          className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg flex items-center justify-center transition-colors cursor-pointer"
          onClick={onClickStop}
        >
          <StopCircle size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  </div>
);

export default FabControls;
