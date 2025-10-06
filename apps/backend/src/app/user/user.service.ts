import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@services';
import { ChannelDto, PaginationDto, RBStreamerBy, UserInfoByJWT, UserPasswordDTO } from '@shop/dto';
import { verifyPassword } from '@utils';
import { omitKeyInArrObj, omitKeyInObj } from '@transformers';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClientService) {}

  async findAll(options: PaginationDto) {
    const { size, page, search } = options;

    const key = <K extends keyof typeof this.prisma.user.fields>(key: K) => {
      return this.prisma.user.fields[key].name;
    };

    const searchCol = [
      {
        [key('email')]: { contains: search },
      },
      {
        [key('firstname')]: { contains: search },
      },
      {
        [key('lastname')]: { contains: search },
      },
    ];

    return this.prisma.$transaction([
      this.prisma.user.findMany({
        take: size,
        skip: (page - 1) * size,
        where: {
          OR: searchCol,
        },
        /*select: {

          id: true,
          createAt: true,
          email: true,
        },*/
        omit: {
          password: true,
          themeId: true,
        },
      }),
      this.prisma.user.count(),
    ]);
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
        themeId: true,
      },
    });
  }

  async findOneBy(payload: RBStreamerBy) {
    const user = await this.prisma.user.findFirst({
      where: {
        channel: payload.channel,
      },

      omit: {
        password: true,
        themeId: true,
      },
      include: {
        channelRef: {
          include: {
            externalLinks: true,
          },
        },
      },
    });

    const cr = user!.channelRef!;
    const _c = omitKeyInObj(cr, 'userId');
    const _ex = omitKeyInArrObj(_c.externalLinks, 'channelId');
    return {
      ...user,
      channelRef: {
        ..._c,
        externalLinks: _ex,
      },
    };
  }

  async createChannel(payload: ChannelDto, user: UserInfoByJWT) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });

    return this.prisma.channel.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        description: payload.description ?? '',
        externalLinks: {
          create: payload.externalLinks,
        },
      },
    });
  }

  async updateChannel(payload: ChannelDto, user: UserInfoByJWT) {
    const _user = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
        ...(payload.channel ? { channel: payload.channel } : {}),
        channelRef: {
          upsert: {
            create: {
              description: payload.description ?? '',
              externalLinks: payload.externalLinks?.length ? { create: payload.externalLinks } : undefined,
            },
            update: {
              description: payload.description ?? '',
              ...(payload.externalLinks?.length
                ? {
                    externalLinks: {
                      deleteMany: {}, // xoá toàn bộ cũ
                      create: payload.externalLinks, // tạo mới lại
                    },
                  }
                : {}),
            },
          },
        },
      },
      include: {
        channelRef: { include: { externalLinks: true } },
      },
      omit: {
        password: true,
      },
    });

    return _user;
  }

  updateUserInfo() {
    return `This action updates a #} user`;
  }

  async changePassword(dto: UserPasswordDTO, id: number) {
    const password = await verifyPassword(dto.password, dto.confirmPassword!);
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
      omit: {
        password: true,
      },
    });
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
