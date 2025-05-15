import React from 'react';
import MapComponent from '../components/MapComponent';
import useGeolocation from '../hooks/useGeolocation';
import InfoPopUp from '../components/InfoPopUp';
import { useEffect } from 'react';
import { Restaurant } from '../types/Restaurant';

const Map: React.FC = () => {
    const { latitude , longitude, error,loading} = useGeolocation();
    useEffect(() => {
        console.log("Lat:", latitude, "Lng:", longitude, "Error:", error);
      }, [latitude, longitude, error]);

    const sampleRestaurants: Restaurant[] = [
      {
        id: 1,
        name: "Chez Mario",
        category: "italien",
        rating: 4.8,
        reviewCount: 132,
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        address: "15 Rue de la Paix, 75002 Paris",
        priceRange: "€€",
        openingHours: "12h00 - 23h00",
        specialties: ["Pizza", "Pâtes", "Tiramisu"],
        coordinates: { latitude: 48.8688, longitude: 2.3305 }
      },
      {
        id: 2,
        name: "Le Bistrot Français",
        category: "français",
        rating: 4.6,
        reviewCount: 98,
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        address: "42 Rue du Faubourg Saint-Antoine, 75012 Paris",
        priceRange: "€€€",
        openingHours: "11h30 - 22h30",
        specialties: ["Bœuf bourguignon", "Coq au vin", "Crème brûlée"],
        coordinates: { latitude: 48.8519, longitude: 2.3752 }
      },
      {
        id: 3,
        name: "Sushi House",
        category: "asiatique",
        rating: 4.7,
        reviewCount: 156,
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        address: "8 Rue de la Roquette, 75011 Paris",
        priceRange: "€€",
        openingHours: "11h00 - 22h00",
        specialties: ["Sushi", "Sashimi", "Ramen"],
        coordinates: { latitude: 48.8575, longitude: 2.3771 }
      },
      {
        id: 4,
        name: "Burger Palace",
        category: "fastfood",
        rating: 4.3,
        reviewCount: 205,
        imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        address: "123 Avenue des Champs-Élysées, 75008 Paris",
        priceRange: "€",
        openingHours: "11h00 - 23h00",
        specialties: ["Burgers", "Frites", "Milkshakes"],
        coordinates: { latitude: 48.8698, longitude: 2.3076 }
      },
      {
        id: 5,
        name: "Le Jardin Vert",
        category: "vegetarien",
        rating: 4.5,
        reviewCount: 87,
        imageUrl: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
        address: "56 Rue Oberkampf, 75011 Paris",
        priceRange: "€€",
        openingHours: "12h00 - 21h30",
        specialties: ["Buddha bowl", "Salade composée", "Desserts vegan"],
        coordinates: { latitude: 48.8641, longitude: 2.3795 }
      },
      {
        id: 6,
        name: "La Méditerranée",
        category: "méditerranéen",
        rating: 4.4,
        reviewCount: 112,
        imageUrl: "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        address: "27 Rue de Rivoli, 75004 Paris",
        priceRange: "€€",
        openingHours: "12h00 - 22h30",
        specialties: ["Mezze", "Couscous", "Baklava"],
        coordinates: { latitude: 48.8556, longitude: 2.3622 }
      },
      {
        id: 7,
        name: "Spicy Corner",
        category: "indien",
        rating: 4.6,
        reviewCount: 92,
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        address: "18 Rue du Faubourg Saint-Denis, 75010 Paris",
        priceRange: "€€",
        openingHours: "12h00 - 23h00",
        specialties: ["Curry", "Naan", "Tandoori"],
        coordinates: { latitude: 48.8721, longitude: 2.3541 }
      },
      {
        id: 8,
        name: "Tapas & Co",
        category: "espagnol",
        rating: 4.5,
        reviewCount: 78,
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        address: "3 Rue de Buci, 75006 Paris",
        priceRange: "€€",
        openingHours: "18h00 - 00h00",
        specialties: ["Tapas", "Paella", "Sangria"],
        coordinates: { latitude: 48.8534, longitude: 2.3378 }
      }
    ,
    {
        id: 9,
        name: "Le Gourmet Toulousain",
        category: "français",
        rating: 4.7,
        reviewCount: 120,
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        address: "12 Rue du Taur, 31000 Toulouse",
        priceRange: "€€",
        openingHours: "12h00 - 22h00",
        specialties: ["Cassoulet", "Foie gras", "Magret de canard"],
        coordinates: { latitude: 43.6051, longitude: 1.4421 }
    },
    {
        id: 10,
        name: "Pizza Bella",
        category: "italien",
        rating: 4.5,
        reviewCount: 95,
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        address: "25 Allée Jean Jaurès, 31000 Toulouse",
        priceRange: "€€",
        openingHours: "11h30 - 23h00",
        specialties: ["Pizza", "Pâtes", "Tiramisu"],
        coordinates: { latitude: 43.6086, longitude: 1.4499 }
    },
    {
        id: 11,
        name: "Sushi Zen",
        category: "asiatique",
        rating: 4.6,
        reviewCount: 110,
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        address: "8 Rue des Filatiers, 31000 Toulouse",
        priceRange: "€€",
        openingHours: "12h00 - 22h30",
        specialties: ["Sushi", "Ramen", "Tempura"],
        coordinates: { latitude: 43.5993, longitude: 1.4442 }
    },
    {
        id: 12,
        name: "Le Jardin Indien",
        category: "indien",
        rating: 4.4,
        reviewCount: 85,
        imageUrl: "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        address: "15 Rue Gabriel Péri, 31000 Toulouse",
        priceRange: "€€",
        openingHours: "12h00 - 23h00",
        specialties: ["Curry", "Naan", "Tandoori"],
        coordinates: { latitude: 43.6074, longitude: 1.4525 }
    },
    {
        id: 13,
        name: "Burger Factory",
        category: "fastfood",
        rating: 4.3,
        reviewCount: 130,
        imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        address: "30 Avenue de l'URSS, 31400 Toulouse",
        priceRange: "€",
        openingHours: "11h00 - 23h00",
        specialties: ["Burgers", "Frites", "Milkshakes"],
        coordinates: { latitude: 43.5865, longitude: 1.4521 }
    },
    {
        id: 14,
        name: "Tapas del Sol",
        category: "espagnol",
        rating: 4.5,
        reviewCount: 90,
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        address: "5 Place du Capitole, 31000 Toulouse",
        priceRange: "€€",
        openingHours: "18h00 - 00h00",
        specialties: ["Tapas", "Paella", "Sangria"],
        coordinates: { latitude: 43.6045, longitude: 1.4442 }
    }
    ];


    return (
<div className="map-container">
            {loading && <InfoPopUp message="Loading..." type="info" open={true} onClose={() => {}} />}
            {error && <InfoPopUp message={"An error occured while trying to get your position"} type="error" open={true} onClose={() => {}} />} 
                <MapComponent key={`${latitude}-${longitude}`} latitude={latitude} longitude={longitude} restaurants={sampleRestaurants} />
        </div>
    );
};

export default Map;