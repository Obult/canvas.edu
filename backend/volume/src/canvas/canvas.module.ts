import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { IdentityModule } from 'src/identity/identity.module';
import { PixelModule } from 'src/pxl/pixel.module';
import { UserModule } from 'src/user/user.module';
import { CanvasController } from './canvas.controller';
import { CanvasGateway } from './canvas.gateway';

@Module({
  imports: [IdentityModule, UserModule, PixelModule, AuthModule],
  controllers: [CanvasController],
  providers: [CanvasGateway],
  exports: [CanvasGateway],
})
export class CanvasModule {}
