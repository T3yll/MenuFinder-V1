import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCurrency } from '../contexts/CurrencyContext';
import { RestaurantService } from '../services/RestaurantService';
import { Restaurant, MenuItem } from '../types/Restaurant';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import '../styles/pages/RestaurantDetail.scss';

interface ReviewData {
  review_id: number;
  restaurant_id: number;
  user_id: number;
  text: string;
  added_at: string;
  updated_at: string;
  user?: {
    id: number;
    username: string;
    nom: string;
    prenom: string;
    email: string;
  };
  rating?: number;
}

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'menu' | 'reviews'>('info');
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  
  const { formatPrice } = useCurrency();

  const API_URL = 'http://localhost:4000';

  // Fonction pour récupérer les avis
  const fetchReviews = async (restaurantId: number) => {
    try {
      const response = await fetch(`${API_URL}/reviews/restaurant/${restaurantId}`);
      console.log("[RestaurantDetail] response", response);
      
      if (response.ok) {
        const reviewsData = await response.json();
        console.log("[RestaurantDetail Data] response", reviewsData);
        setReviews(reviewsData);
      } else {
        console.error('Erreur lors de la récupération des avis');
        setReviews([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      setReviews([]);
    }
  };

  // Fonction pour rafraîchir les avis après ajout d'un nouvel avis
  const handleReviewSubmitted = () => {
    if (id) {
      fetchReviews(parseInt(id));
    }
  };

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error("ID du restaurant manquant");
        }
        
        const restaurantId = parseInt(id);
        const data = await RestaurantService.findOne(restaurantId);
        
        if (data) {
          setRestaurant(data);
          // Si le restaurant a des menus, sélectionner le premier par défaut
          if (data.menus && data.menus.length > 0) {
            setSelectedMenu(data.menus[0].menu_id);
          }
          // Récupérer les avis
          await fetchReviews(restaurantId);
        } else {
          setError("Aucune donnée reçue de l'API");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des détails du restaurant:", err);
        setError("Impossible de charger les détails du restaurant. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  // Calcul de la note moyenne basée sur les ratings des avis
  const calculateAverageRating = (): number => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    
    // Filtrer les avis qui ont un rating (pas null)
    const reviewsWithRating = reviews.filter(review => 
      review.rating !== null && 
      review.rating !== undefined && 
      typeof review.rating === 'number'
    );
    
    if (reviewsWithRating.length === 0) {
      return 0;
    }
    
    // Calculer la moyenne (rating est garanti d'être un number maintenant)
    const sum = reviewsWithRating.reduce((total, review) => total + (review.rating as number), 0);
    return sum / reviewsWithRating.length;
  };

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
  const getImageUrl = (restaurant: Restaurant) => {
    if (restaurant.image && restaurant.image.path) {
        // Si c'est une URL complète
        if (restaurant.image.path.startsWith('http')) {
        return restaurant.image.path;
        }
        // Sinon, construire l'URL correcte vers le fichier local
        return `${API_URL}/${restaurant.image.path.replace(/^\//, '')}`;
    }
    // Image par défaut
    return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
    };

  // Obtenir l'image d'un plat
  const getMenuItemImageUrl = (item: MenuItem) => {
    if (item.image && item.image.path) {
      // Si c'est une URL complète
      if (item.image.path.startsWith('http')) {
        return item.image.path;
      }
      // Sinon, construire l'URL correcte vers le fichier local
      return `${item.image.path}`;
    }
    // Image par défaut pour les plats
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80";
  };

  // Obtenir l'adresse formatée
  const getFormattedAddress = (restaurant: Restaurant) => {
    if (restaurant.adress) {
      return `${restaurant.adress.street}, ${restaurant.adress.zip_code} ${restaurant.adress.city}, ${restaurant.adress.country}`;
    }
    return "Adresse non disponible";
  };

  // Format de date pour les avis
  const formatReviewDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Grouper les plats par catégorie
  const groupItemsByCategory = (items?: MenuItem[]) => {
    if (!items || items.length === 0) {
      return {};
    }

    return items.reduce((groups: {[key: string]: MenuItem[]}, item) => {
      const category = item.category || 'Autre';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  };

  // État de chargement
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des détails du restaurant...</p>
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

  // Si aucun restaurant n'est trouvé
  if (!restaurant) {
    return (
      <div className="not-found-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="15" x2="16" y2="15"></line>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
        <h3>Restaurant introuvable</h3>
        <p>Le restaurant que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/restaurants" className="back-button">
          Retour à la liste des restaurants
        </Link>
      </div>
    );
  }

  const rating = calculateAverageRating();
  const reviewCount = reviews.length;
  const selectedMenuData = restaurant.menus?.find(menu => menu.menu_id === selectedMenu);
  const menuItemsByCategory = selectedMenuData ? groupItemsByCategory(selectedMenuData.items) : {};

  return (
    <div className="restaurant-detail-page">
      <div className="back-navigation">
        <Link to="/restaurants" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Retour aux restaurants
        </Link>
      </div>

      <div className="restaurant-header" style={{ backgroundImage: `url(${getImageUrl(restaurant)})` }}>
        <div className="restaurant-header-overlay"></div>
        <div className="restaurant-header-content">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <div className="restaurant-type-badge">{restaurant.type}</div>
          
          <div className="restaurant-rating">
            <div className="stars">{renderStars(rating)}</div>
            <span className="reviews-count">({reviewCount} avis)</span>
          </div>

          <div className="restaurant-tags">
            {restaurant.tagRestaurants?.map(tag => (
              <span key={tag.tag_id} className="restaurant-tag">
                {tag.tag?.name || 'Tag'}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="restaurant-content">
        <div className="restaurant-tabs">
          <button 
            className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Informations
          </button>
          <button 
            className={`tab-button ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu
          </button>
          <button 
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Avis ({reviewCount})
          </button>
        </div>

        <div className="tab-content">
          {/* Onglet Informations */}
          {activeTab === 'info' && (
            <div className="info-tab">
              <div className="info-section">
                <h3>À propos</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div>
                      <h4>Adresse</h4>
                      <p>{getFormattedAddress(restaurant)}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <div>
                      <h4>Heures d'ouverture</h4>
                      <p>11h00 - 22h00</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                      <h4>Contact</h4>
                      <p>+33 1 23 45 67 89</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <div>
                      <h4>Email</h4>
                      <p>contact@{restaurant.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {restaurant.owner && (
                <div className="info-section">
                  <h3>Propriétaire</h3>
                  <div className="owner-info">
                    <div className="owner-avatar">
                      {restaurant.owner.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="owner-details">
                      <h4>{restaurant.owner.username}</h4>
                      <p>Membre depuis {new Date(restaurant.owner.created_at).toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="info-section">
                <h3>Localisation</h3>
                <div className="map-container">
                  {/* Placeholder pour une carte */}
                  <div className="map-placeholder">
                    <div className="map-marker">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <p>Carte interactive disponible prochainement</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Menu */}
          {activeTab === 'menu' && (
            <div className="menu-tab">
              {restaurant.menus && restaurant.menus.length > 0 ? (
                <>
                  <div className="menu-selector">
                    {restaurant.menus.map(menu => (
                      <button
                        key={menu.menu_id}
                        className={`menu-button ${selectedMenu === menu.menu_id ? 'active' : ''}`}
                        onClick={() => setSelectedMenu(menu.menu_id)}
                      >
                        {menu.name}
                      </button>
                    ))}
                  </div>

                  {selectedMenuData && (
                    <div className="selected-menu">
                      <div className="menu-header">
                        <h3>{selectedMenuData.name}</h3>
                        <p className="menu-description">{selectedMenuData.description}</p>
                      </div>

                      {Object.keys(menuItemsByCategory).length > 0 ? (
                        Object.entries(menuItemsByCategory).map(([category, items]) => (
                          <div key={category} className="menu-category">
                            <h4 className="category-name">{category}</h4>
                            <div className="menu-items">
                              {items.map(item => (
                                <div key={item.item_id} className="menu-item">
                                  {item.image && (
                                    <div className="menu-item-image" style={{ backgroundImage: `url(${getMenuItemImageUrl(item)})` }}></div>
                                  )}
                                  <div className="menu-item-content">
                                    <div className="menu-item-header">
                                      <h5 className="menu-item-name">{item.name}</h5>
                                      <span className="menu-item-price">{formatPrice(item.price)}</span>
                                    </div>
                                    <p className="menu-item-description">{item.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="empty-menu-items">
                          <p>Aucun plat disponible pour ce menu.</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h18v18H3z"></path>
                    <path d="M3 9h18"></path>
                    <path d="M3 15h18"></path>
                    <path d="M9 3v18"></path>
                    <path d="M15 3v18"></path>
                  </svg>
                  <h3>Menu non disponible</h3>
                  <p>Ce restaurant n'a pas encore ajouté son menu. Veuillez réessayer ultérieurement.</p>
                </div>
              )}
            </div>
          )}

          {/* Onglet Avis */}
          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <div className="reviews-summary">
                <div className="average-rating">
                  <div className="rating-number">{rating.toFixed(1)}</div>
                  <div className="stars-summary">{renderStars(rating)}</div>
                  <div className="review-count">
                    {reviews.filter(review => review.rating !== null && review.rating !== undefined).length} notes sur {reviewCount} avis
                  </div>
                </div>

                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map(star => {
                    // Compter les avis avec cette note exacte
                    const count = reviews.filter(review => 
                      review.rating !== null && 
                      review.rating !== undefined && 
                      Math.floor(review.rating) === star
                    ).length;
                    
                    // Calculer le pourcentage basé sur le nombre total d'avis avec rating
                    const totalWithRating = reviews.filter(review => 
                      review.rating !== null && 
                      review.rating !== undefined
                    ).length;
                    const percentage = totalWithRating > 0 ? (count / totalWithRating) * 100 : 0;
                    
                    return (
                      <div key={star} className="rating-bar">
                        <div className="star-label">{star} étoiles</div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <div className="count-label">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <ReviewForm 
                restaurantId={parseInt(id!)} 
                onReviewSubmitted={handleReviewSubmitted}
              />

              <div className="reviews-list">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <Review key={review.review_id} review={review} />
                  ))
                ) : (
                  <div className="empty-reviews">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                    <h3>Aucun avis</h3>
                    <p>Ce restaurant n'a pas encore reçu d'avis. Soyez le premier à partager votre expérience!</p>
                    <button className="write-first-review-button">
                      Écrire le premier avis
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="restaurant-actions-footer">
        <button className="action-button bookmark-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          Enregistrer
        </button>
        <button className="action-button share-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Partager
        </button>
        <button className="action-button reservations-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Réserver
        </button>
      </div>
    </div>
  );
};

export default RestaurantDetail;