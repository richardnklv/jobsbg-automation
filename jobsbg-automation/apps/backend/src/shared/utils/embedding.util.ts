/**
 * Generate embedding vector from text using all-MiniLM-L6-v2 model
 * This model produces 384-dimensional embeddings
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // Dynamically import the transformers library for ESM compatibility
    const { pipeline } = await import('@xenova/transformers');

    // Load the feature extraction pipeline with the specific model
    const extractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );

    // Generate the embedding
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    
    // Convert the tensor to a JavaScript array
    const embedding = Array.from(output.data);
    
    return embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
}