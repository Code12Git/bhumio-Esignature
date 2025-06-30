import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = this.pdfService.handleUpload(file);
      return result;
    } catch (error) {
      throw new Error('File upload failed', error);
    }
  }

  @Get('/preview/:filename')
  previewPdf(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = join(process.cwd(), 'uploads', filename);
      return res.sendFile(filePath, (err) => {
        if (err) {
          res.status(404).send('File not found');
        }
      });
    } catch (error) {
      throw new Error('File preview failed', error);
    }
  }
}
