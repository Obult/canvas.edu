import {
  Controller,
  Post,
  Query,
} from '@nestjs/common';
// import { CanvasGateway } from 'src/canvas/canvas.gateway';
import { AdminService } from './admin.service';
import { PassService } from './password.service';

@Controller('admin')
export class AdminController {
  
  constructor(
    private readonly passService: PassService,
    private readonly adminService: AdminService,
    // private readonly canvasGate: CanvasGateway,
  ) {
    // this.adminService = new AdminService;
  }

  @Post('timeout')
  changeTimeout(@Query('time') timeout: number, @Query('code') code: string) {
    if (this.passService.checkCode(code) == false)
      return ;
    this.adminService.setTimeout(timeout);
    console.log('timeout set to: ', timeout);
  }

  // start repaly event of all changes in the database
  // @Post('replay')
  // startReplay(@Query('code') code: string) {
  //   if (this.passService.checkCode(code) == false)
  //     return ;
  //   // startReplay
  // }

 }