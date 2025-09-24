import { Controller, Post, Body } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('job-post')
export class FetchJobPostController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Post('fetch-by-ids')
  async fetchByIds(@Body('job_ids') jobIds: string[]) {
    if (!Array.isArray(jobIds) || jobIds.length === 0) {
      return { jobs: [] };
    }
    // Use parameterized query to prevent SQL injection
    const params = jobIds.map((_, i) => `$${i + 1}`).join(', ');
    const sql = `SELECT * FROM job_post WHERE id IN (${params})`;
    const result = await this.dataSource.query(sql, jobIds);
    return { jobs: result };
  }
}
