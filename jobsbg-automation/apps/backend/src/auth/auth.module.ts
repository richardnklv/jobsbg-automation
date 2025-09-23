import { Module } from '@nestjs/common';
// Passport is no longer used; SupabaseAuthGuard handles authentication.
import { RegisterController } from './api/candidate/register.controller';
import { LoginController } from './api/candidate/login.controller';
import { RegisterService } from './services/candidate/register.service';
import { LoginService } from './services/candidate/login.service';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';

@Module({
  imports: [],
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService, SupabaseAuthGuard],
  exports: [RegisterService, LoginService, SupabaseAuthGuard],
})
export class AuthModule {}
