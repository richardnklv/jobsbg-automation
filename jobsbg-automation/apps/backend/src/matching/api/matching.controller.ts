import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('matching')
export class MatchingController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get('top-jobs')
  @UseGuards(SupabaseAuthGuard)
  async getTopJobs(@Request() req: any) {
    const authUserId = req.user.id;
    // Lookup candidate.id from candidate table using auth_user_id
    const candidateResult = await this.dataSource.query(
      'SELECT id FROM candidate WHERE auth_user_id = $1',
      [authUserId]
    );
    if (!candidateResult || candidateResult.length === 0) {
      return { jobs: [] };
    }
    const candidateId = candidateResult[0].id;
    const sql = `
      SELECT 
        jp.id AS job_id, 
        MIN((('[ ' || cvv.embedding || ' ]')::vector <#> ('[ ' || jpv.embedding || ' ]')::vector)) AS best_similarity
      FROM 
        cv
      JOIN 
        cv_vectors cvv ON cv.id = cvv.cv_id
      JOIN 
        job_post_vectors jpv ON 1=1
      JOIN 
        job_post jp ON jp.id = jpv.job_id
      WHERE 
        cv.candidate_id = $1
      GROUP BY 
        jp.id
      ORDER BY 
        best_similarity ASC
      LIMIT 10;
    `;
    const result = await this.dataSource.query(sql, [candidateId]);
    return { jobs: result };
  }
}
