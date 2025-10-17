import { Injectable } from '@nestjs/common';
import { UserProfileImage } from '@shop/type';
import { PrismaClientService } from '@services';
import { UserInfoByJWT } from '@shop/dto';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaClientService) {}
  updateUserImage(img: UserProfileImage, user: UserInfoByJWT) {
    const update = img.banner
      ? {
          banner: img.banner,
        }
      : {
          avatar: img.avatar,
        };
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: update,
    });
  }
}
