import React, { useState, useEffect } from 'react';
import '../styles/components/ReviewForm.scss';
import { useAppDispatch } from '../hooks/storeToast';
import { showToast } from '../store/slice/toastSlice';

interface ReviewFormProps {
  restaurantId: number;
  onReviewSubmitted: () => void;
  existingUserReview?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ restaurantId, onReviewSubmitted, existingUserReview }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userHasReview, setUserHasReview] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (existingUserReview !== undefined) {
      setUserHasReview(existingUserReview);
      return;
    }
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    fetch(`/api/reviews/restaurant/${restaurantId}`)
      .then(res => res.json())
      .then((reviews) => {
        if (Array.isArray(reviews)) {
          setUserHasReview(reviews.some((r) => r.user_id === user.id));
        }
      });
  }, [restaurantId, existingUserReview]);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      dispatch(showToast({
        message: 'Veuillez donner une note',
        severity: 'warning',
        duration: 3000,
        vertical: 'bottom',
        horizontal: 'right',
      }));
      return;
    }
    
    if (text.trim() === '') {
      dispatch(showToast({
        message: 'Veuillez écrire un commentaire',
        severity: 'warning',
        duration: 3000,
        vertical: 'bottom',
        horizontal: 'right',
      }));
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Récupérer l'utilisateur connecté
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        dispatch(showToast({
          message: 'Vous devez être connecté pour laisser un avis',
          severity: 'error',
          duration: 3000,
          vertical: 'bottom',
          horizontal: 'right',
        }));
        return;
      }
      
      const user = JSON.parse(userStr);
      
      const reviewData = {
        restaurant_id: restaurantId,
        user_id: user.id,
        rating: rating,
        text: text.trim()
      };

      const response = await fetch('http://localhost:4000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        // Reset form
        setRating(0);
        setText('');
        
        // Callback pour rafraîchir les avis
        onReviewSubmitted();
        
        dispatch(showToast({
          message: 'Avis ajouté avec succès !',
          severity: 'success',
          duration: 3000,
          vertical: 'bottom',
          horizontal: 'right'
        }));
      } else {
        const errorData = await response.json();
        dispatch(showToast({
          message: errorData.message || "Erreur lors de l'ajout de l'avis.",
          severity: 'error',
          duration: 3000,
          vertical: 'bottom',
          horizontal: 'right',
        }));
      }
    } catch (error) {
      console.error('Erreur:', error);
      dispatch(showToast({
        message: "Erreur lors de l'ajout de l'avis. Veuillez réessayer.",
        severity: 'error',
        duration: 3000,
        vertical: 'bottom',
        horizontal: 'right',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Laisser un avis</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="text-input">
            <label htmlFor="review-text">Votre commentaire :</label>
            <textarea
              id="review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Partagez votre expérience dans ce restaurant..."
              rows={4}
              maxLength={500}
              required
            />
            <div className="character-count">
              {text.length}/500 caractères
            </div>
          </div>

          <div className="rating-input">
            <label>Votre note</label>
            <div className="stars-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-button ${
                    star <= (hoverRating || rating) ? 'active' : ''
                  }`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="rating-display">{rating}/5 étoiles</span>
            )}
          </div>
        </div>

        <fieldset disabled={isSubmitting || userHasReview} style={{ border: 0, padding: 0, margin: 0 }}>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting || userHasReview || rating === 0 || text.trim() === ''}
          >
            {userHasReview ? 'Vous avez déjà posté un avis' : isSubmitting ? 'Publication...' : 'Publier mon avis'}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ReviewForm; 