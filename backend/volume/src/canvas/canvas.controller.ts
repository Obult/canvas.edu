import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { CanvasGateway } from './canvas.gateway'
import { addToQueueDto } from './dto/addToQueue-dto';

@Controller('canvas')
export class CanvasController {
  constructor(
    private readonly canvasGate: CanvasGateway,
  ) {}

  @Post('single')
  async addToQueue(@Body() addToQueueDto: addToQueueDto) {
    return this.canvasGate.addToQueue(addToQueueDto);
  }
}