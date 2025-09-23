import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RegisterController } from './api/register.controller';
import { LoginController } from './api/login.controller';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';

@Module({
  imports: [
    PassportModule,
  ],
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService, SupabaseAuthGuard],
  exports: [RegisterService, LoginService, SupabaseAuthGuard],
})
export class AuthModule {}
