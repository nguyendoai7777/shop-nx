import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: any) {
    const { password } = args.object as any;
    return !password || confirmPassword === password;
  }

  defaultMessage() {
    return 'confirmPassword Xác nhận mật khẩu không khớp';
  }
}
