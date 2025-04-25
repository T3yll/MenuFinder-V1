import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() review: Review): Promise<Review> {
    return this.reviewService.create(review);
  }

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(+id);
  }

  @Get('restaurant/:id')
  findByRestaurant(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.findByRestaurant(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() review: Review): Promise<Review> {
    return this.reviewService.update(+id, review);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewService.remove(+id);
  }
}