import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { extractRealIp } from 'src/ip/ip.service';

@Injectable()
export class IdentityService {
  // Ip as string and Date last edit stamp
  private timeouts = new Map<string, Date>();
  constructor() {}

  async isNotTimedOut(request: Request, timeoutInMilliSec: number): Promise<boolean> {
    if (timeoutInMilliSec == 0) // optimization for zero timeout
      return true;

    const ip = extractRealIp(request);
    if (!this.timeouts.has(ip))  {
      this.timeouts.set(ip, new Date());
      return true;
    }
    const stamp = this.timeouts.get(ip);
    console.log('usr time: ', stamp.getTime() + timeoutInMilliSec, 'now: ', Date.now());
    const timeOutState = ((stamp.getTime() + timeoutInMilliSec) <= Date.now());
    if (timeOutState)
      this.timeouts.set(ip, new Date());
    return timeOutState;
  }

}
