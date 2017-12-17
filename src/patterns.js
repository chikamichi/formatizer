/*
 * Local Import
 */

// Priorities
import Highlight, { patternHighlight } from 'src/components/Piece/Highlight';
import Code, { patternCode } from 'src/components/Piece/Code';
import Blockquote, { patternBlockquote } from 'src/components/Piece/Blockquote';
import Link, { patternLink } from 'src/components/Piece/Link';
import Mention, { patternMention } from 'src/components/Piece/Mention';

// Text
import TextFormat, { patternTextFormat } from 'src/components/Piece/TextFormat';

// Emoji
import Emoji, { patternColon, patternSmiley } from 'src/components/Piece/Emoji';

// Character
import Character, { patternCharacter } from 'src/components/Piece/Character';

/*
 * Export
 */
export default [
  // Priorities
  {
    pattern: patternHighlight,
    Component: Highlight,
  },
  {
    pattern: patternCode,
    Component: Code,
  },
  {
    pattern: patternBlockquote,
    Component: Blockquote,
  },
  {
    pattern: patternLink,
    Component: Link,
  },
  {
    pattern: patternMention,
    Component: Mention,
  },

  // Emojis
  {
    pattern: patternColon,
    Component: Emoji,
  },
  {
    pattern: patternSmiley,
    Component: Emoji,
  },

  // Text
  {
    pattern: patternTextFormat,
    Component: TextFormat,
  },

  // Character
  {
    pattern: patternCharacter,
    Component: Character,
  },
];