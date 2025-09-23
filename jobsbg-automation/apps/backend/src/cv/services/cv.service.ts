import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createClient } from '@supabase/supabase-js';
import { CV } from '../entities/cv.entity';
import { CVVector } from '../entities/cv_vectors.entity';
import { CVProcessingService } from '../functions/cv-processing.service';
import { VectorizedCV } from '../functions/vectorization.service';

@Injectable()
export class CvService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  constructor(
    @InjectRepository(CV)
    private readonly cvRepository: Repository<CV>,
    @InjectRepository(CVVector)
    private readonly cvVectorRepository: Repository<CVVector>,
    private readonly cvProcessingService: CVProcessingService,
  ) {}

  async processCvUpload(file: Express.Multer.File, candidateId: string) {
    // Step 0: Ensure candidate exists (lookup by auth_user_id which comes from Supabase)
    const { data: candidate, error: candidateError } = await this.supabase
      .from('candidate')
      .select('id')
      .eq('auth_user_id', candidateId)
      .single();

    if (candidateError || !candidate) {
      throw new Error('Candidate not found');
    }

    const dbCandidateId = candidate.id; // real UUID primary key in candidate table

    // Step 1: Validate file
    this.validateFile(file);

    // Step 2: Upload to storage (use DB candidate id for filenames)
    const fileUrl = await this.uploadFileToStorage(file, dbCandidateId);

    // Step 3: Process vectors
    const vectors = await this.cvProcessingService.processCV(file.buffer);

    // Step 4: Save to database (transaction for consistency)
    return this.saveCvWithVectors(dbCandidateId, fileUrl, vectors);
  }

  private validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file provided');
    }

    if (!file.mimetype.includes('pdf')) {
      throw new Error('Only PDF files are allowed');
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('File size must be less than 10MB');
    }
  }

  private async uploadFileToStorage(file: Express.Multer.File, candidateId: string): Promise<string> {
    const fileName = `cv-${candidateId}-${Date.now()}.pdf`;
    const { data: uploadData, error: uploadError } = await this.supabase.storage
      .from('cvs')
      .upload(fileName, file.buffer);

    if (uploadError) {
      throw new Error(`File upload failed: ${uploadError.message}`);
    }

    const { data: urlData } = this.supabase.storage
      .from('cvs')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

  private async saveCvWithVectors(candidateId: string, fileUrl: string, vectors: VectorizedCV) {
    return this.cvRepository.manager.transaction(async (manager) => {
      // Save CV metadata
      const cv = await manager.save(CV, {
        candidate_id: candidateId,
        file_url: fileUrl,
      });

      // Flatten and save all vectors
      const vectorEntities = this.flattenVectorsToEntities(cv.id, vectors);
      await manager.save(CVVector, vectorEntities);

      return cv;
    });
  }

  private flattenVectorsToEntities(cvId: string, vectors: VectorizedCV): CVVector[] {
    const entities: CVVector[] = [];
    let index = 0;

    // Flatten all vectors: coarse, medium, fine
    [...vectors.coarse, ...vectors.medium, ...vectors.fine].forEach(vector => {
      entities.push({
        cv_id: cvId,
        vector_index: index++,
        embedding: vector,
      } as CVVector);
    });

    return entities;
  }

  // Keep the old method for backward compatibility (can remove later)
  async processCv(file: Express.Multer.File, candidateId: string) {
    return this.processCvUpload(file, candidateId);
  }
}