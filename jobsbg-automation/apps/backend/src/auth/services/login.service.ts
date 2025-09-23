import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { LoginDto } from '../api/auth.dto';

@Injectable()
export class LoginService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    // First find candidate by email
    const { data: candidate, error: candidateError } = await this.supabase
      .from('candidate')
      .select('id, email, first_name, last_name, auth_user_id')
      .eq('email', email)
      .single();

    if (candidateError || !candidate) {
      throw new Error('User not found');
    }

    // Sign in with Supabase Auth using admin
    const { data: authData, error: authError } = await this.supabase.auth.admin.getUserById(candidate.auth_user_id);

    if (authError || !authData.user) {
      throw new Error('Authentication failed');
    }

    // Verify password by attempting signin (this validates the password)
    const { error: passwordError } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (passwordError) {
      throw new Error('Invalid password');
    }

    return {
      user: {
        id: candidate.id,
        email: candidate.email,
        first_name: candidate.first_name,
        last_name: candidate.last_name,
      },
    };
  }
}