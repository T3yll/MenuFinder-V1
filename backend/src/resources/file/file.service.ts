import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { File } from './entities/file.entity';
import  MulterFile from '@/common/interfaces/multer-file.interface';



@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create(file: MulterFile): Promise<File> {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = Date.now() + path.extname(file.originalname);
    const filePath = path.join(uploadDir, fileName);
    
    fs.writeFileSync(filePath, file.buffer);

    const newFile = new File();
    newFile.name = file.originalname;
    newFile.path = filePath;
    newFile.type = file.mimetype;

    return this.fileRepository.save(newFile);
  }

  findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  findOne(id: string): Promise<File> {
    return this.fileRepository.findOne({ where: { file_id: id } });
  }

  async update(id: string, file: File): Promise<File> {
    await this.fileRepository.update(id, file);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const file = await this.findOne(id);
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    await this.fileRepository.delete(id);
  }
}