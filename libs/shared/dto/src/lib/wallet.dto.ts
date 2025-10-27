import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransectionDto {
  @IsDefined({ message: 'amount không được để trống' })
  @IsNotEmpty({ message: 'amount không được để trống' })
  @IsNumber({}, { message: `amount phải là số nguyên` })
  @ApiProperty({
    type: 'number',
    example: 10_000_000,
  })
  amount: number;
}

export class DepositDto extends TransectionDto {}

export class WithdrawDto extends TransectionDto {
  @IsDefined({ message: 'targetType không được để trống' })
  @IsNotEmpty({ message: 'targetType không được để trống' })
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'E-WALLET',
  })
  targetType: 'BANK' | 'E-WALLET';
}
