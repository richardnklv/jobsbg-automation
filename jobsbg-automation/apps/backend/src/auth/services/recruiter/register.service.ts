import { Injectable, ConflictException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { RegisterDto } from '../../api/auth.dto';

@Injectable()
export class RegisterService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  async register(registerDto: RegisterDto) {
    const { email, password, first_name, last_name } = registerDto;

    // Check if recruiter already exists
    const { data: existingRecruiter } = await this.supabase
      .from('recruiter')
      .select('id')
      .eq('email', email)
      .single();

    if (existingRecruiter) {
      throw new ConflictException('User already exists');
    }

    // Create user in Supabase Auth using admin API
    const { data: authData, error: authError } = await this.supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !authData.user) {
      throw new Error(`Registration failed: ${authError?.message || 'User creation failed'}`);
    }

    // Create recruiter record linked to auth user
    const { data: recruiter, error: recruiterError } = await this.supabase
      .from('recruiter')
      .insert([{
        auth_user_id: authData.user.id,
        email,
        first_name,
        last_name,
      }])
      .select('id, email, first_name, last_name')
      .single();

    if (recruiterError) {
      throw new Error(`Recruiter creation failed: ${recruiterError.message}`);
    }

    return recruiter;
  }
}
