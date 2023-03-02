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
import { PrismaPixelService } from 'src/pxl/pixel.service';
import { IdentityService } from 'src/identity/identity.service';

// extracting real Ip as forwarded in header by nginx config
function extractRealIp(request: Request) : string {
  const realIp = request.headers['x-real-ip'];
  return typeof realIp === 'string' ? realIp : realIp[0];
}

@Controller('canvas')
export class CanvasController {
  constructor(
    private readonly canvasGate: CanvasGateway,
    private readonly userService: PrismaUserService,
    private readonly pixelService: PrismaPixelService,
    private readonly identityService: IdentityService,
    ) {}

  async addPxlToDatabase(request: Request, data: imageDataDto) {
    const realIp = extractRealIp(request);

    // if user does not exists it will be created with 'unknown' as name
    const user = await this.userService.getOrCreateUser(realIp, 'unknown');

    this.pixelService.createPixel({
      location: [data.width, data.height],
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
    var tmpData = new Uint8ClampedArray(pxlData.data);
    if (tmpData.length != 4)
    {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'colordata is incorrect',
      }, HttpStatus.BAD_REQUEST, {});
    }

    // check cooldown here? && getorcreateuser before?

    if (await this.identityService.isNotTimedOut(request, 1000))

    this.addPxlToDatabase(request, pxlData);
    return this.canvasGate.paintToCanvas(pxlData);
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
  @Get('everyPixel')
  async getAllPixels()  {
    return this.pixelService.Pixels({});
  }
}