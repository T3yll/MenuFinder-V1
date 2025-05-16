import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adress } from './entities/adress.entity';
import { GetCoordinates } from '@/common/utils/ApiBanService';
import { CreateAdressDto } from './dto/create-adress.dto';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private adressRepository: Repository<Adress>,
  ) {}

  async create(@Body() dto: CreateAdressDto): Promise<Adress> {
    let lat: number;
    let lon: number;
    let adresse:Adress = dto as Adress;
    ({ lat, lon } = await GetCoordinates(dto));
    adresse.latitude = lat;
    adresse.longitude = lon;
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