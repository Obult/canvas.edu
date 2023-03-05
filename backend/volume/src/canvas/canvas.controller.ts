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

@Controller('canvas')
export class CanvasController {
  constructor(
    private readonly canvasGate: CanvasGateway,
    private readonly userService: PrismaUserService,
    private readonly pixelService: PrismaPixelService,
    private readonly identityService: IdentityService,
    private readonly adminService: AdminService,
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

  @Post('single')
  async paintToCanvas(@Body() pxlData: imageDataDto, @Req() request: Request) {
    const tmpData = new Uint8ClampedArray(pxlData.data);
    if (tmpData.length != 4)
    {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'colordata is incorrect',
      }, HttpStatus.BAD_REQUEST, {});
    }

    // 
    const timeoutLeft = await this.identityService.timeOutLeft(request, this.adminService.getTimeOut())
    if (timeoutLeft > 0)
    {
      throw new HttpException({
        status: HttpStatus.TOO_MANY_REQUESTS,
        error: timeoutLeft,
      }, HttpStatus.TOO_MANY_REQUESTS, {});
    }

    // console.log('pixel got through');
    const user = await this.userService.getOrCreateUser(extractRealIp(request), 'unknown');
    this.addPxlToDatabase(request, pxlData);
    return this.canvasGate.paintToCanvas(pxlData);
  }

  @Post('multiple')
  async multiToCanvas(@Body() pxlDataArr: imageDataDto[], @Req() request: Request) {
    const timeoutLeft = await this.identityService.timeOutLeft(request, this.adminService.getTimeOut() * pxlDataArr.length)
    if (timeoutLeft > 0)
    {
      throw new HttpException({
        status: HttpStatus.TOO_MANY_REQUESTS,
        error: timeoutLeft,
      }, HttpStatus.TOO_MANY_REQUESTS, {});
    }
    const user = await this.userService.getOrCreateUser(extractRealIp(request), 'unknown');
    
    pxlDataArr.forEach((pxl) => {
      const tmpData = new Uint8ClampedArray(pxl.data);
      if (tmpData.length != 4)
        return ;
      this.addPxlToDatabase(request, pxl);
      this.canvasGate.paintToCanvas(pxl);
    });
    return 0;
  }

  @Post('nameUser/:name')
  async nameUser(@Param('name') username: string, @Req() request: Request) {
    const realIp = extractRealIp(request);
    return await this.userService.updateOrCreateUser(realIp, username);
  }

  @Get('coordinates')
  async findPxlData(@Query('x') x: number, @Query('y') y: number) {
    return this.canvasGate.getPxlData(x, y);
  }

  @Get('myPixels')
  async getMyPixels(@Req() request: Request)  {
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
  async getAllPixels()  {
    return this.pixelService.Pixels({});
  }
}