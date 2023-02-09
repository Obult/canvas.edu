import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { stringify } from 'querystring';
import { Socket, Server } from 'socket.io';
import { addToQueueDto } from './dto/addToQueue-dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class CanvasGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private canvas: {
    h: number;
    w: number;
    data: Uint8ClampedArray;
  };
  private queue: {
    x: number;
    y: number;
    data: Uint8ClampedArray;
  }[];
  private server: Server;

  afterInit(server: Server) {
    this.server = server
    this.canvas = {
      h: 200,
      w: 200,
      data: new Uint8ClampedArray(200 * 200 * 4),
    }
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('canvas-init', this.canvas)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  addToQueue(add: addToQueueDto) {
    // this.queue.push({
    //   x: add.x,
    //   y: add.y,
    //   data: add.color,
    // })
    this.server.emit('canvas-update', add);
  }

  // @SubscribeMessage('canvas')
  // handleMessage(client: Socket, data: any) {
  //   client.emit('canvas', data);
  // }
}
