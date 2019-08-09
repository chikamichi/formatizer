/*
 * Package Import
 */
import React from 'react';

/*
 * Local Import
 */
import Format from 'src/components/Format';
import Character from 'src/components/Piece/Character';

/*
 * Pattern
 */
export const patternBold = /(\s|^)(\*.+?\*)(?=\s|$)/g;
export const patternItalic = /(\s|^)(_.+?_)(?=\s|$)/g;
export const patternStrike = /(\s|^)(~.+?~)(?=\s|$)/g;

/*
 * Style
 */
const style = {
  bold: {
    fontWeight: 700,
  },
  italic: {
    fontStyle: 'italic',
  },
  strike: {
    textDecoration: 'line-through',
  },
};

/*
 * TextFormat
 * Remove first and last character
 */
// eslint-disable-next-line react/prop-types
const create = (styleObj, pattern) => ({ children }) => {
  const [, before, format] = pattern.exec(children);

  // Text
  const text = format.slice(1).slice(0, -1);

  // View
  return (
    <span>
      {before && <Character>{before}</Character>}
      <span style={styleObj}>
        <Format>{text}</Format>
      </span>
    </span>
  );
};

export const Bold = create(style.bold, patternBold);
export const Italic = create(style.italic, patternItalic);
export const Strike = create(style.strike, patternStrike);
