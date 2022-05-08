/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import chalk from 'chalk';
import fs from 'fs';
import {add, list, modify, read, remove} from '../src/note/note-functions';
import {printWithColor} from '../src/types/color';

context('Test of Note Functions', () => {
  describe('Aux functions', () => {
    it('PrintWithColor - Blue', () => {
      expect(printWithColor('print', 'blue')).to.be.eql(chalk.blue('print'));
    });
    it('PrintWithColor - Green', () => {
      expect(printWithColor('print', 'green')).to.be.eql(chalk.green('print'));
    });
    it('PrintWithColor - Yellow', () => {
      expect(printWithColor('print', 'yellow')).to.be.eql(chalk.yellow('print'));
    });
    it('PrintWithColor - Red', () => {
      expect(printWithColor('print', 'red')).to.be.eql(chalk.red('print'));
    });
  });

  describe('Add function', () => {
    it('Add function - User:userTest, Title:redNote, Body:Is a red note, Color:red - Noted added!', () => {
      expect(add('userTest', 'redNote', 'Is a red note', 'red')).to.be.eql(chalk.green('New note added!'));
      const data = fs.readFileSync(`./fileSystem/userTest/redNote.json`, 'utf8');
      const value = JSON.parse(data.toString());
      expect(value.title).to.be.eql('redNote');
      expect(value.body).to.be.eql('Is a red note');
      expect(value.color).to.be.eql('red');
    });
    it('Add function - User:userTest, Title:redNote, Body:Is a red note, Color:red - Error: Note title taken', () => {
      expect(add('userTest', 'redNote', 'Is a red note', 'red')).to.be.eql(chalk.red('Error: Note title taken!'));
    });
    it('Add function - User:userTest, Title:errorNote, Body:Return error, Color:brown - Error: Color not allowed', () => {
      expect(add('userTest', 'errorNote', 'Return error', 'brown')).to.be.eql(chalk.red('Error: Color not allowed'));
    });
  });

  describe('Modify function', () => {
    it('Modify function - User:userTest, Title:redNote, Body:Red turn blue, Color:blue - The note has been modified!', () => {
      expect(modify('userTest', 'redNote', undefined, 'Red turn blue', 'blue')).to.be.eql(chalk.green('The note has been modified!'));
      const data = fs.readFileSync(`./fileSystem/userTest/redNote.json`, 'utf8');
      const value = JSON.parse(data.toString());
      expect(value.title).to.be.eql('redNote');
      expect(value.body).to.be.eql('Red turn blue');
      expect(value.color).to.be.eql('blue');
    });
    it('Modify function - User:userTest, Title:redNote, NewTitle:blueNote - The note has been modified!', () => {
      expect(modify('userTest', 'redNote', 'blueNote', undefined, undefined)).to.be.eql(chalk.green('The note has been modified!'));
      const data = fs.readFileSync(`./fileSystem/userTest/blueNote.json`, 'utf8');
      const value = JSON.parse(data.toString());
      expect(value.title).to.be.eql('blueNote');
      expect(value.body).to.be.eql('Red turn blue');
      expect(value.color).to.be.eql('blue');
    });
    it('Modify function - User:userTest, Title:redNote, NewTitle:blueNote - Error: This note does not exist', () => {
      expect(modify('userTest', 'redNote', 'blueNote', undefined, undefined)).to.be.eql(chalk.red('Error: This note does not exist'));
    });
  });

  describe('List function', () => {
    it('List function - User:userTest - Your notes: blueNote', () => {
      let out: string = chalk.green('Your notes:\n');
      out += chalk.blue('blueNote') + '\n';
      expect(list('userTest')).to.be.eql(out);
    });
    it('List function - User:user - This user does not exist', () => {
      expect(list('user')).to.be.eql(chalk.red('Error: This user does not exist'));
    });
  });

  describe('Read function', () => {
    it('Read function - User:userTest, Title:blueNote - Red turn blue', () => {
      let out = chalk.blue('blueNote') + '\n';
      out += chalk.blue('Red turn blue');
      expect(read('userTest', 'blueNote')).to.be.eql(out);
    });
    it('Read function - User:userTest, Title:redNote - This note does not exist', () => {
      expect(read('userTest', 'readNote')).to.be.eql(chalk.red('Error: This note does not exist'));
    });
  });

  describe('Remove function', () => {
    it('Remove function - User:userTest, Title:blueNote - Note removed!', () => {
      expect(remove('userTest', 'blueNote')).to.be.eql(chalk.green('Note removed!'));
    });
    it('Remove function - User:userTest, Title:blueNote - This note does not exist', () => {
      expect(remove('userTest', 'blueNote')).to.be.eql(chalk.red('Error: This note does not exist'));
      fs.rmdirSync('./fileSystem/userTest');
    });
  });
});
