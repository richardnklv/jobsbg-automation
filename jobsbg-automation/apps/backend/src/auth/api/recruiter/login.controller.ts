import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { SupabaseAuthGuard } from '../../guards/supabase-auth.guard';
import { LoginService } from '../../services/recruiter/login.service';
import { LoginDto } from '../auth.dto';

@Controller('auth/recruiter')
export class RecruiterLoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.loginService.login(loginDto);
    return {
      message: 'Login successful',
      user: result.user,
      access_token: result.access_token,
    };
  }

  @Get('whoami')
  @UseGuards(SupabaseAuthGuard)
  async whoami(@Request() req: any) {
    return { user: req.user };
  }
}
