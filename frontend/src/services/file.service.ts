import { FileEntity } from "../types/Restaurant";
import axios from "axios";


const API_URL = process.env.VITE_API_URL;
// Service pour les fichiers

export const getPath = async(fileId: string): Promise<string> => {
    try {
      const response = await axios.get(`${API_URL}/files/${fileId}`);
      if (response.status === 200) {
        return response.data.path;
      } else {
        throw new Error(response.statusText);
      }
    }
    catch (error) {
      console.error('Erreur lors de la récupération du fichier:', error);
      return 'public/default.png'; // Chemin par défaut en cas d'erreur
    }
  }
  


  // Uploader un fichier
export const upload = async (file: Blob): Promise<FileEntity> =>{
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Afficher le contenu du FormData pour le debug
      console.log('FormData envoyé:', file instanceof File ? {
        name: (file as File).name,
        type: (file as File).type,
        size: (file as File).size
      } : 'Not a File object');
      
      const response = await axios.post(`${API_URL}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'upload du fichier:', error);
      throw error;
    }
  }