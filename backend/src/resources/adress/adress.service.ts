import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adress } from './entities/adress.entity';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private adressRepository: Repository<Adress>,
  ) {}

  create(adresse: Adress): Promise<Adress> {
    return this.adressRepository.save(adresse);
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