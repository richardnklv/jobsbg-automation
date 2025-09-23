import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostProcessingService } from './functions/job-post-processing.service';
import { CVChunkingService } from '../shared/functions/chunking.service';
import { VectorizationService } from '../shared/functions/vectorization.service';
import { JobPost } from './entities/job_post.entity';
import { JobPostVector } from './entities/job_post_vectors.entity';
import { JobPostService } from './services/job_post.service';
import { JobPostController } from './api/job_post.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([JobPost, JobPostVector]), AuthModule],
	controllers: [JobPostController],
	providers: [
		JobPostService,
		JobPostProcessingService,
		CVChunkingService,
		VectorizationService,
	],
	exports: [JobPostService],
})
export class JobPostModule {}
