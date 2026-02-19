import React from 'react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { X } from 'lucide-react';
import type { VisiblePanels } from '../types';

interface DrawerProps {
  open: boolean;
  visiblePanels: VisiblePanels;
  onChange: (panel: keyof VisiblePanels) => () => void;
  onClose: () => void;
}

const PANELS: { key: keyof VisiblePanels; label: string }[] = [
  { key: 'taskQueue', label: 'Task Queue' },
  { key: 'microtaskQueue', label: 'Microtask Queue' },
  { key: 'callStack', label: 'Call Stack' },
  { key: 'eventLoop', label: 'Event Loop' },
];

const Drawer = ({ open, visiblePanels, onChange, onClose }: DrawerProps) => (
  <Dialog open={open} onClose={onClose} className="relative z-30">
    <DialogBackdrop className="fixed inset-0 bg-black/30" />
    <div className="fixed inset-0 flex">
      <DialogPanel className="relative flex flex-col w-64 bg-white shadow-xl p-6 overflow-y-auto">
        <button
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100 transition-colors"
          onClick={onClose}
          aria-label="Close drawer"
        >
          <X size={18} />
        </button>

        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Visible Panels
        </p>

        <div className="flex flex-col gap-3">
          {PANELS.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
                checked={visiblePanels[key]}
                onChange={onChange(key)}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

export default Drawer;
