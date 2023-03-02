import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaUserService } from 'src/user/user.service';
import { User } from '@prisma/client'


@Injectable()
export class IdentityService {
  private userService: PrismaUserService;
  
  requestUser(request: Request): Promise<User> {
    const originalIP = request.headers['x-real-ip'];
    return this.userService.getUserByIp(originalIP[0]);
  }

  async isNotTimedOut(request: Request | User, timeoutInMilliSec: number): Promise<boolean> {
    if (timeoutInMilliSec == 0) // optimization for zero timeout
      return true;

    if (request instanceof Request) {
      const req = request as Request;
      const user = await this.requestUser(req);
      return (user.stamp.getTime() + timeoutInMilliSec >= Date.now());
    }
    const user = request as User;
    return (user.stamp.getTime() + timeoutInMilliSec >= Date.now());
  }

}
