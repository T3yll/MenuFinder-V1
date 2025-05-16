import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/NavBar.scss";
import logo from '../assets/images/Plan_de_travail_1_copie_2-20-removebg-preview.png';
import CurrencySelector from "./CurrencySelector";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className="navbar-container flex items-center justify-between px-6 py-3 shadow">
            <div className="flex items-center space-x-6">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="MenuFinder" className="navbar-logo" />
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
                {isLoggedIn ? (
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
                        <p>test</p>
                        <Link
                            to="/profile"
                            className="btn-primary text-white py-2 px-4 rounded transition-colors"
                        >
                            Profil
                        </Link>
                    </>
                }
            </div>
        </nav>
    );
};

export default NavBar;
