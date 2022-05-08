import * as net from 'net';
import {EventEmitter} from 'events';

export class MessageEventEmitterClient extends EventEmitter {
  constructor(private connection: net.Socket, private port: number) {
    super();

    this.connection.connect({port: this.port}, () => {
      this.emit('request');
    });

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('response', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}
