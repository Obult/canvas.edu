import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  Param,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { CanvasGateway } from './canvas.gateway';
import { imageDataDto } from './dto/imageDataDto';
import { PrismaUserService } from 'src/user/user.service';
import { Request } from 'express';
import { PrismaPixelService } from 'src/pxl/pixel.service';
import { IdentityService} from 'src/identity/identity.service';
import { extractRealIp } from 'src/ip/ip.service';
import { AdminService } from 'src/auth/admin.service';
import { PassService } from 'src/auth/password.service';

@Controller('canvas')
export class CanvasController {
  constructor(
    private readonly canvasGate: CanvasGateway,
    private readonly userService: PrismaUserService,
    private readonly pixelService: PrismaPixelService,
    private readonly identityService: IdentityService,
    private readonly adminService: AdminService,
    private readonly passService: PassService,
  ) {}

  async addPxlToDatabase(request: Request, data: imageDataDto) {
    const realIp = extractRealIp(request);

    // if user does not exists it will be created with 'unknown' as name
    // const user = await this.userService.getOrCreateUser(realIp, 'unknown');

    this.pixelService.createPixel({
      location: [data.x, data.y],
      artist: {connect: {
        ip: realIp,
      }},
      color: Array.from(data.data),
    })

    // update the users timestamp
    this.userService.updateUser({
      where: {
        ip: realIp,
      },
      data: {
        stamp: new Date(),  // current date
      }
    })
  }

  async timeoutCheck(request: Request, multiplier?: number)  {
    if (typeof multiplier === 'undefined')
      multiplier = 1;
    const timeoutLeft = await this.identityService.timeOutLeft(request, multiplier * this.adminService.getTimeOut())
    if (timeoutLeft > 0)
    {
      throw new HttpException({
        status: HttpStatus.TOO_MANY_REQUESTS,
        error: timeoutLeft,
      }, HttpStatus.TOO_MANY_REQUESTS, {});
    }
  }

  @Post('single')
  async paintToCanvas(@Body() pxlData: imageDataDto, @Req() request: Request) {
    await this.timeoutCheck(request);

    const tmpData = new Uint8ClampedArray(pxlData.data);
    if (tmpData.length != 4)
    {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'colordata is incorrect',
      }, HttpStatus.BAD_REQUEST, {});
    }

    if (pxlData.x < 0 || pxlData.y < 0 || pxlData.x > 199 || pxlData.y > 199) // magic (bound checking should be based on canvas size)
    {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'out of bound',
      }, HttpStatus.BAD_REQUEST, {});
    }

    const user = await this.userService.getOrCreateUser(extractRealIp(request), 'unknown');
    this.addPxlToDatabase(request, pxlData);
    return this.canvasGate.paintToCanvas(pxlData);
  }

  @Post('multiple')
  async multiToCanvas(@Body() pxlDataArr: imageDataDto[], @Req() request: Request) {
    await this.timeoutCheck(request, pxlDataArr.length);
    const user = await this.userService.getOrCreateUser(extractRealIp(request), 'unknown');
    
    pxlDataArr.forEach((pxl) => {
      const tmpData = new Uint8ClampedArray(pxl.data);
      if (tmpData.length != 4 || pxl.x < 0 || pxl.y < 0 || pxl.x > 199 || pxl.y > 199)
        return ;
      this.addPxlToDatabase(request, pxl);
      this.canvasGate.paintToCanvas(pxl);
    });
    return 0;
  }

  @Post('nameUser/:name')
  async nameUser(@Param('name') username: string, @Req() request: Request) {
    await this.timeoutCheck(request);
    const realIp = extractRealIp(request);
    return await this.userService.updateOrCreateUser(realIp, username);
  }

  @Post('playback')
  async playbackFromDatabase(@Req() request: Request, @Param('code') code: string) {
    if (!this.passService.checkCode(code))
      throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'invalid code' }, HttpStatus.FORBIDDEN);
    const pxlData = await this.pixelService.Pixels({
      orderBy: {
      stamp: "asc",
      },
    });
    this.canvasGate.playBack(pxlData);
  }

  @Get('coordinates')
  async findPxlData(@Query('x') x: number, @Query('y') y: number, @Req() request: Request) {
    await this.timeoutCheck(request);
    return this.pixelService.findCurrentPxl(x, y);
  }

  @Get('myPixels')
  async getMyPixels(@Req() request: Request)  {
    await this.timeoutCheck(request)
    const realIp = extractRealIp(request);
    const user = await this.userService.getOrCreateUser(realIp, 'unknown');
    return this.pixelService.Pixels({
      where: {
        artist: user,
      },
    })
  }

  // get all pixels and return them to requester, only meant for total replay!!
  @Get('allPixels')
  async getAllPixels(@Req() request: Request)  {
    await this.timeoutCheck(request, 5);  // magic add to config later to prevent spam
    return this.pixelService.Pixels({});
  }
}