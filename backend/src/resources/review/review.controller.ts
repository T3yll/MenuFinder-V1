import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @Get('count')
  @ApiOperation({ summary: 'Get the total number of reviews' })
  @ApiResponse({
    status: 200,
    description: 'The total number of reviews',
    type: Number,
  })
  async count(): Promise<object> {
    return {code:200,count : await this.reviewService.count()};
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