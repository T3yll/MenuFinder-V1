import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async count(): Promise<number> {
    const count = await this.restaurantRepository.count();
    return count;
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    // Vérifier si les clés étrangères existent avant de créer le restaurant
    try {
      // Créer une instance de Restaurant avec les données du DTO
      const restaurant = this.restaurantRepository.create(createRestaurantDto);
      
      // Sauvegarder dans la base de données
      return await this.restaurantRepository.save(restaurant);
    } catch (error) {
      console.error('Erreur lors de la création du restaurant:', error);
      
      // Vérifier si c'est une erreur de contrainte de clé étrangère
      if (error.message && error.message.includes('foreign key constraint')) {
        if (error.message.includes('FK_d2bcd8b81ebfcb0b8ddcf85ca6d')) {
          throw new Error(
            'Erreur de clé étrangère: Vérifiez que owner_id référence un utilisateur existant.'
          );
        } else if (error.message.includes('adress_id')) {
          throw new Error(
            'Erreur de clé étrangère: Vérifiez que adress_id référence une adresse existante.'
          );
        } else if (error.message.includes('image_file_id')) {
          throw new Error(
            'Erreur de clé étrangère: Vérifiez que image_file_id référence un fichier existant.'
          );
        }
      }
      
      throw error;
    }
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({
      relations: ['adress', 'owner', 'image']
    });
  }

  async findOne(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne({
      where: { restaurant_id: id },
      relations: ['adress', 'owner', 'image']
    });
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    await this.restaurantRepository.update(id, updateRestaurantDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.restaurantRepository.delete(id);
  }
}