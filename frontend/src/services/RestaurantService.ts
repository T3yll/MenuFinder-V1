import axios from 'axios';
import { CreateRestaurantDto } from '../contexts/create-restaurant.dto';
import { Adress, FileEntity, Restaurant } from '../types/Restaurant';
import { CreateAdressDto } from '../contexts/create-adress.dto';
import { upload } from './file.service';
// Base URL de l'API
const API_URL = process.env.VITE_API_URL;

// Intercepteur pour afficher les détails des erreurs
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Réponse d\'erreur:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('Erreur de requête:', error.request);
    } else {
      console.error('Erreur:', error.message);
    }
    return Promise.reject(error);
  }
);

// Service pour les restaurants
export const RestaurantService = {
  // Créer un nouveau restaurant
  async create(restaurantData: CreateRestaurantDto): Promise<Restaurant> {
    try {
      const response = await axios.post(`${API_URL}/restaurants`, restaurantData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du restaurant:', error);
      throw error;
    }
  },

  // Récupérer tous les restaurants
  async findAll(): Promise<Restaurant[]> {
    try {
      const response = await axios.get(`${API_URL}/restaurants`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des restaurants:', error);
      throw error;
    }
  },

  // Récupérer un restaurant par son ID
  async findOne(id: number): Promise<Restaurant> {
    try {
      const response = await axios.get(`${API_URL}/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du restaurant ${id}:`, error);
      throw error;
    }
  },

  // Mettre à jour un restaurant
  async update(id: number, restaurantData: Partial<Restaurant>): Promise<Restaurant> {
    try {
      const response = await axios.put(`${API_URL}/restaurants/${id}`, restaurantData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du restaurant ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un restaurant
  async remove(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/restaurants/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression du restaurant ${id}:`, error);
      throw error;
    }
  }
};

// Service pour les adresses
export const AdressService = {
  // Créer une nouvelle adresse
  async create(adressData: CreateAdressDto): Promise<Adress> {
    try {
      const response = await axios.post(`${API_URL}/adresses`, adressData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'adresse:', error);
      throw error;
    }
  }
};


// Service combiné pour la création d'un restaurant avec son adresse et son image
export const RegisterRestaurantService = {
  async registerRestaurant(
    restaurantName: string,
    restaurantType: string,
    image: Blob,
    adressInfo: {
      street: string,
      city: string, 
      number: number,
      postal_code: number,
      country: string
    },
    ownerId: number
  ): Promise<Restaurant> {
    try {
      // 1. Créer l'adresse
      const adressData: CreateAdressDto = {
        number: adressInfo.number,
        street: adressInfo.street,
        city: adressInfo.city,
        postal_code: adressInfo.postal_code,
        country: adressInfo.country
      };
      
      console.log('1. Envoi des données d\'adresse:', adressData);
      const createdAdress = await AdressService.create(adressData);
      console.log('Adresse créée:', createdAdress);
      
      // 2. Uploader l'image
      console.log('2. Upload de l\'image...');
      const uploadedFile = await upload(image);
      console.log('Image uploadée:', uploadedFile);
      
      // 3. Créer le restaurant
      const restaurantData: CreateRestaurantDto = {
        name: restaurantName,
        type: restaurantType,
        adress_id: createdAdress.adress_id,
        image_file_id: uploadedFile.file_id,
        owner_id: ownerId
      };
      
      console.log('3. Envoi des données du restaurant:', restaurantData);
      const createdRestaurant = await RestaurantService.create(restaurantData);
      console.log('Restaurant créé:', createdRestaurant);
      
      return createdRestaurant;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du restaurant:', error);
      throw error;
    }
  }
};