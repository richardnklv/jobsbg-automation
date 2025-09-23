import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvController } from './api/cv.controller';
import { CvService } from './services/cv.service';
import { CV } from './entities/cv.entity';
import { CVVector } from './entities/cv_vectors.entity';
import { CVProcessingService } from './functions/cv-processing.service';
import { PdfNormalizationService } from './functions/pdf-normalization.service';
import { CVChunkingService } from '../shared/functions/chunking.service';
import { VectorizationService } from '../shared/functions/vectorization.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CV, CVVector]),
    AuthModule,
  ],
  controllers: [CvController],
  providers: [
    CvService,
    CVProcessingService,
    PdfNormalizationService,
    CVChunkingService,
    VectorizationService,
  ],
  exports: [CvService],
})
export class CvModule {}
