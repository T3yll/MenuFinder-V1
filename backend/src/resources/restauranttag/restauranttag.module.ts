import { Module } from '@nestjs/common';
import { RestauranttagService } from './restauranttag.service';
import { RestauranttagController } from './restauranttag.controller';

@Module({
  controllers: [RestauranttagController],
  providers: [RestauranttagService],
})
export class RestauranttagModule {}
