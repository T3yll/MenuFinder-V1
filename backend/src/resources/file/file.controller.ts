import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { Public } from '@/common/decorators/security/public.decorator';
import MulterFile from '@/common/interfaces/multer-file.interface'; // Assurez-vous que ce chemin est correct

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile): Promise<File> {
    if (!file) {
      throw new HttpException('Aucun fichier trouvé', HttpStatus.BAD_REQUEST);
    }
    
    try {
      const result = await this.fileService.create(file);
      console.log('Fichier créé avec succès:', result);
      return result;
    } catch (error) {
      console.error('Erreur lors de la création du fichier:', error);
      throw new HttpException(
        `Erreur lors de l'upload du fichier: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Public()
  @Get()
  findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }
  @Public()   
  @Get(':id')
  findOne(@Param('id') id: string): Promise<File> {
    return this.fileService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() file: File): Promise<File> {
    return this.fileService.update(id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fileService.remove(id);
  }
}