import { PartialType } from '@nestjs/swagger';
import { CreateRestauranttagDto } from './create-restauranttag.dto';

export class UpdateRestauranttagDto extends PartialType(CreateRestauranttagDto) {}
