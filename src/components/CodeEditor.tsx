import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/ext-language_tools';

import '../styles/colors.css';
import { getPastelIndexFor } from '../styles/colors';
import type { CodeMarker } from '../types';

const convertCodeIndexToRowCol = (
  code: string,
  index: number
): { row: number; col: number } => {
  let col = 0;
  let row = 0;
  let head = 0;
  while (head < index) {
    col += 1;
    if (code[head - 1] === '\n') {
      row += 1;
      col = 1;
    }
    head += 1;
    if (head >= code.length) {
      throw new Error(`head=${head}, code.length=${code.length}`);
    }
  }
  if (code[head - 1] === '\n') {
    row += 1;
    col = 0;
  }
  return { row, col };
};

interface CodeEditorProps {
  code?: string;
  markers?: CodeMarker[];
  onChangeCode?: (code: string) => void;
  locked?: boolean;
}

const CodeEditor = ({
  code = '',
  markers = [],
  onChangeCode,
  locked = false,
}: CodeEditorProps) => (
  <div className="m-2 p-2 bg-yellow-400 rounded-lg flex flex-1 shadow-sm overflow-hidden">
    <AceEditor
      style={{
        width: '100%',
        height: '100%',
        marginLeft: -8,
        marginRight: -8,
      }}
      readOnly={locked}
      value={code}
      mode="javascript"
      theme="solarized_light"
      onChange={onChangeCode}
      name="code-editor"
      fontSize={16}
      tabSize={2}
      markers={markers.map(({ start, end }, idx) => ({
        startRow: convertCodeIndexToRowCol(code, start).row,
        startCol: convertCodeIndexToRowCol(code, start).col,
        endRow: convertCodeIndexToRowCol(code, end).row,
        endCol: convertCodeIndexToRowCol(code, end).col,
        className: `active-function-marker${getPastelIndexFor(idx)}`,
        type: 'text' as const,
      }))}
      showGutter
      highlightActiveLine={!locked}
      editorProps={{ $blockScrolling: Infinity, useWorker: false }}
      focus
    />
  </div>
);

export default CodeEditor;
