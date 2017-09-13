/*
 * Package Import
 */
import React from 'react';
import { PropTypes } from 'prop-types';
// import hljs from 'highlight.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/styles';
import classNames from 'classnames';


/*
 * Local Import
 */


/*
 * Code
 */
const languages = [
  'apache',
  'apacheconf',
  'bash',
  'sh',
  'zsh',
  'css',
  'xml',
  'html',
  'xhtml',
  'rss',
  'atom',
  'xjb',
  'xsd',
  'xsl',
  'plist',
  'ini',
  'json',
  'javascript',
  'js',
  'jsx',
  'less',
  'markdown',
  'md',
  'mkdown',
  'mkd',
  'php',
  'scss',
  'sql',
  'stylus',
  'styl',
  'twig',
];


/*
 * Component
 */
export default class Highlight extends React.Component {
  /*
   * PropTypes
   */
  static propTypes = {
    children: PropTypes.string.isRequired,
    language: PropTypes.oneOf(languages),
  }

  static defaultProps = {
    language: '',
  }


  /*
   * Lifecycles
   */


  /*
   * Ref
   */
  saveNode = (node) => {
    this.node = node;
  }


  /*
   * Render
   */
  render() {
    const attrs = { ...this.props };

    // Children
    delete attrs.children;

    // Language
    // if (attrs.language) {
    //   attrs.className = classNames([
    //     { [attrs.className]: attrs.className },
    //     attrs.language,
    //   ]);
    // }
    // delete attrs.language;

    return (
      <SyntaxHighlighter style={agate} language={attrs.language} ref={this.saveNode} {...attrs}>
        {this.props.children}
      </SyntaxHighlighter>
    );
  }
}
