import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FFEB3B',
        secondary: '#2196F3',
      },
    },
  },
  plugins: [],
};

export default config;
