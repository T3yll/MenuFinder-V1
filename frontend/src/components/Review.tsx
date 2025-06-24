import React from 'react';
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
  // Format de date pour les avis
  const formatReviewDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">
            {review.user?.username?.charAt(0).toUpperCase() || review.user_id.toString()}
          </div>
          <div className="reviewer-details">
            <div className="reviewer-name">
              {review.user ? `${review.user.prenom} ${review.user.nom}` : `Utilisateur ${review.user_id}`}
            </div>
            <div className="review-date">{formatReviewDate(review.added_at)}</div>
          </div>
        </div>
        {review.rating && (
          <div className="review-rating">
            <div className="rating-stars">{renderStars(review.rating)}</div>
            <div className="rating-number">{review.rating}/5</div>
          </div>
        )}
      </div>
      <div className="review-content">
        <p>{review.text}</p>
      </div>
    </div>
  );
};

export default Review; 