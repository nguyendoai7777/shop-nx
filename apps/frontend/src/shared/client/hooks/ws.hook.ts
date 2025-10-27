import { RSBDonation, ResponseBase, SocketIoJoinPayload, type WSPayload } from '@shop/type';
import { useEffect, useRef, useState } from 'react';
import { ClientConfiguration, HttpClient } from '@client/utils';
import { io, Socket } from 'socket.io-client';
import { SOCKET_IO_EVENT } from '@shop/platform';
import { httpResource } from '@core/http';

export const useDonationSocket = (streamerId: number) => {
  const socketRef = useRef<Socket | null>(null);
  const [donationList, setDonationList] = useState<RSBDonation[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(`???`);
    setLoading(true);
    httpResource(HttpClient.get<ResponseBase<RSBDonation[]>>(`/streamer/donate-history/${streamerId}`)).subscribe({
      next(res) {
        setDonationList(res.data);
      },
      completed() {
        setLoading(false);
      },
    });

    let socketInstance: Socket;

    const setupSocket = async () => {
      const url = await ClientConfiguration.get('api');
      console.log(url);
      socketInstance = io(url, {
        transports: ['websocket'],
      });

      socketRef.current = socketInstance;

      // ✅ Kết nối thành công
      socketInstance.on('connect', () => {
        console.log('✅ Connected to server:', socketInstance.id);

        const joinPayload: SocketIoJoinPayload = { id: streamerId, type: 'donate' };
        socketInstance.emit(SOCKET_IO_EVENT.join, joinPayload, (ack: unknown) => {
          console.log('Joined room ack:', ack);
        });
      });

      // ❌ Mất kết nối
      socketInstance.on('disconnect', (reason) => {
        console.log('❌ Disconnected:', reason);
      });

      // ⚠️ Lỗi kết nối
      socketInstance.on('connect_error', (err: Error) => {
        console.error('⚠️ Connection error:', err.message);
      });

      // 💰 Nhận donate realtime
      socketInstance.on(SOCKET_IO_EVENT.public_new_donate_by_room, (ev: WSPayload<RSBDonation>) => {
        console.log('💰 New donation received:', ev);
        // TODO: Trigger UI update, animation, etc.
        setDonationList((prev) => [ev.data, ...prev]);
      });
    };
    console.log(`???222222`);
    setupSocket();

    // 🔌 Cleanup khi component unmount
    return () => {
      console.log(`ua`);
      if (socketRef.current) {
        console.log('🔌 Disconnecting socket...');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [streamerId]);

  return { socket: socketRef.current, donationList, loading };
};
