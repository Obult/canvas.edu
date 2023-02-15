import { Module } from '@nestjs/common';
import { CanvasController } from './canvas.controller';
import { CanvasGateway } from './canvas.gateway';

@Module({
  controllers: [CanvasController],
  providers: [CanvasGateway],
})
export class CanvasModule {}
