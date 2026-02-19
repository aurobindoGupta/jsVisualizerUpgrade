import React, { useState, useRef, useEffect } from 'react';
import { Link2 } from 'lucide-react';

interface ShareButtonProps {
  code: string;
}

const ShareButton = ({ code }: ShareButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const url = new URL(window.location.href);
  url.searchParams.set('code', btoa(code));

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.scrollLeft = 0;
    }
  };

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center gap-2 m-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md text-sm font-medium transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        Share
        <Link2 size={16} />
      </button>

      {open && (
        <>
          {/* Click-outside overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full mt-2 w-[38rem] z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <input
              ref={inputRef}
              type="text"
              className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm font-mono bg-gray-50 focus:outline-none"
              value={url.toString()}
              readOnly
              onFocus={handleFocus}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
