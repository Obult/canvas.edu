import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaUserService } from '/src/user/user.service';

@Injectable
export class IdentityService {
  private const userService: PrismaUserService;
  exampleMethod(request: Request) {
    const originalIP = request.headers['x-real-ip'] || request.connection.remoteAddress;
    return this.userService.getUserByIp(originalIP);
  }
}
