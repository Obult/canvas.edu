import { Module } from '@nestjs/common';
import { IdentityModule } from 'src/identity/identity.module';
import { UserModule } from 'src/user/user.module';
import { CanvasController } from './canvas.controller';
import { CanvasGateway } from './canvas.gateway';

@Module({
  imports: [IdentityModule, UserModule],
  controllers: [CanvasController],
  providers: [CanvasGateway],
})
export class CanvasModule {}
