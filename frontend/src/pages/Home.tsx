import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.scss';
import SearchBar from '../components/commom/SearchBar';
// import '../styles/pages/Home.scss';

interface Restaurant {
    id: number;
    name: string;
    category: string;
    rating: number;
    priceRange: string;
    image: string;
    location: string;
}

const SAMPLE_RESTAURANTS: Restaurant[] = [
    {
        id: 1,
        name: "McDonald",
        category: "Burger",
        rating: 4.1,
        priceRange: "Entre 10€ et 20€ par personne",
        image: "https://th.bing.com/th/id/OIP.yCEfne1mh87jp5Ppnf0SWgHaEL?rs=1&pid=ImgDetMain",
        location: "italien"
    },
    {
        id: 2,
        name: "Sushi Palace",
        category: "Sushi",
        rating: 4.7,
        priceRange: "Entre 15€ et 30€ par personne",
        image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "japonais"
    },
    {
        id: 3,
        name: "Thai Delight",
        category: "Thai",
        rating: 4.5,
        priceRange: "Entre 12€ et 25€ par personne",
        image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "thaïlandais"
    },
    {
        id: 4,
        name: "Pizza Roma",
        category: "Italien",
        rating: 4.3,
        priceRange: "Entre 10€ et 20€ par personne",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "italien"
    },
    {
        id: 5,
        name: "Burger King",
        category: "Burger",
        rating: 3.9,
        priceRange: "Entre 8€ et 15€ par personne",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "américain"
    },
    {
        id: 6,
        name: "Pasta Palace",
        category: "Italien",
        rating: 4.4,
        priceRange: "Entre 12€ et 25€ par personne",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "italien"
    },
    {
        id: 7,
        name: "La Charcuterie",
        category: "Italien",
        rating: 4.7,
        priceRange: "Entre 12€ et 25€ par personne",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "américain"
    },
    {
        id: 8,
        name: "Le Jardin Vert",
        category: "vegetarien",
        rating: 4.5,
        priceRange: "Entre 12€ et 25€ par personne",
        image: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
        location: "végétarien"
    },
    {
        id: 9,
        name: "La Méditerranée",
        category: "méditerranéen",
        rating: 4.4,
        priceRange: "Entre 12€ et 25€ par personne",
        image: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
        location: "méditerranéen"
    },
    {
        id: 10,
        name: "Le Crépuscule",
        category: "francais",
        rating: 4.6,
        priceRange: "Entre 12€ et 25€ par personne",
        image: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
        location: "Français"
    }
];

const CATEGORIES = [
    { id: 'all', name: 'Tous', emoji: '🍽️' },
    { id: 'burger', name: 'Burger', emoji: '🍔' },
    { id: 'sushi', name: 'Sushi', emoji: '🍣' },
    { id: 'thai', name: 'Thai', emoji: '🥢' },
    { id: 'italien', name: 'Italien', emoji: '🍝' },
    { id: 'francais', name: 'Français', emoji: '🥐' },
    { id: 'indien', name: 'Indien', emoji: '🍛' },
    { id: 'mexicain', name: 'Mexicain', emoji: '🌮' },
    { id: 'vegetarien', name: 'Végétarien', emoji: '🥗' }
];

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userCity, setUserCity] = useState('votre ville');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(SAMPLE_RESTAURANTS);

    useEffect(() => {
        if (navigator.geolocation) {
            console.log(navigator.geolocation)
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

    useEffect(() => {
        let filtered = SAMPLE_RESTAURANTS;

        // Filtrer par catégorie
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(restaurant => restaurant.category.toLowerCase() === selectedCategory);
        }

        // Filtrer par recherche
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(restaurant =>
                restaurant.name.toLowerCase().includes(query) ||
                restaurant.category.toLowerCase().includes(query) ||
                restaurant.location.toLowerCase().includes(query)
            );
        }

        // Limiter à 9 restaurants maximum
        setFilteredRestaurants(filtered.slice(0, 9));
    }, [searchQuery, selectedCategory]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // La recherche est maintenant gérée par useEffect
        console.log('Recherche de:', searchQuery);
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div>
            {/* Section Héro avec recherche */}
            <section className="hero"
                style={{ paddingTop: '0', marginTop: '0', height: 'auto' }}>
                <div className="hero-bg">
                    <div className="hero-overlay"></div>
                    <div className="hero-image"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80')" }}></div>
                </div>
                <div className="hero-content" style={{ paddingTop: '2rem' }}>
                    <h1 className="hero-title" style={{ margin: 0 }}>Découvrez les
                        meilleurs de {userCity}</h1>
                    <p className="hero-subtitle">Trouvez facilement les menus et
                        restaurants qui vous correspondent selon vos envies et
                        votre emplacement.</p>
                    <p>test</p>
                    {SearchBar(searchQuery, setSearchQuery)}
                </div>
            </section>

            {/* Barre de catégories */}
            <nav className="categories-nav">
                <div className="categories-container">
                    <div className="categories-scroll no-scrollbar">
                        <div className="categories-list">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                >
                                    <span
                                        className="category-emoji">{category.emoji}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Section des restaurants */}
            <section className="section section-light">
                <div className="section-container">
                    <h2 className="section-title">Explorez par catégorie</h2>
                    <div className="restaurant-grid">
                        {filteredRestaurants.length > 0 ? (
                            filteredRestaurants.map((restaurant) => (
                                <div key={restaurant.id}
                                    className="restaurant-card">
                                    <div style={{ overflow: 'hidden' }}>
                                        <img src={restaurant.image}
                                            alt={restaurant.name}
                                            className="restaurant-image" />
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <h3 className="restaurant-name">{restaurant.name}</h3>
                                        <p className="restaurant-price">
                                            {restaurant.priceRange} · <span
                                                className="restaurant-rating">{restaurant.rating}
                                                <span
                                                    style={{ color: '#FFD166' }}>★</span></span>
                                        </p>
                                        <span
                                            className="restaurant-category">{restaurant.category}</span>
                                        <div style={{
                                            marginTop: '1rem',
                                            textAlign: 'right'
                                        }}>
                                            <Link
                                                to={`/restaurant/${restaurant.id}`}
                                                className="view-menu-link">Voir
                                                le menu →</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-xl text-dark/70">Aucun
                                    restaurant trouvé dans cette catégorie</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Section CTA */}
            <section className="cta-section">
                <div className="section-container">
                    <h2 className="cta-title">Vous êtes restaurateur ?</h2>
                    <p className="cta-text">Rejoignez MenuFinder et faites
                        découvrir votre établissement et vos spécialités à des
                        milliers de clients potentiels.</p>
                    <Link
                        to="/register-restaurant"
                        className="inline-block px-6 py-3 bg-[#fda928] text-white font-medium rounded-md hover:bg-[#fda928]/90 transition-colors"
                    > 
                        Ajouter mon restaurant
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
