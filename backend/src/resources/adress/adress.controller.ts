import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Adress } from './entities/adress.entity';
import { AdressService } from './adress.service';

@Controller('adresses')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post()
  create(@Body() adresse: Adress): Promise<Adress> {
    return this.adressService.create(adresse);
  }

  @Get()
  findAll(): Promise<Adress[]> {
    return this.adressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Adress> {
    return this.adressService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() adresse: Adress): Promise<Adress> {
    return this.adressService.update(+id, adresse);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.adressService.remove(+id);
  }
}