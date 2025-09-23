import { Injectable } from '@nestjs/common';
import { generateEmbedding } from '../utils/embedding.util';

@Injectable()
export class CVChunkingService {
  
  async chunkCV(text: string): Promise<{
    coarse: string[];   
    medium: string[];     
    fine: string[];     
  }> {
    return {
      coarse: await this.coarseChunk(text),
      medium: await this.mediumChunk(text), 
      fine: await this.fineChunk(text)
    };
  }

  private async coarseChunk(text: string): Promise<string[]> {
    return await this.semanticChunk(text, 0.60, 600);
  }

  private async mediumChunk(text: string): Promise<string[]> {
    return await this.semanticChunk(text, 0.75, 400);
  }

  private async fineChunk(text: string): Promise<string[]> {
    return await this.semanticChunk(text, 0.85, 200);
  }

  private async semanticChunk(text: string, threshold: number, minSize: number): Promise<string[]> {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
    
    if (sentences.length <= 2) return [text];

    const chunks: string[] = [];
    let currentChunk: string[] = [];
    let previousEmbedding: number[] | null = null;

    for (const sentence of sentences) {
      const embedding = await generateEmbedding(sentence);

      if (previousEmbedding && currentChunk.length > 0) {
        const similarity = this.cosineSimilarity(previousEmbedding, embedding);
        const chunkText = currentChunk.join(' ');
        
        if (similarity < threshold && chunkText.length >= minSize) {
          chunks.push(chunkText);
          currentChunk = [];
        }
      }

      currentChunk.push(sentence);
      previousEmbedding = embedding;
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
    }

    // Merge small chunks
    return this.mergeSmallChunks(chunks, minSize);
  }

  private mergeSmallChunks(chunks: string[], minSize: number): string[] {
    const merged: string[] = [];
    let current = '';

    for (const chunk of chunks) {
      if (current.length + chunk.length < minSize * 2) {
        current = current ? current + '\n\n' + chunk : chunk;
      } else {
        if (current) merged.push(current);
        current = chunk;
      }
    }

    if (current) merged.push(current);
    return merged;
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (normA * normB);
  }
}