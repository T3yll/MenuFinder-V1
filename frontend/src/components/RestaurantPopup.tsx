import React from 'react';
import { Box, Typography, IconButton, Chip, Avatar, Divider } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EuroIcon from '@mui/icons-material/Euro';
import { RestaurantForMap } from '../types/Restaurant';

interface RestaurantPopupProps {
  restaurant: RestaurantForMap;
  onClose: () => void;
}

const popupAnimation = keyframes`
  0% {
    transform: scale(0.3) translateY(20px);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
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

const PopupContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minWidth: '320px',
  maxWidth: '400px',
  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  padding: '0',
  boxShadow: `
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8)
  `,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  animation: `${popupAnimation} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
  overflow: 'hidden',
  
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
  },

  // Petite flèche en bas pour pointer vers le marker
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0',
    height: '0',
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderTop: '12px solid rgba(255,255,255,0.95)',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  }
}));

const HeaderSection = styled(Box)({
  position: 'relative',
  padding: '20px 24px 16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '12px',
  right: '12px',
  color: 'rgba(255,255,255,0.9)',
  backgroundColor: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  width: '32px',
  height: '32px',
  
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: 'scale(1.1) rotate(90deg)',
  },
  
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
});

const RestaurantAvatar = styled(Avatar)({
  width: '56px',
  height: '56px',
  marginBottom: '12px',
  background: 'linear-gradient(135deg, #ff9a56 0%, #ffad56 100%)',
  fontSize: '24px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
});

const ContentSection = styled(Box)({
  padding: '20px 24px 24px',
});

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  
  '& .icon': {
    marginRight: '12px',
    color: '#6366f1',
    fontSize: '20px',
  },
  
  '&:last-child': {
    marginBottom: 0,
  }
});

const RatingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '16px',
  padding: '12px 16px',
  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  borderRadius: '12px',
  border: '1px solid #f59e0b30',
});

const ActionButton = styled(Box)({
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

const getStatusColor = (isOpen: boolean) => ({
  backgroundColor: isOpen ? '#10b981' : '#ef4444',
  color: 'white'
});

const formatAddress = (address: any) => {
  if (!address) return 'Adresse non disponible';
  return `${address.number || ''} ${address.street || ''}, ${address.city || ''}`.trim();
};

const RestaurantPopup: React.FC<RestaurantPopupProps> = ({ restaurant, onClose }) => {
  const isOpen = restaurant.status === 'open'; // Ajustez selon votre logique
  const rating = restaurant.averageRating || 4.2; // Valeur par défaut si pas de note
  
  return (
    <PopupContainer>
      <HeaderSection>
        <CloseButton 
          size="small" 
          onClick={onClose}
          aria-label="Fermer"
        >
          <CloseIcon fontSize="small" />
        </CloseButton>
        
        <RestaurantAvatar>
          <RestaurantIcon />
        </RestaurantAvatar>
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            fontSize: '18px',
            marginBottom: '4px',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {restaurant.name}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip 
            label={isOpen ? "Ouvert" : "Fermé"}
            size="small"
            sx={{
              ...getStatusColor(isOpen),
              fontSize: '12px',
              fontWeight: 600
            }}
          />
          {restaurant.cuisine && (
            <Chip 
              label={restaurant.cuisine}
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '12px'
              }}
            />
          )}
        </Box>
      </HeaderSection>

      <ContentSection>
        {restaurant.adress && (
          <InfoRow>
            <LocationOnIcon className="icon" />
            <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
              {formatAddress(restaurant.adress)}
            </Typography>
          </InfoRow>
        )}
        
        {restaurant.phone && (
          <InfoRow>
            <PhoneIcon className="icon" />
            <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
              {restaurant.phone}
            </Typography>
          </InfoRow>
        )}
        
        <InfoRow>
          <AccessTimeIcon className="icon" />
          <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
            {restaurant.openingHours || "Horaires non disponibles"}
          </Typography>
        </InfoRow>
        
        {restaurant.priceRange && (
          <InfoRow>
            <EuroIcon className="icon" />
            <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
              {restaurant.priceRange}
            </Typography>
          </InfoRow>
        )}

        {restaurant.description && (
          <>
            <Divider sx={{ margin: '16px 0', opacity: 0.3 }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6b7280', 
                fontSize: '13px',
                lineHeight: 1.5,
                fontStyle: 'italic'
              }}
            >
              {restaurant.description}
            </Typography>
          </>
        )}

        <RatingContainer>
          <StarIcon sx={{ color: '#f59e0b', fontSize: '20px' }} />
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600,
              color: '#92400e',
              fontSize: '14px'
            }}
          >
            {rating.toFixed(1)} / 5
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#92400e',
              fontSize: '12px',
              opacity: 0.8
            }}
          >
            ({restaurant.reviewCount || 0} avis)
          </Typography>
        </RatingContainer>

        <ActionButton onClick={() => {
          // Ajouter ici la navigation vers la page du restaurant
          console.log('Voir détails restaurant:', restaurant.restaurant_id);
        }}>
          🍽️ Voir le menu et réserver
        </ActionButton>
      </ContentSection>
    </PopupContainer>
  );
};

export default RestaurantPopup;