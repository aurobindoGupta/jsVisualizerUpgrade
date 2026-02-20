import React from 'react';
import JavaScriptLogo from '../assets/js-logo.png';

interface HeaderProps {
  onClickLogo: () => void;
}

const Header = ({ onClickLogo }: HeaderProps) => (
  <div className="flex flex-row items-center">
    <img
      className="w-12 my-1.5 mx-4 cursor-pointer shadow-sm"
      src={JavaScriptLogo}
      alt=""
      onClick={onClickLogo}
    />
    <h1 className="text-2xl font-semibold">JavaScript Visualizer 10000</h1>
  </div>
);

export default Header;
