import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Adress } from './entities/adress.entity';
import { AdressService } from './adress.service';
import { Public } from '@/common/decorators/security/public.decorator';
import { CreateAdressDto } from './dto/create-adress.dto';

@Controller('adresses')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Public()
  @Post()
  create(@Body() createAdressDto: CreateAdressDto): Promise<Adress> {
    return this.adressService.create(createAdressDto);
  }

  @Public()
  @Get()
  findAll(): Promise<Adress[]> {
    return this.adressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Adress> {
    return this.adressService.findOne(+id);
  }
  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() adresse: Adress): Promise<Adress> {
    return this.adressService.update(+id, adresse);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.adressService.remove(+id);
  }
}