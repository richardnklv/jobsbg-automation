import { CVChunkingService } from '../../../shared/functions/chunking.service';
import * as fs from 'fs';
import * as path from 'path';

async function testChunking() {
  const chunkingService = new CVChunkingService();
  
  // Path to the normalized CV text file
  const normalizedTextPath = path.join(__dirname, '../normalization/normalized-cv-output.txt');
  
  // Read the normalized text
  const normalizedText = fs.readFileSync(normalizedTextPath, 'utf-8');
  
  // Chunk the text using multi-granularity chunking
  const chunks = await chunkingService.chunkCV(normalizedText);
  
  // Output path for the single file with all chunks
  const outputPath = path.join(__dirname, 'chunked-output.txt');
  
  // Combine all chunks into one string with clear section headers
  let outputContent = '';

  // Add coarse chunks
  outputContent += '=== COARSE GRANULARITY CHUNKS ===\n\n';
  chunks.coarse.forEach((chunk, index) => {
    outputContent += `--- COARSE CHUNK ${index + 1} ---\n${chunk}\n\n`;
  });

  // Add medium chunks
  outputContent += '=== MEDIUM GRANULARITY CHUNKS ===\n\n';
  chunks.medium.forEach((chunk, index) => {
    outputContent += `--- MEDIUM CHUNK ${index + 1} ---\n${chunk}\n\n`;
  });

  // Add fine chunks
  outputContent += '=== FINE GRANULARITY CHUNKS ===\n\n';
  chunks.fine.forEach((chunk, index) => {
    outputContent += `--- FINE CHUNK ${index + 1} ---\n${chunk}\n\n`;
  });

  // Write all chunks to a single file
  fs.writeFileSync(outputPath, outputContent);
  
  console.log('Multi-granularity chunking completed successfully!');
  console.log(`All chunks saved to: ${outputPath}`);
  console.log(`Coarse chunks: ${chunks.coarse.length}`);
  console.log(`Medium chunks: ${chunks.medium.length}`);
  console.log(`Fine chunks: ${chunks.fine.length}`);
  console.log(`Total chunks: ${chunks.coarse.length + chunks.medium.length + chunks.fine.length}`);
}

// Run the test
testChunking().catch(console.error);