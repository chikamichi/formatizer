/* eslint-disable no-cond-assign */
/*
 * Package Import
 */
import React from 'react';

/*
 * Local Import
 */
import allReplacements from './replacements';

/*
 * Code
 */

const checkAndMatch = (message, props, repl) => {
  let matches = null;
  let checkedMatch = null;
  while ((matches = repl.pattern.exec(message)) !== null) {
    if (!repl.check || repl.check({ props, match: matches[0] })) {
      checkedMatch = matches;
    }
  }

  return checkedMatch;
};
/* eslint-disable no-use-before-define */
/**
 * Split message into an array for a given pattern
 * @param  {String} message     Message to formatize
 * @param  {Object} pattern     Pattern to search for
 * @param  {Function} check     Additionnal checking function (optionnal)
 * @param  {Function} Component Component to insert
 * @param  {Object} props       User land props
 * @return {Array}              Array of fragments (string or React element)
 */
const splitMessage = ({ message, Component, props, winnerMatch }) => {
  const subFragments = [];

  const indexBegin = winnerMatch.index;
  const indexEnd = indexBegin + winnerMatch[0].length;
  const messageBegin = message.slice(0, indexBegin);
  const messageEnd = message.slice(indexEnd);

  // Begin
  if (messageBegin !== '') {
    subFragments.push(messageBegin);
  }

  // Fragment
  subFragments.push(<Component {...props}>{winnerMatch[0]}</Component>);

  // End
  if (messageEnd !== '') {
    subFragments.push(messageEnd);
  }

  return subFragments;
};

/**
 * Transform a string into array of fragments for a given replacement
 * @param  {String} message           Message to formatize
 * @param  {Array|Object} replacement Replacement
 * @param  {Object} props             User land props
 * @return {Array}                    Array of fragments (string or React element)
 */
const getSubFragments = ({ message, replacement: strOrArray, props }) => {
  const replacement = Array.isArray(strOrArray) ? strOrArray : [strOrArray];

  // Which pattern is going to fire first?
  let winnerRepl;
  let winnerIndex = Infinity;
  let winnerMatch;
  replacement.forEach((repl) => {
    // Never forget to reset lastIndex after a .exec()
    const matches = checkAndMatch(message, props, repl);
    repl.pattern.lastIndex = 0;
    if (
      // Found
      matches &&
      // Valid
      // (!repl.check || repl.check({ props, match: matches[0] })) &&
      // Lower index
      matches.index < winnerIndex
    ) {
      winnerIndex = matches.index;
      winnerRepl = repl;
      winnerMatch = matches;
    }
  });

  // If there is a winner, split baby!
  if (winnerRepl && winnerMatch) {
    const fragments = splitMessage({
      message,
      props,
      winnerMatch,
      ...winnerRepl,
    });

    // After winner, rince and repeat. Until there is no winner!
    return applyReplacement({
      replacement,
      fragments,
      props,
    });
  }

  // No pattern found, nothing to split, just return the message
  return [message];
};

/**
 * Apply a replacement on fragments
 * @param  {Array} fragments          Array of fragments (string or React element)
 * @param  {Array|Object} replacement Replacement
 * @param  {Object} props             User land props
 * @return {Array}                    Array of fragments (string or React element)
 */
const applyReplacement = ({ fragments, replacement, props }) => {
  // Var to collect subfragments
  const subFragments = [];

  // We search in each parts
  fragments.forEach((fragment) => {
    // If this is a string
    if (typeof fragment === 'string') {
      subFragments.push(
        ...getSubFragments({
          message: fragment,
          replacement,
          props,
        }),
      );
    }
    else {
      // If this not a string, this is a already a fragment. Nothing to do.
      subFragments.push(fragment);
    }
  });

  // subFragments is the new fragments :)
  return subFragments;
};

/**
 * Transform a string into array of fragments
 * @param  {String} message Message to formatize
 * @param  {Object} props   User land props
 * @return {Array}          Array of fragments (string or React element)
 */
const getFragments = ({ message, props }) => {
  let fragments = [message];

  // For each replacement
  allReplacements.forEach((replacement) => {
    fragments = applyReplacement({ fragments, replacement, props });
  });

  // Return fragments
  return fragments;
};

/*
 * Export
 */
export default getFragments;
