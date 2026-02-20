import React from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  learnMoreHref: string;
  learnMoreLabel: string;
  children: React.ReactNode;
}

const InfoDialog = ({
  open,
  onClose,
  title,
  learnMoreHref,
  learnMoreLabel,
  children,
}: InfoDialogProps) => (
  <Dialog open={open} onClose={onClose} className="relative z-50">
    <DialogBackdrop className="fixed inset-0 bg-black/50" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 overflow-hidden">
        <div className="px-6 pt-6 pb-2">
          <DialogTitle className="text-lg font-bold mb-1">{title}</DialogTitle>
        </div>

        <div className="px-6 pb-4 max-h-80 overflow-y-auto text-sm text-gray-700 space-y-3">
          {children}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <a
            className="text-blue-500 hover:underline text-sm ml-2"
            href={learnMoreHref}
            target="_blank"
            rel="noreferrer"
          >
            {learnMoreLabel}
          </a>
          <button
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
            onClick={onClose}
          >
            Ok
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

export default InfoDialog;
