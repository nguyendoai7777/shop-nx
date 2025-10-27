import { Injectable } from '@nestjs/common';
import { UserJWT, UserProfileImage } from '@shop/type';
import { PrismaClientService } from '@services';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaClientService) {}
  updateUserImage(img: UserProfileImage, user: UserJWT) {
    const data = Object.fromEntries(Object.entries(img).filter(([_, value]) => value !== undefined));

    if (Object.keys(data).length === 0) {
      return Promise.resolve(null);
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data,
    });
  }
}
