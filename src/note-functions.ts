/* eslint-disable max-len */
import chalk from 'chalk';
import fs from 'fs';
const colorRegister = ['red', 'yellow', 'green', 'blue'];

export function printWithColor(print: string, color: string) {
  switch (color) {
    case 'red': {
      console.log(chalk.red(print));
      break;
    }
    case 'yellow': {
      console.log(chalk.yellow(print));
      break;
    }
    case 'blue': {
      console.log(chalk.blue(print));
      break;
    }
    case 'green': {
      console.log(chalk.green(print));
      break;
    }
    default: {
      console.log(chalk.red('Error: Unrecognizable color'));
    }
  }
}

export function add(userParam: string, titleParam: string, bodyParam: string, colorParam: string) {
  if (!fs.existsSync(`./fileSystem/${userParam}`)) {
    fs.mkdirSync(`./fileSystem/${userParam}/`, {recursive: true});
  }

  const obj = {
    title: 'empty',
    body: 'empty',
    color: 'empty',
  };

  if ((!fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    if (colorRegister.includes(colorParam)) {
      obj.title = titleParam;
      obj.body = bodyParam;
      obj.color = colorParam;
      const addJson = JSON.stringify(obj);
      fs.writeFile(`./fileSystem/${userParam}/${titleParam}.json`, addJson, (err) => {
        if (err) {
          console.log(chalk.red('Error: Something went wrong when writing note'));
        } else {
          console.log(chalk.green('New note added!'));
        }
      });
    } else {
      console.log(chalk.red('Error: Color not allowed'));
    }
  } else {
    console.log(chalk.red('Error: Note title taken!'));
  }
}

export function modify(userParam: string, titleParam: string, newTitle?: string, bodyParam?: string, colorParam?: string) {
  if ((fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    const data = fs.readFileSync(`./fileSystem/${userParam}/${titleParam}.json`, 'utf8');
    const value = JSON.parse(data.toString());
    if (newTitle !== undefined) {
      value.title = newTitle;
      try {
        fs.renameSync(`./fileSystem/${userParam}/${titleParam}.json`, `./fileSystem/${userParam}/${value.title}.json`);
      } catch (err) {
        console.log(chalk.red('Error: Something went wrong when rename note file'));
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
      console.log(chalk.green('The note has been modified!'));
    } catch (err) {
      console.log(chalk.red('Error: Something went wrong when writing note'));
    }
  } else {
    console.log(chalk.red('Error: This note does not exist'));
  }
}

export function remove(userParam: string, titleParam: string) {
  if ((fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    fs.unlink(`./fileSystem/${userParam}/${titleParam}.json`, (err) => {
      if (err) {
        console.log(chalk.red('Error: Something went wrong when remove note'));
      } else {
        console.log(chalk.green('Note removed!'));
      }
    });
  } else {
    console.log(chalk.red('Error: This note does not exist'));
  }
}

export function list(userParam: string) {
  if ((fs.existsSync(`./fileSystem/${userParam}/`))) {
    console.log(chalk.green('Your notes:\n'));
    fs.readdir(`./fileSystem/${userParam}/`, (err, files) => {
      if (err) {
        console.log(chalk.red('Error: Something went wrong when list note'));
      } else {
        files.forEach((file) => {
          fs.readFile(`./fileSystem/${userParam}/${file}`, (err, data) => {
            if (err) {
              console.log(chalk.red('Error: Something went wrong when read note'));
            } else {
              const value = JSON.parse(data.toString());
              printWithColor(value.title, value.color);
            }
          });
        });
      }
    });
  } else {
    console.log(chalk.red('Error: This user does not exist'));
  }
}

export function read(userParam: string, titleParam: string) {
  if ((fs.existsSync(`./fileSystem/${userParam}/${titleParam}.json`))) {
    fs.readFile(`./fileSystem/${userParam}/${titleParam}.json`, (err, data) => {
      if (err) {
        console.log(chalk.red('Error: Something went wrong when read note'));
      } else {
        const value = JSON.parse(data.toString());
        printWithColor(value.title, value.color);
        printWithColor(value.body, value.color);
      }
    });
  } else {
    console.log(chalk.red('Error: This note does not exist'));
  }
}


