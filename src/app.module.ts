import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { PdfController } from './uploads/pdf/pdf.controller';
import { PdfService } from './uploads/pdf/pdf.service';

@Module({
  imports: [MulterModule.register()], // required for file upload
  controllers: [AppController, PdfController],
  providers: [AppService, PdfService],
})
export class AppModule {}
