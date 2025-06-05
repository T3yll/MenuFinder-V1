import axios from 'axios';

// Base URL de l'API
const API_URL = 'http://localhost:3000/api';

// Service pour les catégories de plats
export const MealCategoryService = {
  // Récupérer toutes les catégories
  async findAll(): Promise<any[]> {
    try {
      const response = await axios.get(`${API_URL}/meal-categories`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories de plats:', error);
      throw error;
    }
  },

  // Récupérer une catégorie par son ID
  async findOne(categoryId: number): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/meal-categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la catégorie ${categoryId}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle catégorie
  async create(data: { name: string; description?: string }): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/meal-categories`, data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      throw error;
    }
  },

  // Mettre à jour une catégorie
  async update(categoryId: number, data: Partial<{ name: string; description: string }>): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}/meal-categories/${categoryId}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la catégorie ${categoryId}:`, error);
      throw error;
    }
  },

  // Supprimer une catégorie
  async remove(categoryId: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/meal-categories/${categoryId}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la catégorie ${categoryId}:`, error);
      throw error;
    }
  }
};