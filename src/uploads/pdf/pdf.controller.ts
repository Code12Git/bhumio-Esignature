import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('pdf') //this is used for making routes like /pdf
export class PdfController {
  constructor(private readonly pdfService: PdfService) {} // this is used for inject PdfService which we make in pdf.service.ts

  @Post('upload') // this is used for making post request like /pdf/upload POST
  @UseInterceptors(
    //used for file uploading
    FileInterceptor('file', {
      storage: diskStorage({
        // FileInterceptor grabs the file from the file field in the request.
        destination: './uploads', //files are saved in upload folder
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.pdfService.handleUpload(file); //initializing the class or accessing method in class
  }
}
