import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/NavBar.scss";
import CurrencySelector from "./CurrencySelector";
import { logout } from "../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'


const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);

    //setIsLoggedIn(localStorage.getItem('token') !== null);

    return (
        <nav className="navbar-container flex items-center justify-between px-6 py-3 shadow">
            <div className="flex items-center space-x-6">
                <Link to="/" className="navbar-brand">
                    <img src="logo.png" alt="MenuFinder" className="navbar-logo" />
                </Link>
                <div className="flex space-x-4">
                    <Link to="/" className="text-gray-700 hover:text-gray-900">
                        Accueil
                    </Link>
                    <Link to="/restaurants" className="text-gray-700 hover:text-gray-900">
                        Restaurants
                    </Link>
                    <Link to="/map" className="text-gray-700 hover:text-gray-900">
                        Carte
                    </Link>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <CurrencySelector />
                {!isLoggedIn ? (
                    <>  
                        <Link
                            to="/login"
                            className="btn-primary text-white py-2 px-4 rounded transition-colors"
                        >
                            Connexion
                        </Link>
                        <Link
                            to="/register"
                            className="btn-outline py-2 px-4 rounded border transition-colors"
                        >
                            S'inscrire
                        </Link>
                    </>
                )
                    :
                    <>
                        <Link
                            to="/dashboard"
                            className="btn-primary text-white py-2 px-4 rounded transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/profile"
                            className="btn-primary text-white py-2 px-4 rounded transition-colors"
                        >
                            Profil
                        </Link>  
                           <Link
                            to="/"
                            onClick={() => {
                                logout();
                                setIsLoggedIn(false);
                            }}
                            className="btn-warning text-white py-2 px-4 rounded transition-colors"
                        >
                            <FontAwesomeIcon icon={faSignOut} title="Déconnexion" />
                        </Link>        
                    </>

                }
            </div>
        </nav>
    );
};

export default NavBar;
