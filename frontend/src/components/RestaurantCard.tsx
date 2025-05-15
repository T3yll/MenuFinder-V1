import React from 'react';
import { Restaurant } from '../types/Restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(restaurant);
    }
  };

  return (
    <div 
      className="restaurant-card" 
      onClick={handleClick}
      style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        padding: '16px',
        margin: '8px 0',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <h3>{restaurant.name}</h3>
      <p>{restaurant.cuisine}</p>
      <p>{restaurant.address}</p>
      <div>
        <span>Rating: {restaurant.rating}/5</span>
        {restaurant.distance && (
          <span style={{ marginLeft: '10px' }}>{restaurant.distance}m</span>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
