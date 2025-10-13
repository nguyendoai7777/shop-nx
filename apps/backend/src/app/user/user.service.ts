import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { PageLogoService, PrismaClientService } from '@services';
import { ChannelDto, RegisterProChannel, UserInfoByJWT, UserPasswordDTO } from '@shop/dto';
import { verifyPassword } from '@utils';
import { ResponseTransformer } from '@shop/factory';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly logo: PageLogoService
  ) {}

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

  findUserSetting(userInfo: UserInfoByJWT) {
    return this.prisma.channel.findUnique({
      where: {
        userId: userInfo.id,
      },
      include: {
        externalLinks: true,
      },
    });
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

  async updateSettingInfo(payload: ChannelDto, user: UserInfoByJWT) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!channel) {
      throw new BadRequestException('Không hợp lệ');
    }
    const links = await this.logo.signMultiple(payload.externalLinks);
    const t$ = this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          channel: payload.channel,
        },
      }),
      this.prisma.channel.update({
        where: {
          userId: user.id,
        },
        data: {
          description: payload.description,
          externalLinks: {
            deleteMany: {},
            create: links.map((l) => ({
              shortname: l.shortname,
              url: l.url,
              avatarUrl: l.avatarUrl,
            })),
          },
        },
      }),
    ]);

    return t$;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
