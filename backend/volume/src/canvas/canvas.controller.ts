import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  Param,
  HttpStatus,
  HttpException,
  Query
} from '@nestjs/common';
import { CanvasGateway } from './canvas.gateway';
import { imageDataDto } from './dto/imageDataDto';
import { PrismaUserService } from 'src/user/user.service';
import { Request } from 'express';


@Controller('canvas')
export class CanvasController {
  constructor(
    private readonly canvasGate: CanvasGateway,
    private readonly userService: PrismaUserService,
  ) {}

  @Post('single')
  async paintToCanvas(@Body() pxlData: imageDataDto, @Req() request: Request) {
    var tmpData = new Uint8ClampedArray(pxlData.data);
    if (tmpData.length != 4)
    {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'colordata is incorrect',
      }, HttpStatus.BAD_REQUEST, {});
    }

    return this.canvasGate.paintToCanvas(pxlData);
  }

  @Post('nameUser/:name')
  async createNewUser(@Param('name') username: string, @Req() request: Request) {
    const realIp = request.headers['x-real-ip'];
    
    // need to find if the x-real-ip header is a string r array of strings
    if (typeof realIp !== 'string')
      console.log('multiple strings in header');
    let endIp: string = typeof realIp === 'string' ? realIp : realIp[0];
    console.log('ip: ', endIp);
    return await this.userService.updateOrCreateUser(endIp, username);
  }

  @Get('coordinates')
  async findPxlData(@Query('x') x: number, @Query('y') y: number) {
    return this.canvasGate.getPxlData(x, y);
  }
}