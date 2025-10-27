import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { DonateDto } from '@shop/dto';
import { User } from '@decorators';
import type { RSBDonated, UserJWT } from '@shop/type';
import { DonationService } from './donation.service';
import { ResponseTransformer } from '@shop/factory';

@Controller('donate')
export class DonationController {
  constructor(private readonly ds: DonationService) {}
  @Post(':id')
  async donate(@Body() body: DonateDto, @Param('id') id: number, @User() user: UserJWT) {
    console.log(body, { id });
    const data = await this.ds.donate(body, +id, user.id);
    return new ResponseTransformer<RSBDonated>({
      data: {
        balance: data.balance,
      },
      status: HttpStatus.OK,
      message: 'Donate thành công',
    });
  }
}
