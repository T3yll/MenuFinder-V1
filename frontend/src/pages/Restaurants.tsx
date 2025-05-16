import { Link } from 'react-router-dom';
import '../styles/pages/Restaurants.scss';
import { useCurrency } from '../contexts/CurrencyContext';
import SliderFilter from '../components/commom/SliderFilter';
import { RestaurantService } from '../services/RestaurantService';
import { useEffect, useState } from 'react';
import { Restaurant, Review } from '../types/Restaurant';

// Types supplémentaires pour l'interface UI
interface RestaurantWithUI extends Restaurant {
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
  openingHours?: string;
  specialties?: string[];
}

// Catégories disponibles
const categories = [
  { id: "all", name: "Tous", emoji: "🍽️" },
  { id: "français", name: "Français", emoji: "🥐" },
  { id: "italien", name: "Italien", emoji: "🍕" },
  { id: "asiatique", name: "Asiatique", emoji: "🍜" },
  { id: "japonais", name: "Japonais", emoji: "🍣" },
  { id: "chinois", name: "Chinois", emoji: "🥡" },
  { id: "thaï", name: "Thaï", emoji: "🍲" },
  { id: "fastfood", name: "Fast Food", emoji: "🍔" },
  { id: "vegetarien", name: "Végétarien", emoji: "🥗" },
  { id: "végétalien", name: "Végétalien", emoji: "🥬" },
  { id: "méditerranéen", name: "Méditerranéen", emoji: "🫒" },
  { id: "indien", name: "Indien", emoji: "🍛" },
  { id: "espagnol", name: "Espagnol", emoji: "🥘" },
  { id: "mexicain", name: "Mexicain", emoji: "🌮" },
  { id: "américain", name: "Américain", emoji: "🥪" },
  { id: "oriental", name: "Oriental", emoji: "🧆" },
  { id: "africain", name: "Africain", emoji: "🍖" },
  { id: "fruits_de_mer", name: "Fruits de mer", emoji: "🦞" },
  { id: "barbecue", name: "Barbecue", emoji: "🍗" },
  { id: "desserts", name: "Desserts", emoji: "🍰" }
];

const API_URL = 'http://localhost:3000/api';

const Restaurants: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [restaurants, setRestaurants] = useState<RestaurantWithUI[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantWithUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { formatPrice } = useCurrency();

  // Fonction pour calculer la note moyenne à partir des reviews
  const calculateAverageRating = (reviews?: Review[]): number => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  };

  // Fonction pour charger les restaurants depuis l'API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Utiliser le service RestaurantService pour récupérer les restaurants
        const data = await RestaurantService.findAll();
        
        if (data) {
          // Enrichir les restaurants avec des données UI supplémentaires
          const restaurantsWithUI: RestaurantWithUI[] = data.map((restaurant: Restaurant) => {
            // Calcul de la note moyenne à partir des reviews si disponibles
            const rating = restaurant.rewiews ? 
              calculateAverageRating(restaurant.rewiews) : 
              Math.random() * 2 + 3; // Note aléatoire entre 3 et 5 si pas de reviews
            
            return {
              ...restaurant,
              rating: rating,
              reviewCount: restaurant.rewiews?.length || Math.floor(Math.random() * 100) + 20,
              priceRange: ["€", "€€", "€€€"][Math.floor(Math.random() * 3)],
              openingHours: "11h00 - 22h00", // Valeur par défaut
              specialties: restaurant.menus?.length ? 
                restaurant.menus.flatMap(menu => 
                  menu.items?.map(item => item.name) || []
                ).slice(0, 3) : 
                ["Spécialité de la maison"]
            };
          });
          
          setRestaurants(restaurantsWithUI);
        } else {
          setError("Aucune donnée reçue de l'API");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des restaurants:", err);
        setError("Impossible de charger les restaurants. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Effet pour filtrer les restaurants
  useEffect(() => {
    if (restaurants.length === 0) return;
    
    let filtered = [...restaurants];

    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(restaurant => 
        restaurant.type.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredRestaurants(filtered);
  }, [selectedCategory, restaurants]);

  // Afficher les étoiles de notation
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    let stars = [];

    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }

    // Demi-étoile si nécessaire
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    // Étoiles vides
    const emptyStarsCount = 5 - stars.length;
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  // Obtenir l'URL de l'image
  const getImageUrl = (restaurant: RestaurantWithUI) => {
    if (restaurant.image && restaurant.image.path) {
      // Si c'est une URL complète
      if (restaurant.image.path.startsWith('http')) {
        return restaurant.image.path;
      }
      // Sinon, construire l'URL correcte vers le fichier local
      // Utiliser le chemin relatif sans ajouter l'URL de l'API
      return `${restaurant.image.path}`;
    }
    // Image par défaut
    return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
  };

  // Obtenir l'adresse formatée
  const getFormattedAddress = (restaurant: RestaurantWithUI) => {
    if (restaurant.adress) {
      return `${restaurant.adress.street}, ${restaurant.adress.zip_code} ${restaurant.adress.city}`;
    }
    return "Adresse non disponible";
  };

  // État de chargement
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des restaurants...</p>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="error-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>Erreur</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="restaurants-page">
      {/* Slider de catégories */}
      <SliderFilter categories={categories} setSelectedCategory={setSelectedCategory} />
      
      {/* Liste des restaurants */}
      <div className="restaurants-container">
        <div className="restaurants-grid">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <div key={restaurant.restaurant_id} className="restaurant-card">
                <div className="restaurant-image" style={{ backgroundImage: `url(${getImageUrl(restaurant)})` }}>
                  <div className="restaurant-image-overlay"></div>
                  <div className="price-tag">{restaurant.priceRange}</div>
                </div>

                <div className="restaurant-content">
                  <h3 className="restaurant-name">{restaurant.name}</h3>

                  <div className="restaurant-category">
                    {categories.find(c => c.id.toLowerCase() === restaurant.type.toLowerCase())?.name || restaurant.type}
                  </div>

                  <div className="restaurant-rating">
                    <div className="stars">{renderStars(restaurant.rating || 4)}</div>
                    <span className="reviews-count">({restaurant.reviewCount || 0})</span>
                  </div>

                  <div className="restaurant-address">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {getFormattedAddress(restaurant)}
                  </div>

                  <div className="restaurant-owner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>

                  <div className="restaurant-hours">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {restaurant.openingHours || "11h00 - 22h00"}
                  </div>

                  {restaurant.specialties && restaurant.specialties.length > 0 && (
                    <div className="restaurant-specialties">
                      <strong>Spécialités:</strong> {restaurant.specialties.join(", ")}
                    </div>
                  )}

                  <div className="restaurant-actions">
                    <Link to={`/restaurants/${restaurant.restaurant_id}`} className="view-menu-button">
                      Voir le menu
                    </Link>
                    <button className="save-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="15" x2="16" y2="15"></line>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
              <h3>Aucun restaurant trouvé</h3>
              <p>Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;