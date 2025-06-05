export interface Restaurant {
  restaurant_id: number;
  adress_id: number;
  owner_id: number;
  name: string;
  type: string;
  image_file_id: number;
  adress?: Adress;
  owner?: User;
  image?: FileEntity;
  rewiews?: Review[];
  menus?: Menu[];
  tagRestaurants?: RestaurantTag[];
  bookmarks?: Bookmark[];
}

// Interface étendue pour la carte qui inclut les champs calculés
export interface RestaurantForMap extends Restaurant {
  id: number; // Alias pour restaurant_id
  category: string; // Alias pour type
  rating: number; // Calculé à partir de rewiews
  reviewCount: number; // Calculé à partir de rewiews
  imageUrl: string; // Calculé à partir de image
  address: string; // Calculé à partir de adress
  priceRange: string; // Estimé selon le type
  openingHours: string; // Valeur par défaut
  specialties: string[]; // Calculé à partir de tagRestaurants
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Adress {
  adress_id: number;
  street: string;
  city: string;
  state?: string;
  zip_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  restaurants?: Restaurant[];
}

export interface FileEntity {
  file_id: number;
  name: string;
  path: string;
  type: string;
  users?: User[];
  restaurants?: Restaurant[];
  meals?: any[];
}

export interface Review {
  review_id: number;
  restaurant_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: Date;
  restaurant?: Restaurant;
  user?: User;
}

export interface Menu {
  menu_id: number;
  restaurant_id: number;
  name: string;
  description: string;
  restaurant?: Restaurant;
  items?: MenuItem[];
}

export interface MenuItem {
  item_id: number;
  menu_id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_file_id?: number;
  menu?: Menu;
  image?: FileEntity;
}

export interface RestaurantTag {
  restaurant_tag_id: number;
  restaurant_id: number;
  tag_id: number;
  restaurant?: Restaurant;
  tag?: Tag;
}

export interface Tag {
  tag_id: number;
  name: string;
  tagRestaurants?: RestaurantTag[];
}

export interface Bookmark {
  bookmark_id: number;
  user_id: number;
  restaurant_id: number;
  created_at: Date;
  user?: User;
  restaurant?: Restaurant;
}

// Fonction utilitaire pour convertir Restaurant en RestaurantForMap
export const adaptRestaurantForMap = (restaurant: Restaurant): RestaurantForMap => {
  // Calcul de la note moyenne
  const calculateAverageRating = (reviews?: Review[]): number => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  };

  // Obtenir l'URL de l'image
  const getRestaurantImageUrl = (restaurant: Restaurant): string => {
    const API_URL = 'http://localhost:3000/api';
    
    if (restaurant.image && restaurant.image.path) {
      if (restaurant.image.path.startsWith('http')) {
        return restaurant.image.path;
      }
      return `${API_URL}/${restaurant.image.path.replace(/^\//, '')}`;
    }
    
    // Images par défaut selon le type
    const defaultImages: { [key: string]: string } = {
      'italien': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'français': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'asiatique': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'fastfood': 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'default': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    };
    
    return defaultImages[restaurant.type?.toLowerCase()] || defaultImages.default;
  };

  // Formater l'adresse
  const getFormattedAddress = (restaurant: Restaurant): string => {
    if (restaurant.adress) {
      return `${restaurant.adress.street}, ${restaurant.adress.zip_code} ${restaurant.adress.city}`;
    }
    return "Adresse non disponible";
  };

  // Obtenir la gamme de prix
  const getPriceRange = (restaurant: Restaurant): string => {
    const type = restaurant.type?.toLowerCase();
    const priceRanges: { [key: string]: string } = {
      'fastfood': '€',
      'italien': '€€',
      'français': '€€€',
      'asiatique': '€€',
      'indien': '€€',
      'espagnol': '€€',
      'méditerranéen': '€€',
      'végétarien': '€€'
    };
    return priceRanges[type] || '€€';
  };

  return {
    ...restaurant,
    id: restaurant.restaurant_id,
    category: restaurant.type,
    rating: calculateAverageRating(restaurant.rewiews),
    reviewCount: restaurant.rewiews?.length || 0,
    imageUrl: getRestaurantImageUrl(restaurant),
    address: getFormattedAddress(restaurant),
    priceRange: getPriceRange(restaurant),
    openingHours: "11h00 - 22h00",
    specialties: restaurant.tagRestaurants?.map(tag => tag.tag?.name).filter((name): name is string => typeof name === 'string') || [],
    coordinates: undefined // À remplir par géocodage
  };
};