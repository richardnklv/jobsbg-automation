import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { LoginDto } from '../../api/auth.dto';

@Injectable()
export class LoginService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  private supabaseAnon = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );

  constructor() {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Attempt to sign in via Supabase (this validates credentials)
    const { data: signInData, error: signInError } = await this.supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !signInData.session) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = signInData.session.access_token;

    // Try to find the candidate row in app DB by auth_user_id (if set)
    const userId = signInData.user?.id;
  let appUser: any = null;
    if (userId) {
      const { data: candidate, error: candidateError } = await this.supabase
        .from('candidate')
        .select('id, email, first_name, last_name, auth_user_id')
        .eq('auth_user_id', userId)
        .single();

      if (!candidate || candidateError) {
        // Not fatal for login; just omit app user info
        appUser = null;
      } else {
        appUser = {
          id: candidate.id,
          email: candidate.email,
          first_name: candidate.first_name,
          last_name: candidate.last_name,
        };
      }
    }

    return {
      user: appUser,
      access_token: accessToken,
    };
  }
}