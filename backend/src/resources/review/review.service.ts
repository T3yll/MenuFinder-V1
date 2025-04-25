import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  create(avis: Review): Promise<Review> {
    return this.reviewRepository.save(avis);
  }

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  findOne(id: number): Promise<Review> {
    return this.reviewRepository.findOne({ where: { review_id: id } });
  }

  findByRestaurant(restaurantId: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { restaurant_id: restaurantId } });
  }

  async update(id: number, avis: Review): Promise<Review> {
    await this.reviewRepository.update(id, avis);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}