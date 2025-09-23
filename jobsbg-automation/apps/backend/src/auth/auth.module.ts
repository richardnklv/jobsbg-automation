import { Module } from '@nestjs/common';
// Passport is no longer used; SupabaseAuthGuard handles authentication.
import { RegisterController } from './api/candidate/register.controller';
import { LoginController } from './api/candidate/login.controller';
import { RegisterService } from './services/candidate/register.service';
import { LoginService } from './services/candidate/login.service';
import { RecruiterRegisterController } from './api/recruiter/register.controller';
import { RecruiterLoginController } from './api/recruiter/login.controller';
import { RegisterService as RecruiterRegisterService } from './services/recruiter/register.service';
import { LoginService as RecruiterLoginService } from './services/recruiter/login.service';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';

@Module({
  imports: [],
  controllers: [RegisterController, LoginController, RecruiterRegisterController, RecruiterLoginController],
  providers: [RegisterService, LoginService, RecruiterRegisterService, RecruiterLoginService, SupabaseAuthGuard],
  exports: [RegisterService, LoginService, RecruiterRegisterService, RecruiterLoginService, SupabaseAuthGuard],
})
export class AuthModule {}
