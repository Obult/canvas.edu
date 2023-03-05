import { Module } from '@nestjs/common';
import { CanvasModule } from 'src/canvas/canvas.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PassService } from './password.service';


// import only the modules which provide the controllers

@Module({
  imports: [],
  providers: [PassService, AdminService],
  controllers: [AdminController],
  exports: [AdminService, PassService],
})
export class AuthModule {}
