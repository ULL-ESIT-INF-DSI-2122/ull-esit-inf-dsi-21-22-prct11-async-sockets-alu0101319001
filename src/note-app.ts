import * as yargs from 'yargs';
import {add, list, remove, read, modify} from './note-functions';

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
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string') &&
    (typeof argv.body === 'string') && (typeof argv.color === 'string')) {
      console.log(add(argv.user, argv.title, argv.body, argv.color));
    }
  },
});

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
        color = argv.color;
      } else {
        color = undefined;
      }
      console.log(modify(argv.user, argv.title, newTitle, body, color));
    }
  },
});

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
      console.log(remove(argv.user, argv.title));
    }
  },
});

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
      console.log(list(argv.user));
    }
  },
});

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
      console.log(read(argv.user, argv.title));
    }
  },
});

yargs.parse();
