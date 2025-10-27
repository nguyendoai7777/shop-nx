export const MediaImageMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
export const MediaImagAllowedMsg = MediaImageMimes.map((v) => v.replace('image/', '')).join(', ');
export const MediaImageAllowed = MediaImageMimes.join(', ');

export const MinReceive = 8_000;

export const SOCKET_IO_EVENT = {
  join: 'join',
  public_new_donate_by_room: 'public_new_donate_by_room',
};
