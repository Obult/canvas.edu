import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
  ) {}
    
  @Get('cat')
  getCat(): string {
    return 'cat';
  }

  @Get()
  getHello(): string {
    return 'pixels.codam.nl/info';
  }
}
