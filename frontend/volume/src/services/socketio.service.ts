import { io, Socket } from 'socket.io-client';

class SocketioService {
  socket: Socket;
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
  }
}

export default new SocketioService();