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
import Link from 'src/components/Piece/Link';
import Emoji from 'src/components/Piece/Emoji';

/*
 * Code
 */
should();

/*
 * Tests
 */
describe('** src/components/Piece/Link.js **', () => {
  it('should add <Link /> for a Link', () => {
    // https
    let message = 'Bonjour, https://oclock.io';
    let wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);

    // http
    message = 'Bonjour, http://oclock.io';
    wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
  });

  it('should add <Link /> for a http://localhost:3000', () => {
    const message = 'Bonjour, http://localhost:3000';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('http://localhost:3000');
  });

  it('should add <Link /> for a http://localhost/site/web/', () => {
    const message = 'Bonjour, http://localhost/site/web/';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('http://localhost/site/web/');
  });

  it('should add <Link /> for a https://username:password@example.com:12345', () => {
    const message = 'Bonjour, https://username:password@example.com:12345';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('https://username:password@example.com:12345');
  });

  it('should not add <Link /> for a http://test/', () => {
    const message = 'Bonjour, http://test/';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(0);
  });

  it('should add <Link /> for a http://127.0.0.1', () => {
    const message = 'Bonjour, http://127.0.0.1';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('http://127.0.0.1');
  });

  it('should add <Link /> for a https://checklist.oclock.io/checklist.php?id=1', () => {
    const message = 'Bonjour, https://checklist.oclock.io/checklist.php?id=1';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('https://checklist.oclock.io/checklist.php?id=1');
  });

  it('should not add <Link /> if link is fail', () => {
    const message = 'Bonjour, http//oclock.io';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(0);
  });

  it('should not add <Emoji /> in <Link />', () => {
    const message = 'Bonjour, https://oclock.io';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper.find(Emoji).should.have.length(0);
  });

  it('should not add last character in <Link /> (Dot)', () => {
    const message = 'Bonjour, https://oclock.io.';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('https://oclock.io');
  });

  it('should not add last character in <Link /> (Space)', () => {
    const message = 'Bonjour, https://oclock.io ';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('https://oclock.io');
  });

  it('should not add last character in <Link /> (Comma)', () => {
    const message = 'https://oclock.io, Bonjour !';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('https://oclock.io');
  });

  it('should not add last character in <Link /> (parenthese)', () => {
    const message = 'Bonjour, https://oclock.io)';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('https://oclock.io');
  });

  it('should not add last character in <Link /> (couple of parenthese)', () => {
    const message = 'Bonjour, https://oclock.io()';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('https://oclock.io');
  });

  it('should not add <Emoji /> in <Link />', () => {
    const message = 'http://:sunglasses:.com';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper.find(Emoji).should.have.length(0);
  });

  it("should add <Link /> on url in '(url)'", () => {
    const message = 'Allez voir mon site (https://oclock.io) !';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal('https://oclock.io');
  });

  it('should display many <Link />', () => {
    const message = 'Site 1(https://oclock.io), site 2 http://localhost:3000.';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(2);
  });

  it('should add <Link /> in url with a comma', () => {
    const message =
      'https://en.wikibooks.org/wiki/MySQL/Language/Definitions:_what_are_DDL,_DML_and_DQL%3F';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal(message);
  });

  it('should add <Link /> without comma or point at the end', () => {
    const message = 'https://github.com/O-clock-Dev/formatizer';
    let wrapper = mount(<Formatizer>{message},</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal(message);

    wrapper = mount(<Formatizer>{message}.</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal(message);
  });

  it('should add <Link /> with atom teletype link', () => {
    const message =
      'atom://teletype/portal/c962cbc5-8fab-40ca-be3d-ed43ee9ca7d3';
    const wrapper = mount(<Formatizer>{message}</Formatizer>);
    wrapper.find(Link).should.have.length(1);
    wrapper
      .find('a')
      .props()
      .should.have.a.property('href')
      .which.is.equal(message);
  });
});
