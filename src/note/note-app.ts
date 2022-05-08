/* eslint-disable max-len */
import * as yargs from 'yargs';
import {Client} from '../client/client';
import {Color, translateColor} from '../types/color';
import {Command} from '../types/commands';
import {RequestType} from '../types/request';

/**
 * Define the command add
 * Usage:
 * `$node dist/note-app.js add --user="eduardo" --title="Red note" --body="Is a red note" --color="red"`
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string') &&
    (typeof argv.body === 'string') && (typeof argv.color === 'string')) {
      const command: Command = 'add';
      const color: Color = translateColor(argv.color);
      const input : RequestType = {
        type: command,
        user: argv.user,
        title: argv.title,
        newTittle: undefined,
        body: argv.body,
        color: color,
      };
      const client = new Client(60300, input);
      client.active();
    }
  },
});

/**
 * Define the command modify
 * Usage:
 * `$node dist/note-app.js modify --user="eduardo" --title="Red note" --newTitle="redNote" --body="Is a red note" --color="red"`
 */
yargs.command({
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    newTitle: {
      describe: 'New note title',
      demandOption: false,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: false,
      type: 'string',
    },
    color: {
      describe: 'Note title',
      demandOption: false,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
      let newTitle;
      let body;
      let color;
      if (typeof argv.newTitle === 'string') {
        newTitle = argv.newTitle;
      } else {
        newTitle = undefined;
      }
      if (typeof argv.body === 'string') {
        body = argv.body;
      } else {
        body = undefined;
      }
      if (typeof argv.color === 'string') {
        color = translateColor(argv.color);
      } else {
        color = undefined;
      }
      const command: Command = 'modify';
      const input : RequestType = {
        type: command,
        user: argv.user,
        title: argv.title,
        newTittle: newTitle,
        body: body,
        color: color,
      };
      const client = new Client(60300, input);
      client.active();
    }
  },
});

/**
 * Define the command remove
 * Usage:
 * `$node dist/note-app.js remove --user="eduardo" --title="Red note"`
 */
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
      const command: Command = 'remove';
      const input : RequestType = {
        type: command,
        user: argv.user,
        title: argv.title,
        newTittle: undefined,
        body: undefined,
        color: undefined,
      };
      const client = new Client(60300, input);
      client.active();
    }
  },
});

/**
 * Define the command list
 * Usage:
 * `$node dist/note-app.js list --user="eduardo"`
 */
yargs.command({
  command: 'list',
  describe: 'List all notes of a user',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string')) {
      const command: Command = 'list';
      const input : RequestType = {
        type: command,
        user: argv.user,
        title: undefined,
        newTittle: undefined,
        body: undefined,
        color: undefined,
      };
      const client = new Client(60300, input);
      client.active();
    }
  },
});

/**
 * Define the command read
 * Usage:
 * `$node dist/note-app.js read --user="eduardo" --title="Red note"`
 */
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
      const command: Command = 'read';
      const input : RequestType = {
        type: command,
        user: argv.user,
        title: argv.title,
        newTittle: undefined,
        body: undefined,
        color: undefined,
      };
      const client = new Client(60300, input);
      client.active();
    }
  },
});

/**
 * Interpret the commands
 */
yargs.parse();
