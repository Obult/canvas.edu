import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CanvasModule } from './canvas/canvas.module';
import { PrismaModule } from './prisma/prisma.module';


// import only the modules which provide the controllers

@Module({
  imports: [PrismaModule, CanvasModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
