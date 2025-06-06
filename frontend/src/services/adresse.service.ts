
import axios from 'axios';
import { CreateAdressDto,  } from '../contexts/create-adress.dto';
import { Adress } from '../types/Restaurant';


const API_URL = process.env.VITE_API_URL;

export const AdressService = {
  // Créer une nouvelle adresse
  async create(adressData: CreateAdressDto): Promise<Adress> {
    try {
      const response = await axios.post(`${API_URL}/adresses`, adressData,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'adresse:', error);
      throw error;
    }
  },
  async getAdresse(adresseId: number): Promise<Adress> {
    try {
      const response = await axios.get(`${API_URL}/adresses/${adresseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'adresse du restaurant ${adresseId}:`, error);
      throw error;
    }
  },
  async geocodeAddress(adress: any): Promise<{ latitude: number; longitude: number } | null>{
        try {
            const fullAddress = `${adress.number} ${adress.street}, ${adress.postal_code} ${adress.city}, ${adress.country}`;
            console.log('Géocodage de l\'adresse complète:', fullAddress);
            
            // Essayer plusieurs APIs de géocodage
            
            // 1. Essayer avec l'API du gouvernement français d'abord (plus fiable pour la France)
            if (adress.country.toLowerCase().includes('france')) {
                try {
                    const frenchApiUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(fullAddress)}&limit=1`;
                    console.log('Tentative avec API française:', frenchApiUrl);
                    
                    const frenchResponse = await fetch(frenchApiUrl);
                    if (frenchResponse.ok) {
                        const frenchData = await frenchResponse.json();
                        console.log('Réponse API française:', frenchData);
                        
                        if (frenchData.features && frenchData.features.length > 0) {
                            const coordinates = {
                                latitude: frenchData.features[0].geometry.coordinates[1],
                                longitude: frenchData.features[0].geometry.coordinates[0]
                            };
                            console.log('✅ Coordonnées trouvées avec API française:', coordinates);
                            return coordinates;
                        }
                    }
                } catch (frenchError) {
                    console.log('❌ Échec API française:', frenchError);
                }
            }
            
            // 2. Fallback vers Nominatim avec retry
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    console.log(`Tentative ${attempt}/3 avec Nominatim`);
                    
                    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1&countrycodes=fr&addressdetails=1`;
                    
                    const response = await fetch(nominatimUrl, {
                        headers: {
                            'User-Agent': 'MenuFinder-App/1.0'
                        }
                    });
                    
                    if (!response.ok) {
                        console.error(`Erreur HTTP Nominatim (tentative ${attempt}):`, response.status);
                        if (attempt < 3) {
                            await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); // Délai croissant
                            continue;
                        }
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    console.log(`Réponse Nominatim (tentative ${attempt}):`, data);
                    
                    if (data && data.length > 0) {
                        const coordinates = {
                            latitude: parseFloat(data[0].lat),
                            longitude: parseFloat(data[0].lon)
                        };
                        console.log('✅ Coordonnées trouvées avec Nominatim:', coordinates);
                        return coordinates;
                    } else {
                        console.log(`Aucun résultat Nominatim (tentative ${attempt})`);
                    }
                    break;
                } catch (nominatimError) {
                    console.error(`❌ Erreur Nominatim (tentative ${attempt}):`, nominatimError);
                    if (attempt < 3) {
                        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
                    }
                }
            }
            
            console.log('❌ Tous les services de géocodage ont échoué');
            return null;
        } catch (error) {
            console.error('❌ Erreur générale lors du géocodage:', error);
            return null;
        }
    }
};