import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MealService } from './meal.service';
import { Meal } from './entities/meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { Public } from '@/common/decorators/security/public.decorator';

@Controller('meals')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Public()
  @Post()
  create(@Body() createMealDto: CreateMealDto): Promise<Meal> {
    const meal = new Meal();
    meal.menu_id = createMealDto.menu_id;
    meal.name = createMealDto.name;
    meal.description = createMealDto.description;
    meal.price = createMealDto.price;
    meal.meal_category_id = createMealDto.meal_category_id;
    meal.image_file_id = createMealDto.image_file_id;
    
    return this.mealService.create(meal);
  }

  @Public()
  @Get()
  findAll(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Meal> {
    return this.mealService.findOne(+id);
  }

  // Cette route a été supprimée car elle est maintenant gérée par MenuController
  // @Public()
  // @Get('menu/:id')
  // findByMenu(@Param('id') id: string): Promise<Meal[]> {
  //   return this.mealService.findByMenu(+id);
  // }

  @Public()
  @Get('category/:id')
  findByCategory(@Param('id') id: string): Promise<Meal[]> {
    return this.mealService.findByCategorie(+id);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMealDto: Partial<Meal>): Promise<Meal> {
    return this.mealService.update(+id, updateMealDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.mealService.remove(+id);
  }
}