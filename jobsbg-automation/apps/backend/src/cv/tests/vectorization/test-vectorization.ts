import { CVChunkingService } from '../../../shared/functions/chunking.service';
import { VectorizationService } from '../../../shared/functions/vectorization.service';
import * as fs from 'fs';
import * as path from 'path';

async function testVectorization() {
  const chunkingService = new CVChunkingService();
  const vectorizationService = new VectorizationService();
  
  // Path to the normalized CV text file
  const normalizedTextPath = path.join(__dirname, '../normalization/normalized-cv-output.txt');
  
  // Read the normalized text
  const normalizedText = fs.readFileSync(normalizedTextPath, 'utf-8');
  
  // Get chunks from the chunking service
  const chunks = await chunkingService.chunkCV(normalizedText);
  
  console.log('Chunks obtained:');
  console.log(`- Coarse: ${chunks.coarse.length} chunks`);
  console.log(`- Medium: ${chunks.medium.length} chunks`);
  console.log(`- Fine: ${chunks.fine.length} chunks`);
  
  // Vectorize the chunks
  console.log('Starting vectorization...');
  const vectors = await vectorizationService.vectorizeChunks(chunks);
  
  console.log('Vectorization completed:');
  console.log(`- Coarse vectors: ${vectors.coarse.length} vectors, each with ${vectors.coarse[0]?.length || 0} dimensions`);
  console.log(`- Medium vectors: ${vectors.medium.length} vectors, each with ${vectors.medium[0]?.length || 0} dimensions`);
  console.log(`- Fine vectors: ${vectors.fine.length} vectors, each with ${vectors.fine[0]?.length || 0} dimensions`);
  
  // Save a summary to a file
  const outputPath = path.join(__dirname, 'vectorization-summary.txt');
  const outputContent = `
Vectorization Test Summary
=========================
Coarse chunks: ${chunks.coarse.length}
Coarse vectors: ${vectors.coarse.length} vectors, ${vectors.coarse[0]?.length || 0} dimensions each

Medium chunks: ${chunks.medium.length}
Medium vectors: ${vectors.medium.length} vectors, ${vectors.medium[0]?.length || 0} dimensions each

Fine chunks: ${chunks.fine.length}
Fine vectors: ${vectors.fine.length} vectors, ${vectors.fine[0]?.length || 0} dimensions each

Sample coarse vector (first 5 values): ${vectors.coarse[0]?.slice(0, 5).join(', ') || 'N/A'}
Sample medium vector (first 5 values): ${vectors.medium[0]?.slice(0, 5).join(', ') || 'N/A'}
Sample fine vector (first 5 values): ${vectors.fine[0]?.slice(0, 5).join(', ') || 'N/A'}
  `.trim();

  fs.writeFileSync(outputPath, outputContent);
  
  console.log(`Summary saved to: ${outputPath}`);
}

// Run the test
testVectorization().catch(console.error);