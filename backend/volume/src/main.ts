import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventGateway } from './event/event.gateway';
import { PrismaService } from './prisma/prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const server = app.getHttpServer();
  app.enableCors( {
    origin: ['*'],
  });
  await app.listen(3000);
}
bootstrap();