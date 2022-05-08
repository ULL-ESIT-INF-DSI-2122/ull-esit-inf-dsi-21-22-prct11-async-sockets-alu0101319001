/* eslint-disable max-len */
import chalk from 'chalk';
import fs from 'fs';
import {Color, translateColor, printWithColor} from '../types/color';
import {Note} from './note-class';


/**
 * Add a note
 * @param userParam Active user
 * @param titleParam Title of note
 * @param bodyParam Body of note
 * @param colorParam Color of note
 * @returns The status message
 */
export function add(userParam: string, titleParam: string, bodyParam: string, colorParam: string): string {
  if (!fs.existsSync(`./fileSystem/${userParam}`)) {
    fs.mkdirSync(`./fileSystem/${userParam}/`, {recursive: true});
  }

  let out:string = '';
  const colorValue: Color = translateColor(colorParam);

  if ((!fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    if (colorValue != undefined) {
      const newNote = new Note(titleParam, bodyParam, colorValue);
      const addJson = newNote.getNoteString();
      try {
        fs.writeFileSync(`./fileSystem/${userParam}/${titleParam}.json`, addJson);
        out = chalk.green('New note added!');
      } catch (err) {
        out = chalk.red('Error: Something went wrong when writing note');
      }
    } else {
      out = chalk.red('Error: Color not allowed');
    }
  } else {
    out = chalk.red('Error: Note title taken!');
  }
  return out;
}

/**
 * Modify a note
 * @param userParam Active user
 * @param titleParam Title of note to modify
 * @param newTitle New title of the note
 * @param bodyParam New body of the note
 * @param colorParam New color of the note
 * @returns The status message
 */
export function modify(userParam: string, titleParam: string, newTitle?: string, bodyParam?: string, colorParam?: string): string {
  let out: string;
  const modifyNote = new Note('empty', 'empty', undefined);
  if ((fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    const data = fs.readFileSync(`./fileSystem/${userParam}/${titleParam}.json`, 'utf8');
    modifyNote.setWithString(data.toString());
    if (newTitle !== undefined) {
      modifyNote.setValues(newTitle);
      try {
        fs.renameSync(`./fileSystem/${userParam}/${titleParam}.json`, `./fileSystem/${userParam}/${modifyNote.title}.json`);
      } catch (err) {
        out = chalk.red('Error: Something went wrong when rename note file');
      }
    }
    if (bodyParam !== undefined) {
      modifyNote.setValues(undefined, bodyParam);
    }
    if (colorParam !== undefined) {
      const newColor = translateColor(colorParam);
      modifyNote.setValues(undefined, undefined, newColor);
    }
    const addJson = modifyNote.getNoteString();

    try {
      fs.writeFileSync(`./fileSystem/${userParam}/${modifyNote.title}.json`, addJson);
      out = chalk.green('The note has been modified!');
    } catch (err) {
      out = chalk.red('Error: Something went wrong when writing note');
    }
  } else {
    out = chalk.red('Error: This note does not exist');
  }
  return out;
}

/**
 * Remove a note
 * @param userParam Active user
 * @param titleParam Title of note to remove
 * @returns The status message
 */
export function remove(userParam: string, titleParam: string): string {
  let out: string;
  if ((fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    try {
      fs.unlinkSync(`./fileSystem/${userParam}/${titleParam}.json`);
      out = chalk.green('Note removed!');
    } catch (err) {
      out = chalk.red('Error: Something went wrong when remove note');
    }
  } else {
    out = chalk.red('Error: This note does not exist');
  }
  return out;
}

/**
 * List notes of an user
 * @param userParam Active user
 * @returns The status message
 */
export function list(userParam: string): string {
  let out: string;
  const note = new Note('empty', 'empty', undefined);
  if ((fs.existsSync(`./fileSystem/${userParam}/`))) {
    out = chalk.green('Your notes:\n');
    try {
      const files = fs.readdirSync(`./fileSystem/${userParam}/`);
      files.forEach((file) => {
        try {
          const data = fs.readFileSync(`./fileSystem/${userParam}/${file}`);
          note.setWithString(data.toString());
          out += printWithColor(note.title, note.color) + '\n';
        } catch (err) {
          out = chalk.red('Error: Something went wrong when read note');
        }
      });
    } catch (err) {
      out = chalk.red('Error: Something went wrong when list note');
    }
  } else {
    out = chalk.red('Error: This user does not exist');
  }
  return out;
}

/**
 * Read a note
 * @param userParam Active user
 * @param titleParam Tittle of the note to read
 * @returns The status message
 */
export function read(userParam: string, titleParam: string): string {
  let out: string;
  const note = new Note('empty', 'empty', undefined);
  if ((fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    try {
      const data = fs.readFileSync(`./fileSystem/${userParam}/${titleParam}.json`);
      note.setWithString(data.toString());
      out = printWithColor(note.title, note.color) + '\n';
      out += printWithColor(note.body, note.color);
    } catch (err) {
      out = chalk.red('Error: Something went wrong when read note');
    }
  } else {
    out = chalk.red('Error: This note does not exist');
  }
  return out;
}


