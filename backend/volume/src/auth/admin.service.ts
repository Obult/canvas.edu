// import { Injectable } from '@nestjs/common';

export class AdminService {
  // default timeout is 1000 milliseconds
  private timeout: number;
  constructor() {
    this.timeout = 1000;
  }

  getTimeOut() :  number {
    return this.timeout;
  }

  setTimeout(timeout: number) {
    this.timeout = timeout;
  }

}
