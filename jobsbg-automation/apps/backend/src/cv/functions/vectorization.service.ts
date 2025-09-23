import { Injectable } from '@nestjs/common';
import { generateEmbedding } from '../../shared/utils/embedding.util';

export interface ChunkedCV {
  coarse: string[];
  medium: string[];
  fine: string[];
}

export interface VectorizedCV {
  coarse: number[][];
  medium: number[][];
  fine: number[][];
}

@Injectable()
export class VectorizationService {
  async vectorizeChunks(chunkedCV: ChunkedCV): Promise<VectorizedCV> {
    const [coarseVectors, mediumVectors, fineVectors] = await Promise.all([
      this.vectorizeChunkArray(chunkedCV.coarse),
      this.vectorizeChunkArray(chunkedCV.medium),
      this.vectorizeChunkArray(chunkedCV.fine)
    ]);

    return {
      coarse: coarseVectors,
      medium: mediumVectors,
      fine: fineVectors
    };
  }

  private async vectorizeChunkArray(chunks: string[]): Promise<number[][]> {
    const vectors: number[][] = [];
    
    for (const chunk of chunks) {
      const vector = await generateEmbedding(chunk);
      vectors.push(vector);
    }
    
    return vectors;
  }
}