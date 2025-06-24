import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ) {}

  create(favori: CreateBookmarkDto): Promise<Bookmark> {
    return this.bookmarkRepository.save(favori);
  }

  findAll(): Promise<Bookmark[]> {
    return this.bookmarkRepository.find();
  }

  findByUser(userId: number): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({ where: { user_id: userId } });
  }

  findByRestaurant(restaurantId: number): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({ where: { restaurant_id: restaurantId } });
  }

  findByRestaurantAndUser(restaurantId: number, userId: number): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({
      where: { restaurant_id: restaurantId, user_id: userId },
    });
  }

  async remove(restaurantId: number, userId: number): Promise<void> {
    await this.bookmarkRepository.delete({ restaurant_id: restaurantId, user_id: userId });
  }
}