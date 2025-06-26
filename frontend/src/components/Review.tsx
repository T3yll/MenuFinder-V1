import React, { useState, useEffect } from 'react';
import { reportReview } from '../services/reviewReport.service';
import '../styles/components/Review.scss';

interface ReviewProps {
  review: {
    review_id: number;
    restaurant_id: number;
    user_id: number;
    text: string;
    added_at: string;
    updated_at: string;
    rating?: number;
    user?: {
      id: number;
      username: string;
      nom: string;
      prenom: string;
      email: string;
    };
  };
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  const [isReported, setIsReported] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isReporting, setIsReporting] = useState(false);

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUserId(user.id);
      } catch (error) {
        console.error("Erreur lors du parsing de l'utilisateur:", error);
      }
    }
  }, []);

  // Vérifier si l'avis a déjà été signalé au chargement (localStorage pour la session)
  useEffect(() => {
    const reportedReviews = JSON.parse(
      localStorage.getItem('reportedReviews') || '[]'
    );
    setIsReported(reportedReviews.includes(review.review_id));
  }, [review.review_id]);

  // Format de date pour les avis
  const formatReviewDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Afficher les étoiles de notation
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    let stars = [];

    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star full">
          ★
        </span>
      );
    }

    // Demi-étoile si nécessaire
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }

    // Étoiles vides
    const emptyStarsCount = 5 - stars.length;
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  // Fonction pour signaler un avis
  const handleReportReview = async () => {
    if (isReporting) return;

    try {
      setIsReporting(true);

      // Appel API pour signaler l'avis
      await reportReview({ review_id: review.review_id });

      // Marquer comme signalé localement pour cette session
      const reportedReviews = JSON.parse(
        localStorage.getItem('reportedReviews') || '[]'
      );
      if (!reportedReviews.includes(review.review_id)) {
        reportedReviews.push(review.review_id);
        localStorage.setItem(
          'reportedReviews',
          JSON.stringify(reportedReviews)
        );
      }

      setIsReported(true);
      alert('Avis signalé avec succès ! Il a été masqué de votre affichage.');
    } catch (error: any) {
      console.error('Erreur lors du signalement:', error);

      // Gestion des erreurs spécifiques
      if (error.response?.status === 400) {
        if (error.response.data.message?.includes('propre avis')) {
          alert('Vous ne pouvez pas signaler votre propre avis.');
        } else if (error.response.data.message?.includes('déjà signalé')) {
          alert('Vous avez déjà signalé cet avis.');
          // Marquer comme signalé localement
          const reportedReviews = JSON.parse(
            localStorage.getItem('reportedReviews') || '[]'
          );
          if (!reportedReviews.includes(review.review_id)) {
            reportedReviews.push(review.review_id);
            localStorage.setItem(
              'reportedReviews',
              JSON.stringify(reportedReviews)
            );
          }
          setIsReported(true);
        } else {
          alert('Erreur lors du signalement. Veuillez réessayer.');
        }
      } else if (error.response?.status === 401) {
        alert('Vous devez être connecté pour signaler un avis.');
      } else if (error.response?.status === 403) {
        alert("Vous n'avez pas les permissions nécessaires.");
      } else {
        alert('Erreur lors du signalement. Veuillez réessayer.');
      }
    } finally {
      setIsReporting(false);
    }
  };

  // Ne pas afficher l'avis s'il a été signalé
  if (isReported) {
    return null;
  }

  // Vérifier si l'utilisateur connecté est l'auteur de l'avis
  const isOwnReview = currentUserId === review.user_id;

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">
            {review.user?.username?.charAt(0).toUpperCase() ||
              review.user_id.toString()}
          </div>
          <div className="reviewer-details">
            <div className="reviewer-name">
              {review.user
                ? `${review.user.prenom} ${review.user.nom}`
                : `Utilisateur ${review.user_id}`}
            </div>
            <div className="review-date">
              {formatReviewDate(review.added_at)}
            </div>
          </div>
        </div>
        <div className="review-actions">
          {review.rating && (
            <div className="review-rating">
              <div className="rating-stars">{renderStars(review.rating)}</div>
              <div className="rating-number">{review.rating}/5</div>
            </div>
          )}
          {!isOwnReview && (
            <button
              className={`report-review-btn ${isReporting ? 'reporting' : ''}`}
              onClick={handleReportReview}
              disabled={isReporting}
              title="Signaler cet avis"
            >
              {isReporting ? '⏳' : '🚩'}
            </button>
          )}
        </div>
      </div>
      <div className="review-content">
        <p>{review.text}</p>
      </div>
    </div>
  );
};

export default Review;
