import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class MyGateway {

	@SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: string){
    console.log(body);
  }
}

// @SubscribeMessage('events')
// handleEvent(
// 	@MessageBody() data: string,
// 	@ConnectedSocket() client: Socket,
// ): string {
// 	return data;
// }