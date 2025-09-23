import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.loginService.login(loginDto);
    return {
      message: 'Login successful',
      user: result.user,
    };
  }
}