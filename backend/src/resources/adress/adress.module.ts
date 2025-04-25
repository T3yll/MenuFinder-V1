import { Module } from '@nestjs/common';
import { AdressService } from './adress.service';
import { AdressController } from './adress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adress])],
  controllers: [AdressController],
  providers: [AdressService],
})
export class AdressModule {}
