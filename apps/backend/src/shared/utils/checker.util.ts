import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ResponseTransformer } from '@transformers';
import { hash } from 'argon2';

export const verifyPassword = async (
  password: string,
  confirmPassword: string
) => {
  if (confirmPassword !== password) {
    throw new BadRequestException(
      new ResponseTransformer({
        message: 'Password không khớp',
        status: HttpStatus.BAD_REQUEST,
      })
    );
  }

  return await hash(password, {
    memoryCost: 2 ** 10,
  });
};


