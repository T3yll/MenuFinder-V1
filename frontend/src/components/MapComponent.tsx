import React, { useState } from "react";
import "../styles/components/MapComponent.scss";
import "../styles/components/leaflet.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import { RestaurantForMap } from "../types/Restaurant";
import L from "leaflet";
import { Box, Typography, IconButton, Chip, Avatar } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import DirectionsIcon from '@mui/icons-material/Directions';

interface MapComponentProps {
  latitude?: number ;
  longitude?: number;
  restaurants: RestaurantForMap[];
}

// Animations
const popupEntrance = keyframes`
  0% {
    transform: scale(0.3) translateY(20px);
    opacity: 0;
    filter: blur(5px);
  }
  50% {
    transform: scale(1.05) translateY(-5px);
    filter: blur(1px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
    filter: blur(0px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Styled components pour le popup moderne
const ModernPopupContainer = styled(Box)({
  minWidth: '320px',
  maxWidth: '380px',
  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: '0',
  boxShadow: `
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8)
  `,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  animation: `${popupEntrance} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
  overflow: 'hidden',
  margin: '0',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-200%',
    width: '200%',
    height: '100%',
    background: `linear-gradient(
      90deg,
      transparent,
      rgba(59, 130, 246, 0.1),
      transparent
    )`,
    animation: `${shimmer} 3s infinite`,
  }
});

const PopupHeader = styled(Box)<{ restaurantType: string }>(({ restaurantType }) => {
  const getGradientColor = (type: string) => {
    const gradients: { [key: string]: string } = {
      'italien': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      'français': 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      'asiatique': 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      'fastfood': 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
      'indien': 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
      'espagnol': 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
      'méditerranéen': 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)',
      'végétarien': 'linear-gradient(135deg, #27ae60 0%, #229954 100%)'
    };
    return gradients[type?.toLowerCase()] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  return {
    position: 'relative',
    padding: '0',
    background: getGradientColor(restaurantType),
    color: 'white',
    borderRadius: '20px 20px 0 0',
    overflow: 'hidden',
  };
});

const ImageSection = styled(Box)({
  position: 'relative',
  height: '140px',
  overflow: 'hidden',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    pointerEvents: 'none',
  }
});

const RestaurantImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  
  '&:hover': {
    transform: 'scale(1.05)',
  }
});

const HeaderContent = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '20px',
  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  zIndex: 2,
});

const RestaurantAvatar = styled(Avatar)<{ restaurantType: string }>(({ restaurantType }) => {
  const getAvatarColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'italien': 'linear-gradient(135deg, #ff9a56 0%, #ffad56 100%)',
      'français': 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      'asiatique': 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
      'fastfood': 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
      'indien': 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
      'espagnol': 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
      'méditerranéen': 'linear-gradient(135deg, #55efc4 0%, #00cec9 100%)',
      'végétarien': 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)'
    };
    return colors[type?.toLowerCase()] || 'linear-gradient(135deg, #ff9a56 0%, #ffad56 100%)';
  };

  return {
    width: '56px',
    height: '56px',
    marginBottom: '12px',
    background: getAvatarColor(restaurantType),
    fontSize: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  };
});

const ContentSection = styled(Box)({
  padding: '20px',
});

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  padding: '8px 12px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  
  '& .icon': {
    marginRight: '12px',
    color: '#6366f1',
    fontSize: '18px',
  },
  
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    transform: 'translateX(2px)',
  },
  
  transition: 'all 0.3s ease',
});

const ActionButtonsRow = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginTop: '8px',
});

const MiniActionButton = styled(IconButton)<{ variant?: 'primary' | 'secondary' }>(({ variant = 'secondary' }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '10px',
  backgroundColor: variant === 'primary' 
    ? 'rgba(255, 255, 255, 0.2)' 
    : 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'white',
  backdropFilter: 'blur(10px)',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(1.1)',
  },
  
  transition: 'all 0.3s ease',
}));

const RatingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px',
  padding: '12px 16px',
  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
  borderRadius: '12px',
  border: '1px solid rgba(251, 191, 36, 0.2)',
});

const StarRating = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
});

const ViewDetailsButton = styled(Box)({
  marginTop: '16px',
  padding: '12px 20px',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: 'white',
  borderRadius: '12px',
  textAlign: 'center',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '14px',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
  }
});

// Composant pour écouter le zoom de la carte
const ZoomListener: React.FC<{ onZoomChange: (zoom: number) => void }> = ({ onZoomChange }) => {
  useMapEvent("zoomend", (e) => {
    onZoomChange(e.target.getZoom());
  });
  return null;
};

// Composant du popup moderne intégré
const ModernRestaurantPopup: React.FC<{ restaurant: RestaurantForMap }> = ({ restaurant }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} sx={{ color: '#fbbf24', fontSize: '16px' }} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" sx={{ color: '#fbbf24', fontSize: '16px' }} />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<StarOutlineIcon key={`empty-${i}`} sx={{ color: '#d1d5db', fontSize: '16px' }} />);
    }
    
    return stars;
  };

  const formatAddress = (address: any) => {
    if (!address) return restaurant.address || 'Adresse non disponible';
    return `${address.number || ''} ${address.street || ''}, ${address.city || ''}`.trim();
  };

  const handleClick = () => {
    window.open(`/restaurants/${restaurant.restaurant_id}`, "_blank");
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

  return (
    <ModernPopupContainer>
      <PopupHeader restaurantType={restaurant.type || ''}>
        <ImageSection>
          <RestaurantImage
            src={imageError ? defaultImage : (restaurant.imageUrl || defaultImage)}
            alt={restaurant.name}
            onError={handleImageError}
          />
        </ImageSection>
        
        <HeaderContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  fontSize: '18px',
                  marginBottom: '6px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  color: 'white'
                }}
              >
                {restaurant.name}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' }}>
                <Chip 
                  label={restaurant.type || 'Restaurant'}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                {restaurant.priceRange && (
                  <Chip 
                    label={restaurant.priceRange}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: '11px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                )}
              </Box>
            </Box>
            
            <ActionButtonsRow>
              <MiniActionButton 
                variant={isFavorite ? 'primary' : 'secondary'}
                onClick={() => setIsFavorite(!isFavorite)}
                size="small"
              >
                {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </MiniActionButton>
              <MiniActionButton size="small">
                <ShareIcon fontSize="small" />
              </MiniActionButton>
              <MiniActionButton variant="primary" size="small">
                <DirectionsIcon fontSize="small" />
              </MiniActionButton>
            </ActionButtonsRow>
          </Box>
        </HeaderContent>
      </PopupHeader>

      <ContentSection>
        <InfoRow>
          <LocationOnIcon className="icon" />
          <Typography variant="body2" sx={{ color: '#374151', fontSize: '13px' }}>
            {formatAddress(restaurant.adress)}
          </Typography>
        </InfoRow>
        
        {restaurant.specialties && restaurant.specialties.length > 0 && (
          <InfoRow>
            <RestaurantIcon className="icon" />
            <Typography variant="body2" sx={{ color: '#374151', fontSize: '13px' }}>
              {restaurant.specialties.slice(0, 2).join(', ')}
            </Typography>
          </InfoRow>
        )}

        <RatingContainer>
          <Box>
            <StarRating>
              {renderStars(restaurant.rating || 0)}
            </StarRating>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                color: '#92400e',
                fontSize: '14px',
                marginTop: '2px'
              }}
            >
              {(restaurant.rating || 0).toFixed(1)} / 5
            </Typography>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#92400e',
              fontSize: '12px',
              fontWeight: 500,
              opacity: 0.8
            }}
          >
            {restaurant.reviewCount || 0} avis
          </Typography>
        </RatingContainer>

        <ViewDetailsButton onClick={handleClick}>
          🍽️ Voir le menu et détails
        </ViewDetailsButton>
      </ContentSection>
    </ModernPopupContainer>
  );
};

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, restaurants }) => {
  const [lat, setLat] = React.useState<number>(latitude || 48.8566);
  const [lng, setLng] = React.useState<number>(longitude || 2.3522);
  React.useEffect(() => {
    if (latitude) {
      setLat(latitude);
    }
  }, [latitude]);
  React.useEffect(() => {
    if (longitude) {
      setLng(longitude);
    }
  }, [longitude]);
  const [zoom, setZoom] = React.useState<number>(13);


  // Créer une icône personnalisée pour les restaurants (votre logique existante améliorée)
  const createRestaurantIcon = (restaurant: RestaurantForMap, zoom: number) => {
    // Couleurs selon le type de restaurant (votre logique existante)
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
    
    // SVG amélioré avec effets
    const svgIcon = `
      <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
          </filter>
        </defs>
        <circle cx="18" cy="18" r="15" fill="${color}" stroke="white" stroke-width="3" filter="url(#shadow)"/>
        <circle cx="18" cy="18" r="10" fill="white" opacity="0.9"/>
        <text x="18" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="${color}">
          ${restaurant.name.charAt(0).toUpperCase()}
        </text>
      </svg>
    `;

    return new L.DivIcon({
      html: svgIcon,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
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
        // Vérifier que le restaurant a des coordonnées valides (votre logique existante)
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
            <Popup 
              maxWidth={400} 
              closeButton={false}
              className="modern-restaurant-popup"
            >
              <ModernRestaurantPopup restaurant={restaurant} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;