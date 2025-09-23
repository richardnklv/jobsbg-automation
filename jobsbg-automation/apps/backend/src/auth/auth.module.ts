import { Module } from '@nestjs/common';
// Passport is no longer used; SupabaseAuthGuard handles authentication.
import { RegisterController } from './api/register.controller';
import { LoginController } from './api/login.controller';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';

@Module({
  imports: [],
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService, SupabaseAuthGuard],
  exports: [RegisterService, LoginService, SupabaseAuthGuard],
})
export class AuthModule {}
