import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for database queries
  );

  constructor() {
    console.log('JWT Strategy - Constructor called, secret:', process.env.SUPABASE_JWT_SECRET ? 'SET' : 'NOT SET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SUPABASE_JWT_SECRET
    });
  }
  // Minimal validation: trust the verified token payload and return it as the user object
  async validate(payload: any) {
    // Keep this minimal to avoid DB/service dependencies during token validation
    return {
      auth_user_id: payload.sub,
      email: payload.email,
      candidateId: payload.candidateId,
    };
  }
}