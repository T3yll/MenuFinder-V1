import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/auth.service'; // Assurez-vous d'importer votre service d'authentification
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/user.service'; // Assurez-vous d'importer votre service utilisateur
import { useAppDispatch } from '../hooks/storeToast';
import { showToast } from '../store/slice/toastSlice';

import '../styles/pages/Login.scss';
// import './Login.css';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Connexion avec:', { email, password, rememberMe });

      // Simuler un délai de connexion
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirection après connexion réussie
      login({ email, password })
        .then(async (response) => {
          console.log('Réponse de connexion:', response);
          localStorage.setItem('token', response.access_token);
          const user = await getUserProfile(response.access_token)
          console.log('Utilisateur connecté:', user);
          localStorage.setItem('user', JSON.stringify(user));
          
          dispatch(showToast({
            message: 'Connexion réussie!',
            severity: 'success'
          }));
          
          setTimeout(() => {
            navigate('/');
          }, 1000);
        })
        .catch((error) => {
          console.error('Erreur de connexion:', error);
          setError('Erreur de connexion. Veuillez réessayer.');
          
          dispatch(showToast({
            message: 'Erreur de connexion. Veuillez réessayer.',
            severity: 'error'
          }));
        });
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.');
      
      dispatch(showToast({
        message: 'Identifiants incorrects. Veuillez réessayer.',
        severity: 'error'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const testToasts = () => {
    dispatch(showToast({
      message: 'Message de succès!',
      severity: 'success',
      duration: 3000
    }));

    setTimeout(() => {
      dispatch(showToast({
        message: 'Message d\'erreur!',
        severity: 'error',
        duration: 3000
      }));
    }, 1000);

    setTimeout(() => {
      dispatch(showToast({
        message: 'Message d\'information!',
        severity: 'info',
        duration: 3000
      }));
    }, 2000);

    setTimeout(() => {
      dispatch(showToast({
        message: 'Message d\'avertissement!',
        severity: 'warning',
        duration: 3000
      }));
    }, 3000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <Link to="/" className="back-to-home">
              <span className="back-arrow">←</span> Retour à l'accueil
            </Link>
            <h1 className="login-title">Connexion</h1>
            <p className="login-subtitle">Accédez à votre compte MenuFinder</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
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
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <div className="input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
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
                  aria-label={
                    showPassword
                      ? 'Masquer le mot de passe'
                      : 'Afficher le mot de passe'
                  }
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="checkmark"></span>
                  Se souvenir de moi
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Mot de passe oublié?
                </Link>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>
              Vous n'avez pas de compte?{' '}
              <Link to="/register" className="register-link">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
