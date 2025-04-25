import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from './entities/file.entity';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() fileData: any): Promise<File> {
    return this.fileService.create(file, fileData);
  }

  @Get()
  findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<File> {
    return this.fileService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() file: File): Promise<File> {
    return this.fileService.update(+id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fileService.remove(+id);
  }
}