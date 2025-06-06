import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude?: number ;
  longitude?: number;
  error: string | null;
  loading: boolean;
  permission: 'granted' | 'denied' | 'prompt' | 'unknown';
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: undefined,
    longitude: undefined,
    error: null,
    loading: true,
    permission: 'unknown'
  });

  useEffect(() => {
    // Vérifier si la géolocalisation est supportée
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: "La géolocalisation n'est pas supportée par votre navigateur",
        loading: false,
        permission: 'denied'
      }));
      return;
    }

    // Vérifier les permissions avant de demander la position
    const checkPermissions = async () => {
      try {
        if ('permissions' in navigator) {
          const result = await navigator.permissions.query({ name: 'geolocation' });
          
          if (result.state === 'denied') {
            // Permission refusée, utiliser Paris par défaut
            setState({
              latitude: 48.8566,
              longitude: 2.3522,
              error: null,
              loading: false,
              permission: 'denied'
            });
            return;
          }
        }

        // Essayer d'obtenir la position
        getCurrentPosition();
      } catch (error) {
        // Fallback si l'API permissions n'est pas disponible
        getCurrentPosition();
      }
    };

    const getCurrentPosition = () => {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000, // 10 secondes
        maximumAge: 300000 // 5 minutes
      };

      const success = (position: GeolocationPosition) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
          permission: 'granted'
        });
      };

      const error = (error: GeolocationPositionError) => {
        let errorMessage = '';
        let defaultLocation = { latitude: 48.8566, longitude: 2.3522 }; // Paris par défaut

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Géolocalisation refusée. Utilisation de Paris par défaut.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Position non disponible. Utilisation de Paris par défaut.";
            break;
          case error.TIMEOUT:
            errorMessage = "Délai d'attente dépassé. Utilisation de Paris par défaut.";
            break;
          default:
            errorMessage = "Erreur de géolocalisation. Utilisation de Paris par défaut.";
            break;
        }

        // Utiliser la position par défaut au lieu de bloquer l'application
        setState({
          latitude: defaultLocation.latitude,
          longitude: defaultLocation.longitude,
          error: errorMessage,
          loading: false,
          permission: 'denied'
        });
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    };

    checkPermissions();
  }, []);

  return state;
};

export default useGeolocation;