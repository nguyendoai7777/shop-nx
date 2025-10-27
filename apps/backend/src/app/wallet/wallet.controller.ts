import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { User } from '@decorators';
import type { BalanceResponse, UserJWT } from '@shop/type';
import { DepositDto, WithdrawDto } from '@shop/dto';
import { ResponseTransformer } from '@shop/factory';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('deposit')
  async deposit(@Body() dto: DepositDto, @User() user: UserJWT) {
    const data = await this.walletService.deposit(user.id, dto.amount);
    return new ResponseTransformer<DepositDto>({
      data: {
        amount: data.balance,
      },
      status: HttpStatus.OK,
      message: 'Nạp thành công',
    });
  }

  @Post('withdraw')
  async withdraw(@Body() dto: WithdrawDto, @User() user: UserJWT) {
    return this.walletService.withdraw(user.id, dto.amount);
  }

  /*
  @Post('transfer')
  async transfer(@Body() dto: TransferDto, @User() user: UserInfoByJWT) {
    return this.walletService.transfer(user.id, dto.receiverId, dto.amount);
  }

  */
  @Get('balance')
  async getBalance(@User() user: UserJWT) {
    const data = await this.walletService.getBalance(user.id);
    return new ResponseTransformer<BalanceResponse>({
      message: 'OK',
      data,
      status: HttpStatus.OK,
    });
  }
}
