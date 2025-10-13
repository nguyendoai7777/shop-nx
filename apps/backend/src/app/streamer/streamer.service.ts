import { Injectable } from '@nestjs/common';
import { PaginationDto, RBStreamerBy } from '@shop/dto';
import { PrismaClientService } from '@services';
import { omitKeyInArrObj, omitKeyInObj } from '@transformers';

@Injectable()
export class StreamerService {
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
}
