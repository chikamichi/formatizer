/* eslint-disable max-len */

/*
 * Code
 */
const smileyToColon = {
  '8)': ':sunglasses:',
  '8-)': ':sunglasses:',
  ':|': ':neutral_face:',
  ':-|': ':neutral_face:',
  '=)': ':grinning:',
  '=-)': ':grinning:',
  ';)': ':wink:',
  ';-)': ':wink:',
  ':>': ':laughing:',
  ':->': ':laughing:',
  '>:(': ':angry:',
  '>:-(': ':angry:',
  ':)': ':slightly_smiling_face:',
  ':-)': ':slightly_smiling_face:',
  ':(': ':disappointed:',
  ':-(': ':disappointed:',
  ':/': ':confused:',
  ':-/': ':confused:',
  ':\\': ':confused:',
  ':-\\': ':confused:',
  ':o)': ':monkey_face:',
  'D:': ':fearful:',
  ':d': ':grin:',
  ':-d': ':grin:',
  ':D': ':grin:',
  ':-D': ':grin:',
  ':o': ':open_mouth:',
  ':-o': ':open_mouth:',
  ':O': ':open_mouth:',
  ':-O': ':open_mouth:',
  ':x': ':no_mouth:',
  ':-x': ':no_mouth:',
  ':X': ':no_mouth:',
  ':-X': ':no_mouth:',
  ':p': ':yum:',
  ':-p': ':yum:',
  ':P': ':yum:',
  ':-P': ':yum:',
  ':*': ':kiss:',
  ':-*': ':kiss:',
  ":'(": ':cry:',
};

export const smileyReplace = smiley => smileyToColon[smiley];

export const smileyStr =
  "(8-?\\)|:-?\\||:o\\)|=-?\\)|;-?\\)|:-?>|>:-?\\(|:-?\\)|:-?\\(|:-?\\/|:-?\\\\|D:|:-?d|:-?o|:-?x|:-?p|:-?\\*|:'\\()";
