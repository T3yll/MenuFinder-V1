import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.scss';
import SearchBar from '../components/commom/SearchBar';

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userCity, setUserCity] = useState('Paris');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=10`
                        );
                        const data = await response.json();
                        if (data.address && data.address.city) {
                            setUserCity(data.address.city);
                        }
                    } catch (error) {
                        console.error("Erreur lors de l'obtention de la ville:", error);
                    }
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                }
            );
        }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Recherche de:', searchQuery);
    };

    return (
        <div className="modern-landing">
            {/* Hero Section Ultra-Modern */}
            <section className="hero-modern">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span>🍔</span>
                            <span>Livraison en 30min</span>
                        </div>
                        <h1 className="hero-title">
                            Commandez vos plats
                            <br />
                            <span className="gradient-text">favoris à {userCity}</span>
                        </h1>
                        <p className="hero-description">
                            Des milliers de restaurants. Une seule app. 
                            Votre repas livré en un temps record.
                        </p>
                        
                        <div className="search-container">
                            <div className="search-wrapper">
                                <div className="search-icon">📍</div>
                                <input 
                                    type="text" 
                                    placeholder={`Trouvez un restaurant à ${userCity}...`}
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="search-btn">
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="quick-actions">
                            <span className="quick-label">Populaires:</span>
                            <div className="quick-tags">
                                <span className="quick-tag">🍕 Pizza</span>
                                <span className="quick-tag">🍔 Burgers</span>
                                <span className="quick-tag">🍱 Sushi</span>
                                <span className="quick-tag">🥗 Salade</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="hero-visual">
                        <div className="phone-mockup">
                            <div className="phone-content">
                                <div className="app-header">
                                    <div className="location">📍 {userCity}</div>
                                    <div className="avatar">👤</div>
                                </div>
                                <div className="app-search">
                                    <div className="search-bar-mini">🔍 Que voulez-vous manger ?</div>
                                </div>
                                <div className="categories-mini">
                                    <div className="cat-item">🍔</div>
                                    <div className="cat-item">🍕</div>
                                    <div className="cat-item">🍱</div>
                                    <div className="cat-item">🥗</div>
                                </div>
                                <div className="restaurants-mini">
                                    <div className="resto-card-mini">
                                        <div className="resto-img"></div>
                                        <div className="resto-info">
                                            <div className="resto-name">McDonald's</div>
                                            <div className="resto-rating">⭐ 4.2 • 15-25 min</div>
                                        </div>
                                    </div>
                                    <div className="resto-card-mini">
                                        <div className="resto-img"></div>
                                        <div className="resto-info">
                                            <div className="resto-name">Pizza Palace</div>
                                            <div className="resto-rating">⭐ 4.5 • 20-30 min</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="features-modern">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">⚡</div>
                            <h3>Livraison express</h3>
                            <p>En moyenne 30 minutes</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🛡️</div>
                            <h3>Paiement sécurisé</h3>
                            <p>Protection garantie</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📱</div>
                            <h3>Suivi en temps réel</h3>
                            <p>Suivez votre commande</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">⭐</div>
                            <h3>Restaurants premium</h3>
                            <p>Qualité garantie</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works - Modern */}
            <section className="process-modern">
                <div className="container">
                    <h2 className="section-title">Comment ça marche</h2>
                    <div className="process-steps">
                        <div className="process-step">
                            <div className="step-visual">
                                <div className="step-circle">1</div>
                                <div className="step-icon">🔍</div>
                            </div>
                            <h3>Explorez</h3>
                            <p>Parcourez des milliers de restaurants près de chez vous</p>
                        </div>
                        <div className="process-arrow">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        <div className="process-step">
                            <div className="step-visual">
                                <div className="step-circle">2</div>
                                <div className="step-icon">🛒</div>
                            </div>
                            <h3>Commandez</h3>
                            <p>Choisissez vos plats favoris et ajoutez-les au panier</p>
                        </div>
                        <div className="process-arrow">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        <div className="process-step">
                            <div className="step-visual">
                                <div className="step-circle">3</div>
                                <div className="step-icon">🚚</div>
                            </div>
                            <h3>Savourez</h3>
                            <p>Votre repas arrive chaud directement chez vous</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Uber style */}
            <section className="stats-modern">
                <div className="container">
                    <div className="stats-content">
                        <h2>King Eats en chiffres</h2>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-number">50K+</div>
                                <div className="stat-label">Commandes livrées</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">1200+</div>
                                <div className="stat-label">Restaurants partenaires</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">28min</div>
                                <div className="stat-label">Temps moyen de livraison</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">4.9⭐</div>
                                <div className="stat-label">Note moyenne</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Restaurant Partner CTA */}
            <section className="partner-cta">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <div className="cta-icon">👨‍🍳</div>
                            <h2>Rejoignez nos partenaires restaurateurs</h2>
                            <p>Développez votre business avec King Eats. Atteignez de nouveaux clients et augmentez vos revenus.</p>
                            <div className="cta-benefits">
                                <span className="benefit">✓ Inscription gratuite</span>
                                <span className="benefit">✓ Commission attractive</span>
                                <span className="benefit">✓ Support dédié 7j/7</span>
                            </div>
                            <Link to="/register-restaurant" className="cta-button">
                                Devenir partenaire
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="footer-cta">
                <div className="container">
                    <div className="footer-content">
                        <h2>Prêt à commander ?</h2>
                        <p>Découvrez les meilleurs restaurants de {userCity}</p>
                        <Link to="/restaurants" className="main-cta-button">
                            Commencer ma commande
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;