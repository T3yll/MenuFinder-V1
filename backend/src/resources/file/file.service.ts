import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { File } from './entities/file.entity';

// Interface pour le fichier uploadé, pour éviter les erreurs de type Express.Multer
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

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

  findOne(id: number): Promise<File> {
    return this.fileRepository.findOne({ where: { file_id: id } });
  }

  async update(id: number, file: File): Promise<File> {
    await this.fileRepository.update(id, file);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const file = await this.findOne(id);
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    await this.fileRepository.delete(id);
  }
}