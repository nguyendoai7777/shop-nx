import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(_: string, args: any) {
    const { password, verifiedPassword } = args.object as any;
    console.log(`@@ @ValidatorConstraint`, { verifiedPassword, _ });
    console.log(`@@ @ValidatorConstraint`, { args });
    return verifiedPassword === password;
  }

  defaultMessage() {
    return 'verifiedPassword Xác nhận mật khẩu không khớp';
  }
}
