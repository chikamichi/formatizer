/*
 * Package Import
 */
import React from 'react';
import { should } from 'chai';
import { mount } from 'enzyme';
import Highlighter from 'react-syntax-highlighter';

/*
 * Local Import
 */
import { Formatizer } from 'src';
import Highlight from 'src/components/Piece/Highlight';

/*
 * Code
 */
should();

/*
 * Tests
 */
describe('** src/components/Piece/Highlight.js **', () => {
  it('Should add <Highlight /> for a Snippet with language', () => {
    const message = 'Bonjour, ```js const a = "je suis un snippet"; ```';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    const component = wrapper.find(Highlight);
    component.should.have.length(1);
    component
      .find(Highlighter)
      .props()
      .should.have.property('language')
      .which.is.equal('js');
  });

  it('Should add <Highlight /> for a Snippet without language', () => {
    const message = 'Bonjour, ``` coucou ```';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    const component = wrapper.find(Highlight);
    component.should.have.length(1);
    component
      .find(Highlighter)
      .props()
      .should.not.have.property('language');
  });

  it('Should manage many snippets and newlines', () => {
    const message = `Bonjour,
      Lorem ipsum
      \`\`\` coucou \`\`\` !
      \`\`\`js
      const variable = "je suis un snippet";
      console.log(variable);
      \`\`\`
    `;
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Highlight).should.have.length(2);
  });
});