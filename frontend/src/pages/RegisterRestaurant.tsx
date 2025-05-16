import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/RegisterRestaurant.scss';
import { RegisterRestaurantService } from '../services/RestaurantService';

// Types pour le formulaire
interface FormData {
  // Restaurant info
  name: string;
  type: string;
  
  // Adresse
  street: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
  
  // Fichiers
  image: File | null;
  
  // Autres infos utiles
  description: string;
  phoneNumber: string;
  email: string;
  website: string;
  priceRange: string;
}

// Interface pour les données utilisateur stockées dans localStorage
interface UserData {
  id: number;
  username: string;
  nom: string;
  prenom: string;
  image_file_id: number | null;
}

const RESTAURANT_TYPES = [
  { id: 'burger', name: 'Burger', emoji: '🍔' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣' },
  { id: 'thai', name: 'Thai', emoji: '🥢' },
  { id: 'italien', name: 'Italien', emoji: '🍝' },
  { id: 'francais', name: 'Français', emoji: '🥐' },
  { id: 'indien', name: 'Indien', emoji: '🍛' },
  { id: 'mexicain', name: 'Mexicain', emoji: '🌮' },
  { id: 'vegetarien', name: 'Végétarien', emoji: '🥗' }
];

const PRICE_RANGES = [
  { id: 'economic', label: 'Économique (moins de 10€)', value: 'Moins de 10€ par personne' },
  { id: 'medium', label: 'Intermédiaire (10€ - 20€)', value: 'Entre 10€ et 20€ par personne' },
  { id: 'premium', label: 'Premium (20€ - 30€)', value: 'Entre 20€ et 30€ par personne' },
  { id: 'luxury', label: 'Luxe (plus de 30€)', value: 'Plus de 30€ par personne' }
];

const RegisterRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: '',
    street: '',
    city: '',
    zipCode: '',
    country: 'France', // Par défaut
    state: '',
    image: null,
    description: '',
    phoneNumber: '',
    email: '',
    website: '',
    priceRange: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Récupérer les données utilisateur depuis localStorage
  useEffect(() => {
    try {
      // Récupération de l'utilisateur depuis le localStorage
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      } else {
        console.error('Aucune donnée utilisateur trouvée dans localStorage');
        setError("Vous devez être connecté pour inscrire votre restaurant.");
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des données utilisateur:', err);
      setError("Erreur lors de la récupération de vos informations. Veuillez vous reconnecter.");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      
      // Créer une prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const nextStep = () => {
    // Validation de l'étape actuelle
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setError("Le nom du restaurant est obligatoire");
        return;
      }
      if (!formData.type) {
        setError("Le type de cuisine est obligatoire");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.street.trim() || !formData.city.trim() || !formData.zipCode.trim()) {
        setError("L'adresse complète est obligatoire");
        return;
      }
      if (!formData.image) {
        setError("Une image du restaurant est obligatoire");
        return;
      }
    }

    setError(null);
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData) {
      setError("Vous devez être connecté pour inscrire votre restaurant.");
      return;
    }
    
    if (!formData.image) {
      setError("Une image du restaurant est obligatoire");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Préparer les données d'adresse
      const adressInfo = {
        number: parseInt(formData.street.split(" ")[0]) || 0, // Extraction du numéro depuis la rue
        street: formData.street,
        city: formData.city,
        postal_code: parseInt(formData.zipCode) || 0,
        country: formData.country
      };
      
      // Utiliser l'ID utilisateur stocké dans userData au lieu de la valeur codée en dur
      const userId = userData.id;
      
      // Enregistrer le restaurant en utilisant le service
      await RegisterRestaurantService.registerRestaurant(
        formData.name,
        formData.type,
        formData.image,
        adressInfo,
        userId
      );
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du restaurant:', error);
      setError("Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h2>Inscription réussie !</h2>
          <p>Votre restaurant a été enregistré avec succès. Vous pouvez maintenant commencer à ajouter vos menus et gérer votre établissement.</p>
          <div className="success-actions">
            <Link to="/" className="btn-secondary">Retour à l'accueil</Link>
            <Link to="/dashboard/restaurants" className="btn-primary">Gérer mon restaurant</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-restaurant-page">
      {/* Hero Section */}
      <section className="register-hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
          <div className="hero-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80')" }}></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Rejoignez MenuFinder</h1>
          <p className="hero-subtitle">Faites découvrir votre établissement à des milliers de clients potentiels</p>
          <div className="step-indicators">
            <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Informations générales</span>
            </div>
            <div className="step-line"></div>
            <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Adresse et médias</span>
            </div>
            <div className="step-line"></div>
            <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section section-light">
        <div className="section-container">
          {error && (
            <div className="error-alert">
              <p>{error}</p>
              <button onClick={() => setError(null)} className="error-close">×</button>
            </div>
          )}
          
          <div className="register-form-container">
            <form onSubmit={handleSubmit} className="register-form">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="form-step">
                  <h2 className="form-section-title">Informations du restaurant</h2>
                  
                  <div className="form-group">
                    <label htmlFor="name">Nom du restaurant *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: La Belle Assiette"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="type">Type de cuisine *</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Sélectionnez un type de cuisine</option>
                      {RESTAURANT_TYPES.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.emoji} {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="description">Description de votre restaurant</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre restaurant, votre cuisine, votre ambiance..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email professionnel</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contact@votrerestaurant.fr"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Téléphone</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="01 23 45 67 89"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="website">Site web (optionnel)</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://www.votrerestaurant.fr"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="priceRange">Gamme de prix</label>
                    <select
                      id="priceRange"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Sélectionnez une gamme de prix</option>
                      {PRICE_RANGES.map(range => (
                        <option key={range.id} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-actions">
                    <Link to="/" className="btn-secondary">Annuler</Link>
                    <button type="button" className="btn-primary" onClick={nextStep}>
                      Continuer
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Address and Media */}
              {currentStep === 2 && (
                <div className="form-step">
                  <h2 className="form-section-title">Adresse et photo</h2>
                  
                  <div className="form-group">
                    <label htmlFor="street">Rue / Numéro *</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      placeholder="123 rue de la Gastronomie"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">Ville *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Paris"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="zipCode">Code postal *</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        placeholder="75001"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="state">Région/Département</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Île-de-France"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="country">Pays *</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        placeholder="France"
                      />
                    </div>
                  </div>
                  
                  <div className="form-media-section">
                    <h3>Photo principale du restaurant *</h3>
                    
                    <div className="media-upload-container">
                      <div className="media-upload-box cover-upload">
                        <label htmlFor="image" className="upload-label">
                          <div className="upload-icon">
                            {imagePreview ? (
                              <img src={imagePreview} alt="Restaurant preview" className="preview-image" />
                            ) : (
                              <>
                                <i className="upload-icon-symbol">+</i>
                                <span>Photo du restaurant</span>
                                <small>Recommandé: 1200 x 800 px</small>
                              </>
                            )}
                          </div>
                          <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="file-input"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={prevStep}>
                      Retour
                    </button>
                    <button type="button" className="btn-primary" onClick={nextStep}>
                      Continuer
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review and Confirm */}
              {currentStep === 3 && (
                <div className="form-step">
                  <h2 className="form-section-title">Confirmation des informations</h2>
                  
                  <div className="confirmation-section">
                    <div className="confirmation-visual">
                      {imagePreview ? (
                        <div className="confirmation-cover" style={{ backgroundImage: `url(${imagePreview})` }}>
                          <div className="restaurant-type-badge">
                            {RESTAURANT_TYPES.find(t => t.id === formData.type)?.emoji || '🍽️'} 
                            {RESTAURANT_TYPES.find(t => t.id === formData.type)?.name || 'Restaurant'}
                          </div>
                        </div>
                      ) : (
                        <div className="confirmation-cover default-cover">
                          <div className="restaurant-type-badge">
                            {RESTAURANT_TYPES.find(t => t.id === formData.type)?.emoji || '🍽️'} 
                            {RESTAURANT_TYPES.find(t => t.id === formData.type)?.name || 'Restaurant'}
                          </div>
                        </div>
                      )}
                      
                      <h3 className="confirmation-restaurant-name">{formData.name || 'Nom du restaurant'}</h3>
                      
                      {formData.priceRange && (
                        <div className="confirmation-price-range">
                          {formData.priceRange}
                        </div>
                      )}
                    </div>
                    
                    <div className="confirmation-details">
                      <div className="confirmation-detail-group">
                        <h4>Coordonnées</h4>
                        <p><strong>Adresse:</strong> {formData.street}, {formData.zipCode} {formData.city}{formData.state ? `, ${formData.state}` : ''}</p>
                        <p><strong>Pays:</strong> {formData.country}</p>
                        {formData.phoneNumber && <p><strong>Téléphone:</strong> {formData.phoneNumber}</p>}
                        {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
                        {formData.website && <p><strong>Site web:</strong> {formData.website}</p>}
                      </div>
                      
                      {formData.description && (
                        <div className="confirmation-detail-group">
                          <h4>Description</h4>
                          <p>{formData.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="terms-agreement">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">
                      J'accepte les <a href="/terms" target="_blank">conditions d'utilisation</a> et la <a href="/privacy" target="_blank">politique de confidentialité</a> de MenuFinder
                    </label>
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={prevStep}>
                      Retour
                    </button>
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Envoi en cours...' : 'Finaliser l\'inscription'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <h2 className="section-title">Les avantages de MenuFinder</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">👁️</div>
              <h3>Visibilité accrue</h3>
              <p>Faites-vous connaître auprès de milliers de clients potentiels dans votre région</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">📱</div>
              <h3>Menu digital</h3>
              <p>Affichez votre menu en ligne et mettez à jour vos plats en temps réel</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Statistiques</h3>
              <p>Suivez les performances de votre établissement et analysez les tendances</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">⭐</div>
              <h3>Avis clients</h3>
              <p>Recevez des retours de vos clients et améliorez votre réputation</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">Ils nous font confiance</h2>
          
          <div className="testimonials-slider">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Depuis que nous avons rejoint MenuFinder, notre fréquentation a augmenté de 30%. Une véritable opportunité pour notre restaurant !"</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-author-avatar"></div>
                <div className="testimonial-author-info">
                  <h4>Sophie Martin</h4>
                  <p>Le Petit Bistrot, Paris</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterRestaurant;