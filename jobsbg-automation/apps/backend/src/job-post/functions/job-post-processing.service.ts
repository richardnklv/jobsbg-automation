import { Injectable } from '@nestjs/common';
import { CVChunkingService } from '../../shared/functions/chunking.service';
import { VectorizationService, VectorizedCV } from '../../shared/functions/vectorization.service';

@Injectable()
export class JobPostProcessingService {
  constructor(
    private readonly chunkingService: CVChunkingService,
    private readonly vectorizationService: VectorizationService,
  ) {}

  /**
   * Process plain job post text through chunking and vectorization
   * @param text plain text (description + requirements + offer combined or per-field concatenated)
   * @returns Vectorized chunks grouped by granularity
   */
  async processJobPostText(text: string): Promise<VectorizedCV> {
    // Step 2: Chunk the input text (reuse CV chunking logic)
    const chunks = await this.chunkingService.chunkCV(text);

    // Step 3: Vectorize the chunks
    const vectors = await this.vectorizationService.vectorizeChunks(chunks);

    return vectors;
  }
}
