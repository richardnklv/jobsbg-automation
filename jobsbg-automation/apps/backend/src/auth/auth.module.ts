import { Module } from '@nestjs/common';
import { RegisterController } from './api/register.controller';
import { LoginController } from './api/login.controller';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';

@Module({
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService],
  exports: [RegisterService, LoginService],
})
export class AuthModule {}
