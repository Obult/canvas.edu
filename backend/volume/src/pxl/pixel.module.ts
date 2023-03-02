import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaPixelService } from './pixel.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaPixelService],
  exports: [PrismaPixelService],
})
export class PixelModule {}
