import React from "react";
import "../styles/components/MapComponent.scss";
import "../styles/components/leaflet.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import RestaurantCard from "./RestaurantCard";
import { RestaurantForMap } from "../types/Restaurant";
import L from "leaflet";

interface MapComponentProps {
  latitude: number | null;
  longitude: number | null;
  restaurants: RestaurantForMap[];
}

// Composant pour écouter le zoom de la carte
const ZoomListener: React.FC<{ onZoomChange: (zoom: number) => void }> = ({ onZoomChange }) => {
  useMapEvent("zoomend", (e) => {
    onZoomChange(e.target.getZoom());
  });
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, restaurants }) => {
  const lat: number = latitude || 48.8566; // Default to Paris
  const lng: number = longitude || 2.3522;

  const [zoom, setZoom] = React.useState<number>(13);

  const handleClick = (restaurant: RestaurantForMap) => {
    window.open(`/restaurant/${restaurant.restaurant_id}`, "_blank");
  }

  // Créer une icône personnalisée pour les restaurants
  const createRestaurantIcon = (restaurant: RestaurantForMap, zoom: number) => {
    // Couleurs selon le type de restaurant
    const getMarkerColor = (type: string) => {
      const colors: { [key: string]: string } = {
        'italien': '#ff6b35',
        'français': '#3498db',
        'asiatique': '#e74c3c',
        'fastfood': '#f39c12',
        'indien': '#9b59b6',
        'espagnol': '#e67e22',
        'méditerranéen': '#1abc9c',
        'végétarien': '#27ae60'
      };
      return colors[type?.toLowerCase()] || '#34495e';
    };

    const color = getMarkerColor(restaurant.type || '');
    
    // Créer un marqueur SVG personnalisé
    const svgIcon = `
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="12" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="15" cy="15" r="8" fill="white"/>
        <text x="15" y="19" text-anchor="middle" font-size="12" font-weight="bold" fill="${color}">
          ${restaurant.name.charAt(0).toUpperCase()}
        </text>
      </svg>
    `;

    return new L.DivIcon({
      html: svgIcon,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
      className: 'custom-restaurant-marker'
    });
  };

  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={zoom} 
      scrollWheelZoom 
      touchZoom
      style={{ height: '100%', width: '100%' }}
    >
      <ZoomListener onZoomChange={setZoom} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {restaurants.map((restaurant) => {
        // Vérifier que le restaurant a des coordonnées valides
        if (!restaurant.coordinates || 
            !restaurant.coordinates.latitude || 
            !restaurant.coordinates.longitude) {
          console.warn(`Restaurant ${restaurant.name} n'a pas de coordonnées valides`);
          return null;
        }

        return (
          <Marker
            key={restaurant.restaurant_id}
            icon={createRestaurantIcon(restaurant, zoom)}
            position={[
              restaurant.coordinates.latitude,
              restaurant.coordinates.longitude,
            ]}
          >
            <Popup maxWidth={300} closeButton={true}>
              <div className="restaurant-popup">
                <div className="popup-header">
                  <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    className="popup-image"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="popup-content">
                    <h3 className="popup-title">{restaurant.name}</h3>
                    <div className="popup-type">{restaurant.type}</div>
                    <div className="popup-rating">
                      <span className="stars">
                        {'★'.repeat(Math.floor(restaurant.rating || 0))}
                        {'☆'.repeat(5 - Math.floor(restaurant.rating || 0))}
                      </span>
                      <span className="rating-text">
                        ({restaurant.reviewCount || 0} avis)
                      </span>
                    </div>
                    <div className="popup-address">{restaurant.address}</div>
                    <div className="popup-price">{restaurant.priceRange}</div>
                  </div>
                </div>
                
                {restaurant.specialties && restaurant.specialties.length > 0 && (
                  <div className="popup-specialties">
                    <strong>Spécialités :</strong>
                    <div className="specialties-tags">
                      {restaurant.specialties.slice(0, 3).map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="popup-actions">
                  <button 
                    className="view-details-btn"
                    onClick={() => handleClick(restaurant)}
                  >
                    Voir les détails
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;