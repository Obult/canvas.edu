import { io, Socket } from 'socket.io-client';

class SocketioService {
  socket: Socket;
  constructor() {
    this.socket = io('http://pixels.codam.nl:3000');
  }

  setupSocketConnection() {
    this.socket = io('http://pixels.codam.nl:3000');
  }
}

export default new SocketioService();