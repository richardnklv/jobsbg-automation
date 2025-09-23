import { Injectable } from '@nestjs/common';
import { PdfNormalizationService } from './pdf-normalization.service';
import { CVChunkingService } from '../../shared/functions/chunking.service';
import { VectorizationService, VectorizedCV } from '../../shared/functions/vectorization.service';

@Injectable()
export class CVProcessingService {
  constructor(
    private readonly normalizationService: PdfNormalizationService,
    private readonly chunkingService: CVChunkingService,
    private readonly vectorizationService: VectorizationService,
  ) {}

  /**
   * Process a CV PDF through normalization, chunking, and vectorization
   * @param fileBuffer Buffer containing PDF data
   * @returns Vectorized chunks at multiple granularities
   */
  async processCV(fileBuffer: Buffer): Promise<VectorizedCV> {
    // Step 1: Normalize PDF to text
    const normalizedText = await this.normalizationService.normalizePdfToText(fileBuffer);
    
    // Step 2: Chunk the normalized text
    const chunks = await this.chunkingService.chunkCV(normalizedText);
    
    // Step 3: Vectorize the chunks
    const vectors = await this.vectorizationService.vectorizeChunks(chunks);
    
    return vectors;
  }
}