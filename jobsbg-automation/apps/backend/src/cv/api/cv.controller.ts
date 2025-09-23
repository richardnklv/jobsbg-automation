import { Body, Controller, Post, UploadedFile, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvService } from '../services/cv.service';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post('upload')
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadCv(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any, // Get authenticated user from request
  ) {
    const candidateId = req.user.id; // Get candidate ID from authenticated user
    const result = await this.cvService.processCvUpload(file, candidateId);
    return {
      message: 'CV uploaded and processed successfully',
      cv: result,
    };
  }
}