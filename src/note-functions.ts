/* eslint-disable max-len */
import chalk from 'chalk';
import fs from 'fs';
export const colorRegister = ['red', 'yellow', 'green', 'blue'];

export function printWithColor(print: string, color: string): string {
  switch (color) {
    case 'red': {
      return chalk.red(print);
    }
    case 'yellow': {
      return chalk.yellow(print);
    }
    case 'blue': {
      return chalk.blue(print);
    }
    case 'green': {
      return chalk.green(print);
    }
    default: {
      return chalk.red('Error: Unrecognizable color');
    }
  }
}

export function add(userParam: string, titleParam: string, bodyParam: string, colorParam: string): string {
  if (!fs.existsSync(`./fileSystem/${userParam}`)) {
    fs.mkdirSync(`./fileSystem/${userParam}/`, {recursive: true});
  }

  const obj = {
    title: 'empty',
    body: 'empty',
    color: 'empty',
  };

  let out:string = '';

  if ((!fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    if (colorRegister.includes(colorParam)) {
      obj.title = titleParam;
      obj.body = bodyParam;
      obj.color = colorParam;
      const addJson = JSON.stringify(obj);
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

export function modify(userParam: string, titleParam: string, newTitle?: string, bodyParam?: string, colorParam?: string): string {
  let out: string;
  if ((fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    const data = fs.readFileSync(`./fileSystem/${userParam}/${titleParam}.json`, 'utf8');
    const value = JSON.parse(data.toString());
    if (newTitle !== undefined) {
      value.title = newTitle;
      try {
        fs.renameSync(`./fileSystem/${userParam}/${titleParam}.json`, `./fileSystem/${userParam}/${value.title}.json`);
      } catch (err) {
        out = chalk.red('Error: Something went wrong when rename note file');
      }
    }
    if (bodyParam !== undefined) {
      value.body = bodyParam;
    }
    if (colorParam !== undefined) {
      value.color = colorParam;
    }
    const addJson = JSON.stringify(value);

    try {
      fs.writeFileSync(`./fileSystem/${userParam}/${value.title}.json`, addJson);
      out = chalk.green('The note has been modified!');
    } catch (err) {
      out = chalk.red('Error: Something went wrong when writing note');
    }
  } else {
    out = chalk.red('Error: This note does not exist');
  }
  return out;
}

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

export function list(userParam: string): string {
  let out: string;
  if ((fs.existsSync(`./fileSystem/${userParam}/`))) {
    out = chalk.green('Your notes:\n');
    try {
      const files = fs.readdirSync(`./fileSystem/${userParam}/`);
      files.forEach((file) => {
        try {
          const data = fs.readFileSync(`./fileSystem/${userParam}/${file}`);
          const value = JSON.parse(data.toString());
          out += printWithColor(value.title, value.color) + '\n';
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

export function read(userParam: string, titleParam: string): string {
  let out: string;
  if ((fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    try {
      const data = fs.readFileSync(`./fileSystem/${userParam}/${titleParam}.json`);
      const value = JSON.parse(data.toString());
      out = printWithColor(value.title, value.color) + '\n';
      out += printWithColor(value.body, value.color);
    } catch (err) {
      out = chalk.red('Error: Something went wrong when read note');
    }
  } else {
    out = chalk.red('Error: This note does not exist');
  }
  return out;
}


