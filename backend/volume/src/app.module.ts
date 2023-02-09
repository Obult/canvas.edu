import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CanvasModule } from './canvas/canvas.module';
import { EventModule } from './event/event.module';
import { GatewayModule } from './gateway/gateway.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

// import only the modules which provide the controllers

@Module({
  imports: [PrismaModule, UserModule, GatewayModule, EventModule, CanvasModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
