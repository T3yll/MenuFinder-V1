import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(avis: CreateReviewDto): Promise<Review> {
    // Vérifier si un avis existe déjà pour ce user/restaurant
    const existing = await this.reviewRepository.findOne({
      where: { user_id: avis.user_id, restaurant_id: avis.restaurant_id }
    });
    if (existing) {
      throw new BadRequestException('Un avis existe déjà sur ce restaurant');
    }
    return this.reviewRepository.save(avis);
  }

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find({
      relations: ['user', 'restaurant', 'responses'],
      select: {
        user: {
          id: true,
          username: true,
          nom: true,
          prenom: true,
          email: true,
          bAdmin: true,
          image_file_id: true
        }
      }
    });
  }

  findOne(id: number): Promise<Review> {
    return this.reviewRepository.findOne({ 
      where: { review_id: id },
      relations: ['user', 'restaurant', 'responses'],
      select: {
        user: {
          id: true,
          username: true,
          nom: true,
          prenom: true,
          email: true,
          bAdmin: true,
          image_file_id: true
        }
      }
    });
  }

  async count(): Promise<Number> {
    const count = await this.reviewRepository.count();
    return count;
  }

  findByRestaurant(restaurantId: number): Promise<Review[]> {
    return this.reviewRepository.find({ 
      where: { restaurant_id: restaurantId },
      relations: ['user', 'restaurant', 'responses', 'responses.user'],
      select: {
        user: {
          id: true,
          username: true,
          nom: true,
          prenom: true,
          email: true,
          bAdmin: true,
          image_file_id: true
        },
        responses: {
          response_id: true,
          review_id: true,
          user_id: true,
          text: true,
          added_at: true,
          updated_at: true,
          user: {
            id: true,
            username: true,
            nom: true,
            prenom: true,
            email: true,
            bAdmin: true,
            image_file_id: true
          }
        }
      },
      order: { added_at: 'DESC' }
    });
  }

  async update(id: number, avis: Review): Promise<Review> {
    await this.reviewRepository.update(id, avis);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}