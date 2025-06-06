import { useState, useEffect } from 'react';
import { AdressService } from '../services/adresse.service';

export const useLocalisation = (id: number) => {
  const [localisation, setLocalisation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocalisation = async () => {
      try {
        const data = await AdressService.getAdresse(id);
        
        setLocalisation(await AdressService.geocodeAddress(data) || undefined);
      } catch (err) {
        setError('Erreur lors de la récupération de la localisation');
      } finally {
        setLoading(false);
      }
    };

    fetchLocalisation();
  }, [id]);

  return { localisation, error, loading };
};