import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && String(authHeader).startsWith('Bearer ') ? String(authHeader).slice(7) : null;

    if (!token) {
      throw new UnauthorizedException('No bearer token provided');
    }

    // Verify token with Supabase Auth (service role key)
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Attach minimal user info to the request for handlers/services
    req.user = {
      id: data.user.id,
      email: data.user.email,
      raw: data.user,
    };

    return true;
  }
}
