import axios from 'axios';
import { Menu } from '../types/Restaurant';

// Base URL de l'API
const API_URL = 'http://localhost:3000/api';

// Structure pour la création d'un menu
export interface CreateMenuDto {
  restaurant_id: number;
  name: string;
  description: string;
}

// Structure pour la création d'un plat
export interface CreateMealDto {
  menu_id: number;
  name: string;
  description: string;
  price: number;
  meal_category_id?: number;
  image_file_id?: number;
}

// Service pour les menus
export const MenuService = {
  // Créer un nouveau menu
  async create(menuData: CreateMenuDto): Promise<Menu> {
    try {
      const response = await axios.post(`${API_URL}/menus`, menuData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du menu:', error);
      throw error;
    }
  },

  // Récupérer tous les menus d'un restaurant
  async findByRestaurant(restaurantId: number): Promise<Menu[]> {
    try {
      // On utilise maintenant la route restaurants/:id/menus
      const response = await axios.get(`${API_URL}/restaurants/${restaurantId}/menus`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des menus du restaurant ${restaurantId}:`, error);
      throw error;
    }
  },

  // Récupérer un menu par son ID
  async findOne(menuId: number): Promise<Menu> {
    try {
      const response = await axios.get(`${API_URL}/menus/${menuId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du menu ${menuId}:`, error);
      throw error;
    }
  },

  // Mettre à jour un menu
  async update(menuId: number, menuData: Partial<Menu>): Promise<Menu> {
    try {
      const response = await axios.put(`${API_URL}/menus/${menuId}`, menuData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du menu ${menuId}:`, error);
      throw error;
    }
  },

  // Supprimer un menu
  async remove(menuId: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/menus/${menuId}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression du menu ${menuId}:`, error);
      throw error;
    }
  }
};

// Service pour les plats
export const MealService = {
  // Créer un nouveau plat
  async create(mealData: CreateMealDto): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/meals`, mealData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du plat:', error);
      throw error;
    }
  },

  // Récupérer tous les plats d'un menu
  async findByMenu(menuId: number): Promise<any[]> {
    try {
      // Utiliser la route /menus/:id/meals au lieu de /meals/menu/:id
      const response = await axios.get(`${API_URL}/menus/${menuId}/meals`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des plats du menu ${menuId}:`, error);
      throw error;
    }
  },

  // Récupérer un plat par son ID
  async findOne(mealId: number): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/meals/${mealId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du plat ${mealId}:`, error);
      throw error;
    }
  },

  // Mettre à jour un plat
  async update(mealId: number, mealData: Partial<any>): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}/meals/${mealId}`, mealData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du plat ${mealId}:`, error);
      throw error;
    }
  },

  // Supprimer un plat
  async remove(mealId: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/meals/${mealId}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression du plat ${mealId}:`, error);
      throw error;
    }
  }
};