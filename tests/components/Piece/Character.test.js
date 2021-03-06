/*
 * Package Import
 */
import React from 'react';
import { should } from 'chai';
import { mount } from 'enzyme';

/*
 * Local Import
 */
import { Formatizer } from 'src';
import Character from 'src/components/Piece/Character';

/*
 * Code
 */
should();

/*
 * Tests
 */
describe('** src/components/Piece/Character.js **', () => {
  it('should format \\n in <Character />', () => {
    const message = '\n';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Character).should.have.length(1);
  });

  it('should format multiple \\n in <Character />', () => {
    let message = '\n\n';
    let wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Character).should.have.length(1);

    message = '\n\n\n\n\n';
    wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Character).should.have.length(1);
  });

  it('should format \\n with a <br />', () => {
    const message = '\n';
    const wrapper = mount(<Character>{message}</Character>);
    wrapper.find('br').should.have.length(1);
  });

  it('should format multiple \\n with a two <br />', () => {
    let message = '\n\n';
    let wrapper = mount(<Character>{message}</Character>);
    wrapper.find('br').should.have.length(2);

    message = '\n\n\n\n\n';
    wrapper = mount(<Character>{message}</Character>);
    wrapper.find('br').should.have.length(2);
  });
});
