export const MediaImageMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
export const MediaImagAllowedMsg = MediaImageMimes.map((v) => v.replace('image/', '')).join(', ');
export const MediaImageAllowed = MediaImageMimes.join(', ');

export const MinReceive = 8_000;
