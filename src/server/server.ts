/* eslint-disable max-len */
import * as net from 'net';
import chalk from 'chalk';
import {MessageEventEmitterServer} from './eventEmitterServer';
import * as ntFunc from '../note/note-functions';

export class Server {
  constructor(private port: number) {}

  active() {
    net.createServer((connection) => {
      console.log(chalk.green('A client has connected.'));

      connection.on('close', () => {
        console.log(chalk.green('A client has disconnected.'));
      });

      const server = new MessageEventEmitterServer(connection);

      server.on('request', (message) => {
        console.log(chalk.green('Receiving request...'));
        const response = this.handlerRequest(message);
        const json = {type: 'response', response: response};
        connection.write(JSON.stringify(json) + '\n', (err) => {
          if (err) {
            console.log(chalk.red('Error sending response'));
          } else {
            console.log(chalk.green('Sending response...'));
          }
        });
      });
    }).listen(this.port, () => {
      console.log(chalk.green('Waiting for clients to connect.'));
    });
  }

  private handlerRequest(message: any): string {
    let response: string = '';
    if (message.type == 'add') {
      response = ntFunc.add(message.user, message.title, message.body, message.color);
    } else if (message.type = 'modify') {
      response = ntFunc.modify(message.user, message.title, message.newTitle, message.body, message.color);
    } else if (message.type = 'remove') {
      response = ntFunc.remove(message.user, message.title);
    } else if (message.type = 'read') {
      response = ntFunc.read(message.user, message.title);
    } else if (message.type = 'list') {
      response = ntFunc.list(message.user);
    } else if (message.type = undefined) {
      response = chalk.red('Error: Undefined command');
    }
    return response;
  }
}

const server = new Server(60300);
server.active();
