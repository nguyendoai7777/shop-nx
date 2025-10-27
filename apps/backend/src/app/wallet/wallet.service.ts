import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientService } from '@services';
import { c } from '@utils';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaClientService) {}

  async deposit(userId: number, amount: number) {
    console.log(c.green.bold`@@ requested`, { userId, amount });
    return this.prisma.wallet.update({
      where: { userId },
      data: { balance: { increment: amount } },
    });
  }

  async withdraw(userId: number, amount: number) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet || wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    return this.prisma.wallet.update({
      where: { userId },
      data: { balance: { decrement: amount } },
    });
  }

  async transfer(senderId: number, receiverId: number, amount: number) {
    return this.prisma.$transaction(async (tx) => {
      const sender = await tx.wallet.update({
        where: { userId: senderId },
        data: { balance: { decrement: amount } },
      });
      if (sender.balance < 0) throw new Error('Insufficient balance');

      await tx.wallet.update({
        where: { userId: receiverId },
        data: { balance: { increment: amount } },
      });

      await tx.walletTransaction.createMany({
        data: [
          { walletId: senderId, amount: -amount, type: 'DONATE_SENT' },
          { walletId: receiverId, amount: amount, type: 'DONATE_SENT' },
        ],
      });
    });
  }

  async getBalance(userId: number) {
    const wallet = (await this.prisma.wallet.findUnique({ where: { userId } }))!;
    console.log(c.underline.green.bold`@@ Wallet of ${userId}`, wallet);
    return wallet;
  }
}
