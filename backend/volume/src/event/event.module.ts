import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';

@Module({
  providers: [EventGateway]
})
export class EventModule {}
