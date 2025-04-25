import { Module } from '@nestjs/common';
import { RestaurantTagController } from './restauranttag.controller';
import { RestaurantTagService } from './restauranttag.service';

@Module({
  controllers: [RestaurantTagController],
  providers: [RestaurantTagService],
})
export class RestauranttagModule {}
