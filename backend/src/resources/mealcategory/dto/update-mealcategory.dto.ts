import { PartialType } from '@nestjs/swagger';
import { CreateMealcategoryDto } from './create-mealcategory.dto';

export class UpdateMealcategoryDto extends PartialType(CreateMealcategoryDto) {}
