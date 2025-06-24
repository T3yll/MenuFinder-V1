import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adress } from './entities/adress.entity';
import { CreateAdressDto } from './dto/create-adress.dto';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private adressRepository: Repository<Adress>,
  ) {}

  create(createAdressDto: CreateAdressDto): Promise<Adress> { // ← Utiliser CreateAdressDto
    // Créer une nouvelle instance d'entité à partir du DTO
    const adress = this.adressRepository.create(createAdressDto);
    return this.adressRepository.save(adress);
  }

  findAll(): Promise<Adress[]> {
    return this.adressRepository.find();
  }

  findOne(id: number): Promise<Adress> {
    return this.adressRepository.findOne({ where: { adress_id: id } });
  }

  async update(id: number, adress: Adress): Promise<Adress> {
    await this.adressRepository.update(id, adress);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.adressRepository.delete(id);
  }
}