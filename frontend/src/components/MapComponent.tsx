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
import { Restaurant } from "../types/Restaurant";
import L from "leaflet";

interface MapComponentProps {
  latitude: number | null;
  longitude: number | null;
  restaurants: Restaurant[];
}

// ⬇️ Composant pour écouter le zoom de la carte et le propager au parent
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

  const handleClick = (restaurant: Restaurant) => {
    window.open(`/restaurant/${restaurant.restaurant_id}`, "_blank");
      }

  return (
    <MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom touchZoom>
      <ZoomListener onZoomChange={setZoom} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.restaurant_id}
          icon={
            new L.Icon({
              iconUrl: restaurant.imageUrl,
              iconSize: [zoom * 3, zoom * 3], // ✅ taille dynamique ici
              iconAnchor: [zoom, zoom * 2],
              popupAnchor: [0, -zoom * 2],
              className: "IconMarker",
            })
          }
          position={[
            restaurant.coordinates?.latitude || 0,
            restaurant.coordinates?.longitude || 0,
          ]}
        >
          <Popup>
            <RestaurantCard restaurant={restaurant} onClick={handleClick}/>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
