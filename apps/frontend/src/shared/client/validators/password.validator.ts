export const PasswordValidation = {
  requiredIfConfirmPassword: (confirmPasswordValue: string) => (value: string) => {
    if (confirmPasswordValue && !value) {
      return 'Vui lòng nhập mật khẩu';
    }
    return true;
  },
  requiredIfPassword: (passwordValue: string) => (value: string) => {
    if (passwordValue && !value) {
      return 'Vui lòng xác nhận mật khẩu';
    }
    return true;
  },
  matchPassword: (passwordValue: string) => (value: string) => {
    if (value && passwordValue && value !== passwordValue) {
      return 'Mật khẩu không khớp';
    }
    return true;
  },
};
