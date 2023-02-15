import { MessageBody, SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'gw'
})
export class MyGateway implements OnGatewayConnection{

	@SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: string){
    console.log(body);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected gw: ${client.id}`);
    // client.emit('canvas-init', this.canvas)
  }
}

// @SubscribeMessage('events')
// handleEvent(
// 	@MessageBody() data: string,
// 	@ConnectedSocket() client: Socket,
// ): string {
// 	return data;
// }