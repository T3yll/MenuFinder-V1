import { Module } from '@nestjs/common';
import { RestaurantTagController } from './restauranttag.controller';
import { RestaurantTagService } from './restauranttag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantTag } from './entities/restauranttag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantTag])],
  controllers: [RestaurantTagController],
  providers: [RestaurantTagService],
})
export class RestauranttagModule {}
