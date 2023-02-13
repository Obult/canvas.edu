import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { imageDataDto } from './dto/addToQueue-dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class CanvasGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private canvas: {
    height: number;
    width: number;
    data: Uint8ClampedArray;
  } = {
    height: 800,
    width: 800,
    data: new Uint8ClampedArray(800 * 800 * 4)
  };
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
    // this.canvas.data = new Uint8ClampedArray(this.canvas.height * this.canvas.width);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('canvas-init', this.canvas)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  paintToCanvas(add: imageDataDto) {
    // this.canvas.paintService(add);

    this.server.emit('canvas-update', add);
  }
}
