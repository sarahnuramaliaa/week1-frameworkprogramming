
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
} from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty({ message: 'Name harus diisi' })
  @IsString({ message: 'Name harus berupa teks' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email harus diisi' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password harus diisi' })
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  readonly password: string;

  @IsNotEmpty({ message: 'Confirm Password harus diisi' })
  @MinLength(8, {
    message: 'Confirm Password minimal 8 karakter',
  })
  readonly confirmPassword: string;
}

export class LoginAuthDto {
  @IsNotEmpty({ message: 'Email harus diisi' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password harus diisi' })
  readonly password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty({ message: 'Email harus diisi' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  readonly email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Token harus diisi' })
  readonly token: string;

  @IsNotEmpty({ message: 'Password baru harus diisi' })
  @MinLength(8, {
    message: 'Password baru minimal 8 karakter',
  })
  readonly newPassword: string;

  @IsNotEmpty({ message: 'Konfirmasi password harus diisi' })
  @MinLength(8, {
    message: 'Konfirmasi password minimal 8 karakter',
  })
  readonly confirmNewPassword: string;
}
