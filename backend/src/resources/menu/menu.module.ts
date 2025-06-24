import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { MealModule } from '../meal/meal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    MealModule // Importez MealModule pour pouvoir utiliser MealService
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}