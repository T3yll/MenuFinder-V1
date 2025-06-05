import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import useGeolocation from '../hooks/useGeolocation';
import InfoPopUp from '../components/InfoPopUp';
import { RestaurantService } from '../services/RestaurantService';
import { Restaurant, RestaurantForMap, adaptRestaurantForMap } from '../types/Restaurant';
import '../styles/pages/Map.scss';

const Map: React.FC = () => {
    const { latitude, longitude, error, loading: geoLoading, permission } = useGeolocation();
    const [restaurants, setRestaurants] = useState<RestaurantForMap[]>([]);
    const [restaurantsLoading, setRestaurantsLoading] = useState<boolean>(true);
    const [restaurantsError, setRestaurantsError] = useState<string | null>(null);
    const [showLocationInfo, setShowLocationInfo] = useState<boolean>(false);

    useEffect(() => {
        console.log("Lat:", latitude, "Lng:", longitude, "Error:", error, "Permission:", permission);
        
        // Afficher l'info de localisation pendant 3 secondes si géolocalisation refusée
        if (permission === 'denied' && error) {
            setShowLocationInfo(true);
            const timer = setTimeout(() => setShowLocationInfo(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [latitude, longitude, error, permission]);

    // Récupérer les restaurants via l'API
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setRestaurantsLoading(true);
                setRestaurantsError(null);
                
                const restaurantsData = await RestaurantService.findAll();
                console.log('Restaurants récupérés:', restaurantsData);
                
                // Vérifier si les adresses sont incluses
                restaurantsData.forEach((restaurant, index) => {
                    console.log(`Restaurant ${index} - ${restaurant.name}:`, {
                        restaurant_id: restaurant.restaurant_id,
                        adress_id: restaurant.adress_id,
                        adress: restaurant.adress
                    });
                });
                
                // Adapter les restaurants pour la carte et ajouter les coordonnées
                const adaptedRestaurants = await Promise.all(
                    restaurantsData.map(async (restaurant, index) => {
                        // Adapter le restaurant avec les champs calculés
                        const adaptedRestaurant = adaptRestaurantForMap(restaurant);
                        console.log(`Adaptation du restaurant ${index} - ${restaurant.name}:`, adaptedRestaurant);
                        
                        // Géocoder l'adresse pour obtenir les coordonnées
                        if (restaurant.adress) {
                            console.log(`Géocodage pour ${restaurant.name}:`, restaurant.adress);
                            
                            // Ajouter un délai entre les requêtes pour éviter le rate limiting
                            if (index > 0) {
                                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 seconde de délai
                            }
                            
                            const coordinates = await geocodeAddress(restaurant.adress);
                            console.log(`Coordonnées obtenues pour ${restaurant.name}:`, coordinates);
                            
                            if (coordinates) {
                                adaptedRestaurant.coordinates = coordinates;
                            } else {
                                console.warn(`Échec du géocodage pour ${restaurant.name}, utilisation de coordonnées par défaut`);
                                adaptedRestaurant.coordinates = getDefaultCoordinatesForRestaurant(index);
                            }
                        } else {
                            console.warn(`Pas d'adresse pour ${restaurant.name}, utilisation de coordonnées par défaut`);
                            adaptedRestaurant.coordinates = getDefaultCoordinatesForRestaurant(index);
                        }
                        
                        console.log(`Restaurant final ${restaurant.name}:`, adaptedRestaurant);
                        return adaptedRestaurant;
                    })
                );
                
                console.log('Tous les restaurants adaptés:', adaptedRestaurants);
                setRestaurants(adaptedRestaurants);
                
            } catch (err) {
                console.error('Erreur lors de la récupération des restaurants:', err);
                setRestaurantsError('Impossible de charger les restaurants');
            } finally {
                setRestaurantsLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    // Fonction pour géocoder une adresse (conversion adresse -> coordonnées)
    const geocodeAddress = async (adress: any): Promise<{ latitude: number; longitude: number } | null> => {
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
    };

    // Coordonnées par défaut variables pour éviter que tous les restaurants soient au même endroit
    const getDefaultCoordinatesForRestaurant = (index: number) => {
        const baseCoordinates = [
            { latitude: 48.8566, longitude: 2.3522 }, // Paris
            { latitude: 43.6047, longitude: 1.4442 }, // Toulouse
            { latitude: 45.7640, longitude: 4.8357 }, // Lyon
            { latitude: 43.2965, longitude: 5.3698 }, // Marseille
            { latitude: 47.2184, longitude: -1.5536 }, // Nantes
        ];
        
        const coords = baseCoordinates[index % baseCoordinates.length];
        
        // Ajouter un petit décalage aléatoire pour éviter que les restaurants se chevauchent
        return {
            latitude: coords.latitude + (Math.random() - 0.5) * 0.01,
            longitude: coords.longitude + (Math.random() - 0.5) * 0.01
        };
    };

    return (
        <div className="map-container">
            {geoLoading && (
                <InfoPopUp 
                    message="Récupération de votre position..." 
                    type="info" 
                    open={true} 
                    onClose={() => {}} 
                />
            )}
            
            {showLocationInfo && permission === 'denied' && (
                <InfoPopUp 
                    message="📍 Position par défaut : Paris. Autorisez la géolocalisation pour voir votre position exacte." 
                    type="info" 
                    open={true} 
                    onClose={() => setShowLocationInfo(false)} 
                />
            )}
            
            {restaurantsLoading && !geoLoading && (
                <InfoPopUp 
                    message="Chargement des restaurants..." 
                    type="info" 
                    open={true} 
                    onClose={() => {}} 
                />
            )}
            
            {restaurantsError && (
                <InfoPopUp 
                    message={restaurantsError} 
                    type="error" 
                    open={true} 
                    onClose={() => setRestaurantsError(null)} 
                />
            )}
            
            {/* Bouton pour réactiver la géolocalisation */}
            {permission === 'denied' && !showLocationInfo && (
                <div className="location-permission-banner">
                    <div className="banner-content">
                        <span>📍 Position approximative affichée</span>
                        <button 
                            className="enable-location-btn"
                            onClick={() => window.location.reload()}
                        >
                            Réessayer la géolocalisation
                        </button>
                    </div>
                </div>
            )}
            
            <MapComponent 
                key={`${latitude}-${longitude}-${restaurants.length}`} 
                latitude={latitude} 
                longitude={longitude} 
                restaurants={restaurants} 
            />
        </div>
    );
};

export default Map;