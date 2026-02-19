import React from 'react';

interface CardHeaderWithAboutProps {
  title: string;
  slideButtonLeft?: boolean;
  onClickAbout: () => void;
}

const CardHeaderWithAbout = ({
  title,
  slideButtonLeft = false,
  onClickAbout,
}: CardHeaderWithAboutProps) => (
  <div className="flex flex-row items-center justify-between p-0">
    <span className="font-semibold text-base px-2">{title}</span>
    <button
      className={`text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors${
        slideButtonLeft ? ' mr-6' : ''
      }`}
      onClick={onClickAbout}
    >
      About
    </button>
  </div>
);

export default CardHeaderWithAbout;
