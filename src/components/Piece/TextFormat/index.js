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
 * TextFormat
 * Remove first and last character
 */
// eslint-disable-next-line react/prop-types
const create = (style, pattern) => ({ children }) => {
  const [, before, format] = pattern.exec(children);

  // Text
  const text = format.slice(1).slice(0, -1);

  // View
  return (
    <span>
      {before && <Character>{before}</Character>}
      <span style={style}>
        <Format>{text}</Format>
      </span>
    </span>
  );
};

/*
 * Export
 */
export const Bold = create({ fontWeight: 700 }, patternBold);
export const Italic = create({ fontStyle: 'italic' }, patternItalic);
export const Strike = create({ textDecoration: 'line-through' }, patternStrike);
