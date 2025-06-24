import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/NavBar.scss";
import CurrencySelector from "./CurrencySelector";
import { logout } from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSignOut } from "@fortawesome/free-solid-svg-icons";

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem("token") !== null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("token") !== null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/"); // Redirige vers la home après déconnexion
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar-container shadow px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Logo + Brand */}
        <Link to="/" className="navbar-brand flex items-center space-x-2">
          <img src="/logo.png" alt="MenuFinder" className="h-8 w-auto" />
        </Link>

        {/* Burger menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 text-2xl focus:outline-none"
          aria-label="Menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Accueil</Link>
          <Link to="/restaurants" className="text-gray-700 hover:text-gray-900">Restaurants</Link>
          <Link to="/map" className="text-gray-700 hover:text-gray-900">Carte</Link>
        </div>

        {/* Right-side actions (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <CurrencySelector />
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-primary text-white py-2 px-4 rounded">Connexion</Link>
              <Link to="/register" className="btn-outline py-2 px-4 rounded border">S'inscrire</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="btn-primary text-white py-2 px-4 rounded">Dashboard</Link>
              <Link to="/profile" className="btn-primary text-white py-2 px-4 rounded">Profil</Link>
              <button
                onClick={handleLogout}
                className="btn-warning text-white py-2 px-4 rounded"
              >
                <FontAwesomeIcon icon={faSignOut} title="Déconnexion" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3">
          <Link to="/" onClick={closeMenu} className="text-gray-700">Accueil</Link>
          <Link to="/restaurants" onClick={closeMenu} className="text-gray-700">Restaurants</Link>
          <Link to="/map" onClick={closeMenu} className="text-gray-700">Carte</Link>
          <CurrencySelector />
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={closeMenu} className="btn-primary text-white py-2 px-4 rounded">Connexion</Link>
              <Link to="/register" onClick={closeMenu} className="btn-outline py-2 px-4 rounded border">S'inscrire</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="btn-primary text-white py-2 px-4 rounded">Dashboard</Link>
              <Link to="/profile" onClick={closeMenu} className="btn-primary text-white py-2 px-4 rounded">Profil</Link>
              <button
                onClick={handleLogout}
                className="btn-warning text-white py-2 px-4 rounded"
              >
                <FontAwesomeIcon icon={faSignOut} title="Déconnexion" />
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
