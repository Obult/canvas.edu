import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';

@Module({
  providers: [IdentityService],
})
export class IdentityModule {}
