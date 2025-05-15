import { PartialType } from '@nestjs/swagger';
import { CreateMealCategoryDto } from './create-mealcategory.dto';

export class UpdateMealcategoryDto extends PartialType(CreateMealCategoryDto) {}
