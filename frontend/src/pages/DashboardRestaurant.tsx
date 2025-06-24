import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Restaurant, User } from '../types/Restaurant';
import '../styles/pages/Dashboard.scss';
import { RestaurantService } from '../services/RestaurantService';

// Fonction utilitaire pour obtenir l'URL de l'image
const getImageUrl = (restaurant: Restaurant) => {
  if (!restaurant) return null;

  if (restaurant.image && restaurant.image.path) {
    // Si c'est une URL complète
    if (restaurant.image.path.startsWith('http')) {
      return restaurant.image.path;
    }
    // Sinon, construire l'URL correcte vers le fichier local
    return `${restaurant.image.path}`;
  }

  if (restaurant.image_file_id) {
    // Si on a un ID de fichier image mais pas d'objet image complet
    return `http://localhost:3000/api/files/${restaurant.image_file_id}`;
  }

  // Image par défaut
  return null;
};

const DashboardRestaurant: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const [menusCount, setMenusCount] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Vérifier s'il faut rafraîchir la liste (après modification)
    if (location.state && location.state.refresh) {
      setRefreshList((prev) => !prev);
    }
  }, [location]);

  useEffect(() => {
    // Récupérer l'utilisateur du localStorage
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      setError('Vous devez être connecté pour accéder à cette page');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
      fetchUserRestaurants(userData.id);
    } catch (err) {
      setError('Erreur lors de la récupération des données utilisateur');
      console.error(err);
    }
  }, [refreshList]); // Ajout de refreshList pour actualiser quand nécessaire

  const fetchUserRestaurants = async (userId: number) => {
    try {
      setLoading(true);
      // Récupérer tous les restaurants et filtrer par owner_id
      const allRestaurants = await RestaurantService.findAll();
      const userRestaurants = allRestaurants.filter(
        (restaurant) => restaurant.owner_id === userId
      );
      setRestaurants(userRestaurants);

      // Récupérer les avis et menus de l'utilisateur
      await fetchUserReviews(userId);
      await fetchAllMenusCount(userRestaurants);

      setLoading(false);
    } catch (err) {
      setError('Erreur lors de la récupération des restaurants');
      setLoading(false);
      console.error(err);
    }
  };

  const fetchUserReviews = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:4000/reviews/user/${userId}`
      );
      if (response.ok) {
        const reviews = await response.json();
        setReviewsCount(reviews.length);
      } else {
        console.error('Erreur lors de la récupération des avis');
        setReviewsCount(0);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des avis:', err);
      setReviewsCount(0);
    }
  };

  const fetchAllMenusCount = async (userRestaurants: Restaurant[]) => {
    try {
      let totalMenus = 0;

      // Pour chaque restaurant, récupérer ses menus
      for (const restaurant of userRestaurants) {
        const response = await fetch(
          `http://localhost:4000/menus/restaurant/${restaurant.restaurant_id}`
        );
        if (response.ok) {
          const menus = await response.json();
          totalMenus += menus.length;
        } else {
          console.error(
            `Erreur lors de la récupération des menus pour le restaurant ${restaurant.restaurant_id}`
          );
        }
      }

      setMenusCount(totalMenus);
    } catch (err) {
      console.error('Erreur lors de la récupération des menus:', err);
      setMenusCount(0);
    }
  };

  const handleEditRestaurant = (restaurantId: number) => {
    navigate(`/edit-restaurant/${restaurantId}`);
  };

  const handleDeleteConfirm = (restaurantId: number) => {
    setDeleteConfirm(restaurantId);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const handleDeleteRestaurant = async (restaurantId: number) => {
    try {
      await RestaurantService.remove(restaurantId);
      // Mettre à jour la liste après suppression
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter(
          (restaurant) => restaurant.restaurant_id !== restaurantId
        )
      );
      setDeleteConfirm(null);
    } catch (err) {
      setError('Erreur lors de la suppression du restaurant');
      console.error(err);
    }
  };

  if (error && !user) {
    return (
      <div className="dashboard-container error-container">
        <div className="error-box">
          <h2>Accès refusé</h2>
          <p>{error}</p>
          <Link to="/login" className="btn btn-primary">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-top-row">
          <Link to="/" className="btn btn-back">
            ← Retour à l'accueil
          </Link>
          <h1>Tableau de bord</h1>
        </div>
        <div className="user-info">
          <div className="user-details">
            <p>@{user?.username}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Mes restaurants</h2>
            <Link to="/register-restaurant" className="btn btn-primary">
              <span className="icon">+</span> Ajouter un restaurant
            </Link>
          </div>

          {loading ? (
            <div className="loading-spinner">Chargement des restaurants...</div>
          ) : restaurants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍽️</div>
              <h3>Vous n'avez pas encore de restaurants</h3>
              <p>
                Commencez par ajouter votre premier établissement pour le faire
                découvrir aux utilisateurs.
              </p>
              <Link to="/register-restaurant" className="btn btn-primary">
                Ajouter un restaurant
              </Link>
            </div>
          ) : (
            <div className="restaurant-list">
              {restaurants.map((restaurant) => (
                <div key={restaurant.restaurant_id} className="restaurant-card">
                  <div className="restaurant-image">
                    {restaurant.image_file_id ||
                    (restaurant.image && restaurant.image.path) ? (
                      <img
                        src={getImageUrl(restaurant) || ''}
                        alt={restaurant.name}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>Pas d'image</span>
                      </div>
                    )}
                  </div>
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p className="restaurant-type">{restaurant.type}</p>
                    {restaurant.adress && (
                      <p className="restaurant-address">
                        {restaurant.adress.street}, {restaurant.adress.city}
                      </p>
                    )}
                  </div>
                  <div className="restaurant-actions">
                    <button
                      className="btn btn-edit"
                      onClick={() =>
                        handleEditRestaurant(restaurant.restaurant_id)
                      }
                    >
                      Modifier
                    </button>
                    <Link
                      to={`/restaurant-menus/${restaurant.restaurant_id}`}
                      className="btn btn-menus"
                    >
                      Gérer les menus
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() =>
                        handleDeleteConfirm(restaurant.restaurant_id)
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                  {deleteConfirm === restaurant.restaurant_id && (
                    <div className="delete-confirmation">
                      <p>
                        Êtes-vous sûr de vouloir supprimer{' '}
                        <strong>{restaurant.name}</strong> ?
                      </p>
                      <div className="confirmation-actions">
                        <button
                          className="btn btn-cancel"
                          onClick={handleDeleteCancel}
                        >
                          Annuler
                        </button>
                        <button
                          className="btn btn-confirm-delete"
                          onClick={() =>
                            handleDeleteRestaurant(restaurant.restaurant_id)
                          }
                        >
                          Confirmer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section stats-section">
          <h2>Statistiques</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{restaurants.length}</div>
              <div className="stat-label">Restaurants</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{reviewsCount}</div>
              <div className="stat-label">Avis</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{menusCount}</div>
              <div className="stat-label">Menus</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRestaurant;
