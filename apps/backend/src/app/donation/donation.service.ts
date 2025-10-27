import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientService } from '@services';
import type { DonateDto } from '@shop/dto';
import { c } from '@utils';
import { vnd } from '@shop/platform';
import { DonateGateway } from '../events/donate.gateway';
import { RSBDonation } from '@shop/type';

@Injectable()
export class DonationService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly gw: DonateGateway
  ) {}

  donate = async (dto: DonateDto, streamerId: number, userId: number) => {
    const [_user, _streamer] = await this.prisma.$transaction([
      this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          wallet: true,
          channelRef: true,
        },
      }),
      this.prisma.user.findUnique({
        where: {
          id: streamerId,
        },
        include: {
          wallet: true,
          channelRef: true,
        },
      }),
    ]);

    if (!_user || !_streamer) {
      throw new BadRequestException('Lỗi không xác định');
    }

    if (dto.amount < _streamer.channelRef!.minReceive) {
      throw new BadRequestException(`Tối thiểu ${vnd(_streamer.channelRef!.minReceive)}`);
    }

    if (dto.amount > _user.wallet!.balance) {
      throw new BadRequestException(`Số tiền trong ví không đủ, hiện tại là ${vnd(_user.wallet!.balance)}`);
    }
    const result = await this.prisma.$transaction(async (tx) => {
      // --- Trừ tiền người donate ---
      const updatedUserWallet = await tx.wallet.update({
        where: { userId },
        data: { balance: { decrement: dto.amount } },
      });

      // --- Cộng tiền streamer (fire & forget nhưng vẫn trong cùng context Prisma) ---
      tx.wallet
        .update({
          where: { userId: streamerId },
          data: { balance: { increment: dto.amount } },
        })
        .catch(console.error);

      // --- Ghi log donation ---
      const donation = await tx.donation.create({
        data: {
          amount: dto.amount,
          message: dto.message,
          senderId: userId,
          receiverId: streamerId,
        },
      });

      // --- Ghi transaction ví ---
      await tx.walletTransaction.createMany({
        data: [
          {
            walletId: userId,
            type: 'DONATE_SENT',
            amount: dto.amount,
            status: 'SUCCESS',
            referenceId: donation.id,
          },
          {
            walletId: streamerId,
            type: 'DONATE_RECEIVED',
            amount: dto.amount,
            status: 'SUCCESS',
            referenceId: donation.id,
          },
        ],
      });

      return { updatedUserWallet, donation };
    });
    const donate = {
      id: result.donation.id,
      amount: dto.amount,
      message: dto.message ?? '',
      createdAt: result.donation.createdAt,
      sender: {
        id: _user.id,
        avatar: _user.avatar,
        firstname: _user.firstname,
        lastname: _user.lastname,
      },
    } satisfies RSBDonation;
    this.gw.handleDonate(streamerId, { type: 'donate', data: donate });

    return result.updatedUserWallet;
  };
}
