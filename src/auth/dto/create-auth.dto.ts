export class RegisterAuthDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export class LoginAuthDto {
  readonly email: string;
  readonly password: string;
}

export class ForgotPasswordDto {
  readonly email: string;
}

export class ResetPasswordDto {
  readonly token: string;
  readonly newPassword: string;
  readonly confirmNewPassword: string;
}