import * as net from 'net';
import {EventEmitter} from 'events';

export class MessageEventEmitterServer extends EventEmitter {
  constructor(connection: net.Socket) {
    super();

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('request', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}
