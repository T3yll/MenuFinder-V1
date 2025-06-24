import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    MenuModule // Importez MenuModule pour pouvoir utiliser MenuService
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}