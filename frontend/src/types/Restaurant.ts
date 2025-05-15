export interface Restaurant {
  id: number;
  name: string;
  address: string;
  cuisine?: string;
  rating: number;
  distance?: number; // Distance par rapport à l'utilisateur
  imageUrl?: string;
  openingHours?: string;
  category?: string;
  reviewCount?: number;
  specialties?: string[];
  priceRange?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Menu {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  tags?: string[];
}
