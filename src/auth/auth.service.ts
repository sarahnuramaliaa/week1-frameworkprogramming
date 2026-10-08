import { Injectable } from '@nestjs/common';
import { Auth } from './entities/auth-entity.js';
import {
  RegisterAuthDto,
  LoginAuthDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/create-auth.dto.js';

@Injectable()
export class AuthService {
  private users: Auth[] = [
    {
      id: 1,
      name: 'Amelia',
      email: 'ameliaaaa@gmail.com',
      password: '123456',
    },
  ];

  // Menyimpan token reset password sementara
  private resetTokens: Map<string, string> = new Map();

  // REGISTER
  register(registerDto: RegisterAuthDto) {
    const { name, email, password, confirmPassword } = registerDto;

    // Validasi password
    if (password !== confirmPassword) {
      throw new Error('Password dan confirmPassword tidak sama');
    }

    // Cek email sudah digunakan
    const existingUser = this.users.find(
      (user) => user.email === email,
    );

    if (existingUser) {
      throw new Error('Email sudah terdaftar');
    }

    const newUser: Auth = {
      id: this.users.length + 1,
      name,
      email,
      password,
    };

    this.users.push(newUser);

    return {
      message: 'Register berhasil',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  // LOGIN
  login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;

    const user = this.users.find(
      (user) =>
        user.email === email &&
        user.password === password,
    );

    if (!user) {
      throw new Error('Email atau password salah');
    }

    return {
      message: 'Login berhasil',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  // FORGOT PASSWORD
  forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = this.users.find(
      (user) => user.email === email,
    );

    if (!user) {
      throw new Error('Email tidak ditemukan');
    }

    // Membuat token sederhana
    const token =
      Math.random().toString(36).substring(2) +
      Date.now().toString(36);

    this.resetTokens.set(token, email);

    return {
      message: 'Token reset password berhasil dibuat',
      token: token,
    };
  }

  // RESET PASSWORD
  resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDto,
  ) {
    const email = this.resetTokens.get(token);

    if (!email) {
      throw new Error('Token tidak valid atau sudah digunakan');
    }

    const {
      newPassword,
      confirmNewPassword,
    } = resetPasswordDto;

    if (newPassword !== confirmNewPassword) {
      throw new Error(
        'newPassword dan confirmNewPassword tidak sama',
      );
    }

    const userIndex = this.users.findIndex(
      (user) => user.email === email,
    );

    if (userIndex === -1) {
      throw new Error('User tidak ditemukan');
    }

    this.users[userIndex].password = newPassword;

    // Token hanya bisa digunakan sekali
    this.resetTokens.delete(token);

    return {
      message: 'Password berhasil direset',
    };
  }
}