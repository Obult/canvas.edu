import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PassService {
  private passcode = this.generatePasscode(8);

  generatePasscode(length: number): string {
    const randomBytes = crypto.randomBytes(length);
    const passcode = randomBytes.toString('hex').slice(0, length);
    console.log(passcode);
    return passcode;
  }

  getPassCode(): string {
    return this.passcode;
  }

  checkCode(code: string): boolean {
    return (code === this.passcode);
  }

}
