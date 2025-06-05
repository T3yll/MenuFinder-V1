import React, { useState } from 'react';
import '../styles/components/ReviewForm.scss';

interface ReviewFormProps {
  restaurantId: number;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ restaurantId, onReviewSubmitted }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Veuillez donner une note');
      return;
    }
    
    if (text.trim() === '') {
      alert('Veuillez écrire un commentaire');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Récupérer l'utilisateur connecté
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        alert('Vous devez être connecté pour laisser un avis');
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
        
        alert('Avis ajouté avec succès !');
      } else {
        throw new Error('Erreur lors de l\'ajout de l\'avis');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout de l\'avis. Veuillez réessayer.');
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

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || rating === 0 || text.trim() === ''}
        >
          {isSubmitting ? 'Publication...' : 'Publier mon avis'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm; 