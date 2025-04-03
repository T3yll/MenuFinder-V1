import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('token');

      // Vérification que le token est bien présent
      if (token) {
        setIsAuthenticated(true); // Utilisateur authentifié
      } else {
        // Rediriger vers la page d'erreur si le token n'est pas présent
        setIsAuthenticated(false);
      }

      setLoading(false); // Terminer l'état de chargement
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Chargement...</div>; // Afficher un loader pendant la vérification
  }

  return isAuthenticated ? (
    <>{children}</> // Afficher les enfants (composants protégés)
  ) : (
    <Navigate to="/error" replace /> // Rediriger vers la page d'erreur
  );
};

export default ProtectedRoute;
