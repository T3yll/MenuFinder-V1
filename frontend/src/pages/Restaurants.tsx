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

// Catégories disponibles avec design moderne
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

const API_URL = 'http://localhost:4000';

const Restaurants: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [restaurants, setRestaurants] = useState<RestaurantWithUI[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantWithUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [restaurantReviews, setRestaurantReviews] = useState<Record<number, { count: number, avg: number }>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedRestaurants, setSavedRestaurants] = useState<Set<number>>(new Set());
  
  const { formatPrice } = useCurrency();

  // Fonction pour calculer la note moyenne à partir des reviews
  const calculateAverageRating = (reviews?: Review[]): number => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const reviewsWithRating = reviews.filter(r => r.rating !== null && r.rating !== undefined && typeof r.rating === 'number');
    if (reviewsWithRating.length === 0) return 0;
    const sum = reviewsWithRating.reduce((total, review) => total + (review.rating as number), 0);
    return sum / reviewsWithRating.length;
  };

  // Fonction pour charger les restaurants depuis l'API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await RestaurantService.findAll();
        if (data) {
          const restaurantsWithUI: RestaurantWithUI[] = data.map((restaurant: Restaurant) => ({
            ...restaurant,
            priceRange: ["€", "€€", "€€€"][Math.floor(Math.random() * 3)],
            openingHours: "11h00 - 22h00",
            specialties: restaurant.menus?.length ? 
              restaurant.menus.flatMap(menu => 
                menu.items?.map(item => item.name) || []
              ).slice(0, 3) : 
              ["Spécialité de la maison"]
          }));
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

  // Charger les reviews pour chaque restaurant
  useEffect(() => {
    if (restaurants.length === 0) return;
    restaurants.forEach((restaurant) => {
      fetch(`${API_URL}/reviews/restaurant/${restaurant.restaurant_id}`)
        .then(res => res.json())
        .then((reviews: Review[]) => {
          const count = reviews.length;
          const reviewsWithRating = reviews.filter(r => r.rating !== null && r.rating !== undefined && typeof r.rating === 'number');
          const avg = reviewsWithRating.length > 0
            ? reviewsWithRating.reduce((sum, r) => sum + (r.rating as number), 0) / reviewsWithRating.length
            : 0;
          setRestaurantReviews(prev => ({
            ...prev,
            [restaurant.restaurant_id]: { count, avg }
          }));
        });
    });
  }, [restaurants]);

  // Effet pour filtrer les restaurants
  useEffect(() => {
    if (restaurants.length === 0) return;
    let filtered = [...restaurants];
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
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStarsCount = 5 - stars.length;
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    return stars;
  };

  // Obtenir l'URL de l'image
  const getImageUrl = (restaurant: RestaurantWithUI) => {
    if (restaurant.image && restaurant.image.path) {
      if (restaurant.image.path.startsWith('http')) {
        return restaurant.image.path;
      }
      return `${restaurant.image.path}`;
    }
    return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
  };

  // Obtenir l'adresse formatée
  const getFormattedAddress = (restaurant: RestaurantWithUI) => {
    if (restaurant.adress) {
      return `${restaurant.adress.street}, ${restaurant.adress.zip_code} ${restaurant.adress.city}`;
    }
    return "Adresse non disponible";
  };

  // Toggle save restaurant
  const toggleSaveRestaurant = (e: React.MouseEvent, restaurantId: number) => {
    e.preventDefault();
    e.stopPropagation();
    const newSaved = new Set(savedRestaurants);
    if (newSaved.has(restaurantId)) {
      newSaved.delete(restaurantId);
    } else {
      newSaved.add(restaurantId);
    }
    setSavedRestaurants(newSaved);
  };

  // État de chargement moderne
  if (loading) {
    return (
      <div className="restaurants-modern">
        <div className="loading-page">
          <div className="loading-animation">
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
          </div>
          <h2>Chargement des restaurants...</h2>
          <p>Nous préparons les meilleurs établissements pour vous</p>
        </div>
      </div>
    );
  }

  // État d'erreur moderne
  if (error) {
    return (
      <div className="restaurants-modern">
        <div className="error-page">
          <div className="error-icon">
            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2>Oups ! Un problème est survenu</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurants-modern">
      {/* Header moderne */}
      <section className="restaurants-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Découvrez nos restaurants</h1>
              <p>Plus de {restaurants.length} établissements vous attendent</p>
            </div>
            <div className="header-actions">
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Vue grille"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="Vue liste"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres modernes */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <h3>Catégories</h3>
            <div className="categories-scroll">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-chip ${selectedCategory === category.id ? 'active' : ''}`}
                >
                  <span className="category-emoji">{category.emoji}</span>
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste des restaurants */}
      <section className="restaurants-section">
        <div className="container">
          {filteredRestaurants.length > 0 ? (
            <>
              <div className="results-info">
                <span>{filteredRestaurants.length} restaurant{filteredRestaurants.length > 1 ? 's' : ''} trouvé{filteredRestaurants.length > 1 ? 's' : ''}</span>
                {selectedCategory !== "all" && (
                  <span className="active-filter">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("all")} className="clear-filter">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </span>
                )}
              </div>

              <div className={`restaurants-grid ${viewMode}`}>
                {filteredRestaurants.map(restaurant => (
                  <Link 
                    to={`/restaurants/${restaurant.restaurant_id}`} 
                    key={restaurant.restaurant_id} 
                    className="restaurant-card-modern"
                  >
                    <div className="card-image">
                      <img src={getImageUrl(restaurant)} alt={restaurant.name} />
                      <div className="image-overlay">
                        <div className="price-badge">{restaurant.priceRange}</div>
                        <button 
                          className={`save-btn ${savedRestaurants.has(restaurant.restaurant_id) ? 'saved' : ''}`}
                          onClick={(e) => toggleSaveRestaurant(e, restaurant.restaurant_id)}
                          aria-label="Sauvegarder"
                        >
                          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                          </svg>
                        </button>
                      </div>
                      {restaurant.type && (
                        <div className="cuisine-tag">
                          <span>{categories.find(c => c.id.toLowerCase() === restaurant.type.toLowerCase())?.emoji}</span>
                          <span>{categories.find(c => c.id.toLowerCase() === restaurant.type.toLowerCase())?.name || restaurant.type}</span>
                        </div>
                      )}
                    </div>

                    <div className="card-content">
                      <div className="restaurant-header">
                        <h3 className="restaurant-name">{restaurant.name}</h3>
                        <div className="restaurant-rating">
                          <div className="stars">
                            {renderStars(restaurantReviews[restaurant.restaurant_id]?.avg || 0)}
                          </div>
                          <span className="rating-text">
                            {(restaurantReviews[restaurant.restaurant_id]?.avg || 0).toFixed(1)}
                          </span>
                          <span className="reviews-count">
                            ({restaurantReviews[restaurant.restaurant_id]?.count || 0})
                          </span>
                        </div>
                      </div>

                      <div className="restaurant-info">
                        <div className="info-item">
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span>{getFormattedAddress(restaurant)}</span>
                        </div>

                        <div className="info-item">
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                          </svg>
                          <span>{restaurant.openingHours || "11h00 - 22h00"}</span>
                          <span className="delivery-time">• 🚚 25-35 min</span>
                        </div>

                        {restaurant.specialties && restaurant.specialties.length > 0 && (
                          <div className="info-item specialties">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 000 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                            </svg>
                            <span>{restaurant.specialties.slice(0, 2).join(", ")}</span>
                          </div>
                        )}
                      </div>

                      <div className="card-footer">
                        <div className="delivery-fee">Livraison gratuite</div>
                        <div className="card-action">
                          <span className="view-menu">Voir le menu</span>
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results-modern">
              <div className="no-results-icon">
                <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3>Aucun restaurant trouvé</h3>
              <p>Essayez de modifier vos critères de recherche ou explorez d'autres catégories.</p>
              <button onClick={() => setSelectedCategory("all")} className="reset-filters">
                Voir tous les restaurants
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Restaurants;