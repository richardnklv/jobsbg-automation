import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from './auth.dto';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const candidate = await this.registerService.register(registerDto);
    return {
      message: 'User registered successfully',
      candidate: {
        id: candidate.id,
        email: candidate.email,
        first_name: candidate.first_name,
        last_name: candidate.last_name,
      },
    };
  }
}