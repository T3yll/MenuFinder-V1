import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantTagDto } from './create-restauranttag.dto';

export class UpdateRestauranttagDto extends PartialType(CreateRestaurantTagDto) {}
