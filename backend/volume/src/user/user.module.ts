import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaUserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaUserService],
  exports: [PrismaUserService],
})
export class UserModule {}
