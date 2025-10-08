import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaClientService } from '@services';
import type { ChannelDto, PaginationDto, RBStreamerBy, RegisterProChannel, UserInfoByJWT, UserPasswordDTO } from '@shop/dto';
import { verifyPassword } from '@utils';
import { omitKeyInArrObj, omitKeyInObj, ResponseTransformer } from '@transformers';

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
    // return user;
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

  async createChannel(payload: RegisterProChannel, user: UserInfoByJWT) {
    const __user = (await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    }))!;

    if (__user.channel) {
      throw new BadRequestException({
        message: `Kênh này đã đăng ký Pro rồi.`,
        status: 400,
      });
    }

    const _user = (await this.prisma.user.findUnique({
      where: {
        channel: payload.channel,
      },
    }))!;

    if (_user?.channel === payload.channel) {
      throw new BadRequestException({
        message: `Kênh này đã được đăng ký`,
        status: 400,
      });
    }

    const sub = await this.prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!_user && !sub) {
      const [$user, $sub] = await this.prisma.$transaction([
        this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            verified: true,
            channel: payload.channel,
          },
          omit: {
            password: true,
          },
        }),
        this.prisma.subscription.create({
          data: {
            subscription: payload.subscription,
            userId: user.id,
          },
        }),
      ]);
      return {};
    }
    throw new BadRequestException(
      new ResponseTransformer<void>({
        message: `không biết lỗi gì`,
        status: HttpStatus.BAD_REQUEST,
      })
    );
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
