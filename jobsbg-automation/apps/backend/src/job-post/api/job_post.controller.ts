import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JobPostService } from '../services/job_post.service';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';

@Controller('job-post')
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @Post()
  @UseGuards(SupabaseAuthGuard)
  async createJobPost(@Body() body: any, @Request() req: any) {
    const recruiterAuthId = req.user.id;
    const { description, requirements, offer, end_date } = body;

    const job = await this.jobPostService.createJobPost(
      recruiterAuthId,
      { description, requirements, offer, end_date },
    );

    return { message: 'Job post created', job };
  }
}
