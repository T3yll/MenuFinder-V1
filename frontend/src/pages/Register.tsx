import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../styles/pages/Register.scss';
import { log } from 'console';
import { registerUser } from '../services/user.service';
// import './Register.css';



const Register: React.FC = () => {
  const Navigate = useNavigate();
  const [prenom, setFirstName] = useState('');
  const [nom, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!prenom.trim()) {
      setError('Veuillez saisir votre prénom.');
      return false;
    }

    if (!nom.trim()) {
      setError('Veuillez saisir votre nom de famille.');
      return false;
    }

    if (!email.trim()) {
      setError('Veuillez saisir votre email.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez saisir un email valide.');
      return false;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return false;
    }

    if (!agreeTerms) {
      setError('Vous devez accepter les conditions d\'utilisation.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit');
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      console.log('validateForm failed');
      return;
    }

    console.log('validateForm ok');
    setIsLoading(true);

    try {
      console.log('Register start:', { prenom, nom, email, password });
      
      // Only send the fields that CreateUserDto expects
      const userData = {
        prenom,
        nom,
        email,
        password
        // Remove username and confirmPassword - they shouldn't be sent to backend
      };
      
      const user = await registerUser(userData);

      console.log('Register success');
      console.log('user', user);
      Navigate("/login");

    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);     
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <Link to="/" className="back-to-home">
              <span className="back-arrow">←</span> Retour à l'accueil
            </Link>
            <h1 className="register-title">Inscription</h1>
            <p className="register-subtitle">Créez votre compte MenuFinder</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Prénom</label>
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={prenom}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Votre prénom"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name" className="form-label">Nom de famille</label>
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={nom}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Votre nom de famille"
                />
              </div>
            </div>


            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-input password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <small className="password-hint">8 caractères minimum</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
              <div className="input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password"
                  className="form-input password-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="********"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
                <span className="checkmark"></span>
                J'accepte les <Link to="/terms" className="terms-link">conditions d'utilisation</Link> et la <Link to="/privacy" className="terms-link">politique de confidentialité</Link>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="register-button"
                disabled={isLoading}
              >
                {isLoading ? 'Traitement en cours...' : 'Créer un compte'}
              </button>
            </div>
          </form>

          <div className="register-footer">
            <p>Vous avez déjà un compte ? <Link to="/login" className="login-link">Se connecter</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
