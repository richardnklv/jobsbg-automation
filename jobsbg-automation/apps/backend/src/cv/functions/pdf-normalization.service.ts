import { Injectable } from '@nestjs/common';
import pdfParse from 'pdf-parse';

@Injectable()
export class PdfNormalizationService {
  /**
   * Extract and normalize text from a PDF file buffer
   * @param fileBuffer Buffer containing PDF data
   * @returns Normalized text content with preserved paragraph structure
   */
  async normalizePdfToText(fileBuffer: Buffer): Promise<string> {
    try {
      // Extract text from PDF buffer
      const data = await pdfParse(fileBuffer);
      
      // Normalize the text: preserve paragraphs while cleaning whitespace
      let normalized = data.text.replace(/\n\s*\n/g, '\n\n');
      normalized = normalized.replace(/[ \t]+/g, ' ');
      
      return normalized.trim();
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }
}