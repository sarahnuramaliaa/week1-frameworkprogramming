import {
  Body,
  Controller,
  Post,
  Put,
  Param,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';

import {
  RegisterAuthDto,
  LoginAuthDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/create-auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // REGISTER
  @Post('register')
  register(
    @Body() registerDto: RegisterAuthDto,
  ) {
    return this.authService.register(registerDto);
  }

  // LOGIN
  @Post('login')
  login(
    @Body() loginDto: LoginAuthDto,
  ) {
    return this.authService.login(loginDto);
  }

  // FORGOT PASSWORD
  @Post('forgot-password')
  forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return this.authService.forgotPassword(
      forgotPasswordDto,
    );
  }

  // RESET PASSWORD
  @Put('reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      token,
      resetPasswordDto,
    );
  }
}