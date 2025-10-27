import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { PrismaClientService } from '../../shared/services';

describe('WalletController', () => {
  let controller: WalletController;
  let prisma: PrismaClientService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService, PrismaClientService],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    prisma = module.get<PrismaClientService>(PrismaClientService);
  });

  it('should migrate wallet for all users', async () => {
    // 🪙 Tìm user chưa có ví
    const usersWithoutWallet = await prisma.user.findMany({
      where: { wallet: { is: null } },
      select: { id: true },
    });

    if (usersWithoutWallet.length === 0) {
      console.log('✅ All users already have wallets.');
      expect(true).toBe(true);
      return;
    }

    // 🏗️ Tạo ví mới
    await prisma.wallet.createMany({
      data: usersWithoutWallet.map((u) => ({
        userId: u.id,
        balance: 0,
      })),
    });

    // ✅ Kiểm tra lại
    const missingAfter = await prisma.user.findMany({
      where: { wallet: { is: null } },
      select: { id: true },
    });

    if (missingAfter.length === 0) {
      console.log(`✅ Created ${usersWithoutWallet.length} wallets successfully.`);
    } else {
      console.warn(`⚠️ Still missing ${missingAfter.length} wallets.`);
    }

    expect(missingAfter.length).toBe(0);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
