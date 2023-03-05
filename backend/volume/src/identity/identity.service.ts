import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { extractRealIp } from 'src/ip/ip.service';

@Injectable()
export class IdentityService {
  // Ip as string and Date last edit stamp
  private timeouts = new Map<string, Date>();
  constructor() {

  }

  async timeOutLeft(request: Request, timeoutInMilliSec: number): Promise<number> {
    if (timeoutInMilliSec == 0) // optimization for zero timeout
      return 0;

    const ip = extractRealIp(request);
    if (!this.timeouts.has(ip))  {
      this.timeouts.set(ip, new Date());
      return 0;
    }
    const stamp = this.timeouts.get(ip);
    const timeDiff = Date.now() - stamp.getTime();
    const timeLeft = timeoutInMilliSec - timeDiff;
    if (timeLeft <= 0){
      this.timeouts.set(ip, new Date());
      return 0;
    }
    return timeLeft;
  }

}
