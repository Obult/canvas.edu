import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PrismaPixelService } from 'src/pxl/pixel.service';
import { imageDataDto } from './dto/imageDataDto';
import { PxlDataDto, RGBA } from './dto/pixelDataDto';
import { Pixel } from '@prisma/client';

function modifyRegion(data: Uint8ClampedArray, regionStart: number, newValues: [number, number, number, number]) {
  for (let i = 0; i < 4; i++) {
    data[regionStart + i] = newValues[i];
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
  namespace: '/canvas'
})
export class CanvasGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly pixelService: PrismaPixelService,
  ) {}
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

  async loadCanvasFromDB()  {
    const allPixels = await this.pixelService.Pixels({
        orderBy: {
        stamp: "asc",
      },
    });
    allPixels.forEach(pxl => {
      const pixel = {
        x: pxl.location[0],
        y: pxl.location[1],
        data: pxl.color,
      };
      modifyRegion(this.canvas.data, (pixel.y * this.canvas.width + pixel.x) * 4, [Number(pixel.data[0]), Number(pixel.data[1]), Number(pixel.data[2]), Number(pixel.data[3])]);
      this.server.emit('update', pixel);
    });
  }

  async playBack(pixelData: Pixel[]) {
    const pixels = pixelData.map(pixel => ({
      x: pixel.location[0],
      y: pixel.location[1],
      data: pixel.color,
    }))
    for (let i = 0; i < pixels.length / 30; i++)  {
      this.server.emit('multiple-update', pixels.splice(i * 30, i * 30 + 30));
      sleep(400);
    }
  }

  afterInit(server: Server) {
    this.server = server;
    this.loadCanvasFromDB();
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('init', this.canvas)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // api call resolver
  paintToCanvas(add: imageDataDto) {
    modifyRegion(this.canvas.data, (add.y * this.canvas.width + add.x) * 4, [Number(add.data[0]), Number(add.data[1]), Number(add.data[2]), Number(add.data[3])]);
    this.server.emit('update', add);
  }

  // send replay of everything in the database to the screen in chunks
  // without changing the picture in Ram
  // startReplay(allData: imageDataDto[]) {

  // }

  getPxlData(x: number, y: number) {
    const dataStartLocation = (y * this.canvas.width + x) * 4;
    return (new PxlDataDto(x, y, new RGBA(this.canvas.data.slice(dataStartLocation, dataStartLocation + 4))));
  }
}
