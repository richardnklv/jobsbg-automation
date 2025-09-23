import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!, // Use anon key for token verification
  );

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SUPABASE_JWT_SECRET || 'your-jwt-secret', // Supabase JWT secret
    });
  }

  async validate(payload: any) {
    // Verify the token with Supabase
    const { data: { user }, error } = await this.supabase.auth.getUser(payload.sub);

    if (error || !user) {
      throw new Error('Invalid token');
    }

    // Get candidate info
    const { data: candidate, error: candidateError } = await this.supabase
      .from('candidate')
      .select('id, email, first_name, last_name')
      .eq('auth_user_id', user.id)
      .single();

    if (candidateError || !candidate) {
      throw new Error('Candidate not found');
    }

    return {
      id: candidate.id,
      email: candidate.email,
      first_name: candidate.first_name,
      last_name: candidate.last_name,
      auth_user_id: user.id,
    };
  }
}