/* eslint-disable max-len */
import * as net from 'net';
import chalk from 'chalk';
import {RequestType} from '../types/request';
import {MessageEventEmitterClient} from './eventEmitterClient';

export class Client {
  private clientSocket: net.Socket;
  constructor(private port: number, private input: RequestType) {
    this.clientSocket = new net.Socket();
  }

  active() {
    const clientEvent = new MessageEventEmitterClient(this.clientSocket, this.port);

    clientEvent.on('request', () => {
      console.log(chalk.green('Establishing connection...'));
      this.clientSocket.write(JSON.stringify(this.input) + '\n', (err) => {
        if (err) {
          console.error(chalk.red('Error on sending request'));
        } else {
          console.log(chalk.green('Sending request...'));
        }
      });
    });

    clientEvent.on('response', (message) => {
      console.log(chalk.green('Receiving response...'));
      console.log(message.response);
      this.clientSocket.end();
    });

    this.clientSocket.on('close', (err) => {
      if (err) {
        console.log(chalk.red('Error: In closing client socket'));
      } else {
        console.log(chalk.green('Closing client socket...'));
      }
    });
  }
}
