import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createClient } from '@supabase/supabase-js';
import { JobPost } from '../entities/job_post.entity';
import { JobPostVector } from '../entities/job_post_vectors.entity';
import { JobPostProcessingService } from '../functions/job-post-processing.service';
import { VectorizedCV } from '../../shared/functions/vectorization.service';

@Injectable()
export class JobPostService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepository: Repository<JobPost>,
    @InjectRepository(JobPostVector)
    private readonly jobPostVectorRepository: Repository<JobPostVector>,
    private readonly jobPostProcessingService: JobPostProcessingService,
  ) {}

  async createJobPost(recruiterAuthId: string, payload: Partial<JobPost>) {
    // Resolve recruiter internal id using auth_user_id
    const { data: recruiter, error: recruiterError } = await this.supabase
      .from('recruiter')
      .select('id')
      .eq('auth_user_id', recruiterAuthId)
      .single();

    if (recruiterError || !recruiter) {
      throw new Error('Recruiter not found');
    }

    const dbRecruiterId = recruiter.id;

    // Build combined text for chunking/vectorization
    const combinedText = [payload.description, payload.requirements, payload.offer]
      .filter(Boolean)
      .join('\n\n');

    // Vectorize
    const vectors = await this.jobPostProcessingService.processJobPostText(combinedText);

    // Save job and vectors in a transaction
    return this.jobPostRepository.manager.transaction(async (manager) => {
      const job = await manager.save(JobPost, {
        recruiter_id: dbRecruiterId,
        description: payload.description,
        requirements: payload.requirements,
        offer: payload.offer,
        created_at: new Date(),
        end_date: payload.end_date,
      });

      const vectorEntities = this.flattenVectorsToEntities(job.id, vectors);
      await manager.save(JobPostVector, vectorEntities);

      return job;
    });
  }

  private flattenVectorsToEntities(jobId: string, vectors: VectorizedCV): JobPostVector[] {
    const entities: JobPostVector[] = [];
    let index = 0;

    // Flatten: coarse, medium, fine
    [...vectors.coarse, ...vectors.medium, ...vectors.fine].forEach(vector => {
      entities.push({
        job_id: jobId,
        vector_index: index++,
        embedding: vector,
      } as JobPostVector);
    });

    return entities;
  }
}
