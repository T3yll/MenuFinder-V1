import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';
import { Public } from '@/common/decorators/security/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() review: CreateReviewDto): Promise<Review> {
    try {
      return await this.reviewService.create(review);
    } catch (error) {
      if (error.message === 'Un avis existe déjà sur ce restaurant') {
        throw new BadRequestException('Un avis existe déjà sur ce restaurant');
      }
      throw new BadRequestException(error.message || 'Erreur lors de la création de l\'avis');
    }
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

  @Public()
  @Get('restaurant/:id')
  findByRestaurant(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.findByRestaurant(+id);
  }

  @Public()
  @Get('user/:id')
  findByUser(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.findByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(+id);
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