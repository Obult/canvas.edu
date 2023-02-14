import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { imageDataDto } from './dto/addToQueue-dto';

// function modifyRegion(data: Uint8ClampedArray, regionStart: number, newValues: [number, number, number, number]) {
//   for (let i = 0; i < 4; i++) {
//     data[regionStart + i] = newValues[i];
//   }
// }

function modifyRegion(data: Uint8ClampedArray, width: number, regionStart: number, newValues: [number, number, number, number]) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        data[regionStart + (i * width * 4) + (j * 4) + k] = newValues[k];
      }
    }
  }
}


@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/canvas'
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
    // change add.data into an number array of 4 and throw it into next function
    // modifyRegion(this.canvas.data, this.canvas.width, add.height * this.canvas.width * 4 + add.width * 4, /* here */);
    this.server.emit('canvas-update', add);
  }
}
