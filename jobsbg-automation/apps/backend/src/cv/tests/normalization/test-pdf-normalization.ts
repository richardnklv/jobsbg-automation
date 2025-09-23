import { PdfNormalizationService } from '../../functions/pdf-normalization.service';
import * as fs from 'fs';
import * as path from 'path';

async function testPdfNormalization() {
  const normalizationService = new PdfNormalizationService();
  
  // Path to the CV PDF file
  const pdfPath = path.join(__dirname, '../Richard_Nikolov_CV.pdf');
  
  // Read the PDF file into a buffer
  const pdfBuffer = fs.readFileSync(pdfPath);
  
  // Normalize the PDF to text
  const normalizedText = await normalizationService.normalizePdfToText(pdfBuffer);
  
  // Output path for the normalized text
  const outputPath = path.join(__dirname, 'normalized-cv-output.txt');
  
  // Write the normalized text to file
  fs.writeFileSync(outputPath, normalizedText);
  
  console.log('PDF normalization completed successfully!');
  console.log(`Output saved to: ${outputPath}`);
  console.log(`Character count: ${normalizedText.length}`);
}

// Run the test
testPdfNormalization().catch(console.error);