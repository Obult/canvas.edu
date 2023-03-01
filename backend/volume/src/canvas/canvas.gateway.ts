import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { imageDataDto } from './dto/imageDataDto';
import { PxlDataDto, RGBA } from './dto/pixelDataDto';

function modifyRegion(data: Uint8ClampedArray, regionStart: number, newValues: [number, number, number, number]) {
  for (let i = 0; i < 4; i++) {
    data[regionStart + i] = newValues[i];
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
    height: 200,
    width: 200,
    data: new Uint8ClampedArray(200 * 200 * 4)
  };
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('canvas-init', this.canvas)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // api call resolver
  paintToCanvas(add: imageDataDto) {
    modifyRegion(this.canvas.data, (add.height * this.canvas.width + add.width) * 4, [Number(add.data[0]), Number(add.data[1]), Number(add.data[2]), Number(add.data[3])]);
    this.server.emit('canvas-update', add);
  }

  getPxlData(x: number, y: number) {
    const dataStartLocation = (y * this.canvas.width + x) * 4;
    return (new PxlDataDto(x, y, new RGBA(this.canvas.data.slice(dataStartLocation, dataStartLocation + 4))));
  }
}
