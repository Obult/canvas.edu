import { Module } from '@nestjs/common';
// import { UserModule } from 'src/user/user.module';
import { IdentityService } from './identity.service';

@Module({
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
