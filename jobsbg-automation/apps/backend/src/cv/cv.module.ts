import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvController } from './api/cv.controller';
import { CvService } from './services/cv.service';
import { CV } from './entities/cv.entity';
import { CVVector } from './entities/cv_vectors.entity';
import { CVProcessingService } from './functions/cv-processing.service';
import { PdfNormalizationService } from './functions/pdf-normalization.service';
import { CVChunkingService } from './functions/chunking.service';
import { VectorizationService } from './functions/vectorization.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CV, CVVector]),
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
