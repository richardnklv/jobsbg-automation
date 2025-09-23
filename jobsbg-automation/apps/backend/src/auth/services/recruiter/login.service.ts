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

    // Try to find the recruiter row in app DB by auth_user_id (if set)
    const userId = signInData.user?.id;
  let appUser: any = null;
    if (userId) {
      const { data: recruiter, error: recruiterError } = await this.supabase
        .from('recruiter')
        .select('id, email, first_name, last_name, auth_user_id')
        .eq('auth_user_id', userId)
        .single();

      if (!recruiter || recruiterError) {
        // Not fatal for login; just omit app user info
        appUser = null;
      } else {
        appUser = {
          id: recruiter.id,
          email: recruiter.email,
          first_name: recruiter.first_name,
          last_name: recruiter.last_name,
        };
      }
    }

    return {
      user: appUser,
      access_token: accessToken,
    };
  }
}
