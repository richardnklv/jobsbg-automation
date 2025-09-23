import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RegisterController } from './api/register.controller';
import { LoginController } from './api/login.controller';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SUPABASE_JWT_SECRET || 'your-jwt-secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService, JwtStrategy],
  exports: [RegisterService, LoginService, JwtStrategy],
})
export class AuthModule {}
