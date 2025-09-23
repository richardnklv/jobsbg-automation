import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from '../../services/recruiter/register.service';
import { RegisterDto } from '../auth.dto';

@Controller('auth/recruiter')
export class RecruiterRegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const recruiter = await this.registerService.register(registerDto);
    return {
      message: 'Recruiter registered successfully',
      recruiter: {
        id: recruiter.id,
        email: recruiter.email,
        first_name: recruiter.first_name,
        last_name: recruiter.last_name,
      },
    };
  }
}
