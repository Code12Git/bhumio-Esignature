import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PdfService {
  handleUpload(file?: Express.Multer.File): {
    message: string;
    filename: string;
    path: string;
  } {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    return {
      message: 'PDF uploaded successfully',
      filename: file.filename,
      path: file.path,
    };
  }
}
