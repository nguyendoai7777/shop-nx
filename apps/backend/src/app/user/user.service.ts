import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@services';
import type { PaginationDto, UserPasswordDTO } from '@shop/dto';
import { verifyPassword } from '@utils';

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
