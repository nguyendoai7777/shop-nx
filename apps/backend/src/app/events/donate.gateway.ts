import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { RSBDonation, SocketIoJoinPayload, WSPayload } from '@shop/type';
import { SOCKET_IO_EVENT } from '@shop/platform';
import { c } from '@utils';
import { DodgeBlue } from '../../shared/constants/color.const';

@WebSocketGateway({ cors: { origin: '*' } })
export class DonateGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(c.hex(DodgeBlue).bold.italic(`WS Client connected: `), client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(c.hex(DodgeBlue).bold.italic(`Client disconnected: `), client.id);
  }

  @SubscribeMessage(SOCKET_IO_EVENT.join)
  handleJoin(client: Socket, payload: SocketIoJoinPayload) {
    const room = `${payload.type}_${payload.id}`;
    client.join(room);
    console.log(c.hex(DodgeBlue).bold.italic(`WS Client`), client.id, `joined room ${room}`);
  }

  handleDonate<D>(roomId: number, response: WSPayload<D>) {
    const room = `${response.type}_${roomId}`;
    this.server.to(room).emit(SOCKET_IO_EVENT.public_new_donate_by_room, response);
  }
}
