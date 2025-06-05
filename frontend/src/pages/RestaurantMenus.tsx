import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Restaurant, Menu } from '../types/Restaurant';
import { MenuService, CreateMenuDto } from '../services/MenuService';
import { RestaurantService } from '../services/RestaurantService';
import '../styles/pages/RestaurantMenus.scss';

const RestaurantMenus: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddMenu, setShowAddMenu] = useState<boolean>(false);
    const [newMenuName, setNewMenuName] = useState<string>('');
    const [newMenuDescription, setNewMenuDescription] = useState<string>('');
    const [editMenuId, setEditMenuId] = useState<number | null>(null);
    const [editMenuName, setEditMenuName] = useState<string>('');
    const [editMenuDescription, setEditMenuDescription] = useState<string>('');
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => {
        const fetchRestaurantAndMenus = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                const restaurantId = parseInt(id);
                
                // Récupérer les détails du restaurant
                const restaurantData = await RestaurantService.findOne(restaurantId);
                setRestaurant(restaurantData);
                
                // Récupérer les menus du restaurant
                const menuData = await MenuService.findByRestaurant(restaurantId);
                setMenus(menuData);
                
                setLoading(false);
            } catch (err) {
                setError("Erreur lors de la récupération des données");
                setLoading(false);
                console.error(err);
            }
        };

        fetchRestaurantAndMenus();
    }, [id]);
    
    const handleAddMenu = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!id || !newMenuName.trim()) return;
        
        try {
            const menuData: CreateMenuDto = {
                restaurant_id: parseInt(id),
                name: newMenuName.trim(),
                description: newMenuDescription.trim()
            };
            
            const createdMenu = await MenuService.create(menuData);
            
            // Mettre à jour la liste des menus
            setMenus([...menus, createdMenu]);
            
            // Réinitialiser le formulaire
            setNewMenuName('');
            setNewMenuDescription('');
            setShowAddMenu(false);
        } catch (err) {
            setError("Erreur lors de la création du menu");
            console.error(err);
        }
    };
    
    const handleEditMenu = (menu: Menu) => {
        setEditMenuId(menu.menu_id);
        setEditMenuName(menu.name);
        setEditMenuDescription(menu.description || '');
    };
    
    const handleUpdateMenu = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!editMenuId || !editMenuName.trim()) return;
        
        try {
            const updatedMenuData = {
                name: editMenuName.trim(),
                description: editMenuDescription.trim()
            };
            
            const updatedMenu = await MenuService.update(editMenuId, updatedMenuData);
            
            // Mettre à jour la liste des menus
            setMenus(menus.map(menu => 
                menu.menu_id === editMenuId ? { ...menu, ...updatedMenu } : menu
            ));
            
            // Réinitialiser le formulaire d'édition
            setEditMenuId(null);
            setEditMenuName('');
            setEditMenuDescription('');
        } catch (err) {
            setError("Erreur lors de la mise à jour du menu");
            console.error(err);
        }
    };
    
    const handleCancelEdit = () => {
        setEditMenuId(null);
        setEditMenuName('');
        setEditMenuDescription('');
    };
    
    const handleDeleteConfirm = (menuId: number) => {
        setDeleteConfirm(menuId);
    };
    
    const handleDeleteCancel = () => {
        setDeleteConfirm(null);
    };
    
    const handleDeleteMenu = async (menuId: number) => {
        try {
            await MenuService.remove(menuId);
            
            // Mettre à jour la liste des menus
            setMenus(menus.filter(menu => menu.menu_id !== menuId));
            
            setDeleteConfirm(null);
        } catch (err) {
            setError("Erreur lors de la suppression du menu");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="restaurant-menus-container">
                <div className="loading-spinner">Chargement des menus...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="restaurant-menus-container">
                <div className="error-message">
                    <h2>Erreur</h2>
                    <p>{error}</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/dashboard')}
                    >
                        Retour au tableau de bord
                    </button>
                </div>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="restaurant-menus-container">
                <div className="error-message">
                    <h2>Restaurant introuvable</h2>
                    <p>Le restaurant que vous essayez de consulter n'existe pas ou a été supprimé.</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/dashboard')}
                    >
                        Retour au tableau de bord
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="restaurant-menus-container">
            <div className="menus-header">
                <div className="header-nav">
                    <Link to="/dashboard" className="btn btn-back">
                        ← Retour au tableau de bord
                    </Link>
                </div>
                <div className="restaurant-info">
                    <h1>Gestion des menus</h1>
                    <div className="restaurant-name">
                        <span>Restaurant :</span> {restaurant.name}
                    </div>
                </div>
            </div>

            <div className="menus-actions">
                <button 
                    className="btn btn-add-menu"
                    onClick={() => setShowAddMenu(!showAddMenu)}
                >
                    {showAddMenu ? 'Annuler' : '+ Ajouter un menu'}
                </button>
            </div>

            {showAddMenu && (
                <div className="add-menu-form-container">
                    <h2>Ajouter un nouveau menu</h2>
                    <form onSubmit={handleAddMenu} className="menu-form">
                        <div className="form-group">
                            <label htmlFor="menuName">Nom du menu</label>
                            <input
                                type="text"
                                id="menuName"
                                value={newMenuName}
                                onChange={(e) => setNewMenuName(e.target.value)}
                                placeholder="Ex: Menu du Midi, Menu Dégustation..."
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="menuDescription">Description (optionnel)</label>
                            <textarea
                                id="menuDescription"
                                value={newMenuDescription}
                                onChange={(e) => setNewMenuDescription(e.target.value)}
                                placeholder="Décrivez votre menu en quelques mots..."
                                rows={3}
                            />
                        </div>
                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="btn btn-cancel"
                                onClick={() => setShowAddMenu(false)}
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-save"
                            >
                                Ajouter le menu
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="menus-list">
                <h2>Menus disponibles</h2>
                
                {menus.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <h3>Aucun menu disponible</h3>
                        <p>Commencez par ajouter un menu pour votre restaurant.</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setShowAddMenu(true)}
                        >
                            Créer mon premier menu
                        </button>
                    </div>
                ) : (
                    <div className="menu-cards">
                        {menus.map(menu => (
                            <div 
                                key={menu.menu_id} 
                                className={`menu-card ${editMenuId === menu.menu_id ? 'editing' : ''}`}
                            >
                                {editMenuId === menu.menu_id ? (
                                    // Formulaire d'édition
                                    <form onSubmit={handleUpdateMenu} className="edit-menu-form">
                                        <div className="form-group">
                                            <label htmlFor={`editMenuName-${menu.menu_id}`}>Nom du menu</label>
                                            <input
                                                type="text"
                                                id={`editMenuName-${menu.menu_id}`}
                                                value={editMenuName}
                                                onChange={(e) => setEditMenuName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`editMenuDescription-${menu.menu_id}`}>Description</label>
                                            <textarea
                                                id={`editMenuDescription-${menu.menu_id}`}
                                                value={editMenuDescription}
                                                onChange={(e) => setEditMenuDescription(e.target.value)}
                                                rows={3}
                                            />
                                        </div>
                                        <div className="form-actions">
                                            <button 
                                                type="button" 
                                                className="btn btn-cancel"
                                                onClick={handleCancelEdit}
                                            >
                                                Annuler
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="btn btn-save"
                                            >
                                                Enregistrer
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    // Affichage du menu
                                    <>
                                        <div className="menu-content">
                                            <h3 className="menu-name">{menu.name}</h3>
                                            {menu.description && (
                                                <p className="menu-description">{menu.description}</p>
                                            )}
                                            <div className="menu-meta">
                                                <span className="menu-items-count">
                                                    {menu.meals ? menu.meals.length : 0} plats
                                                </span>
                                            </div>
                                        </div>
                                        <div className="menu-actions">
                                            <Link
                                                to={`/menu-items/${menu.menu_id}`}
                                                className="btn btn-manage-items"
                                            >
                                                Gérer les plats
                                            </Link>
                                            <div className="action-buttons">
                                                <button 
                                                    className="btn btn-edit"
                                                    onClick={() => handleEditMenu(menu)}
                                                >
                                                    Modifier
                                                </button>
                                                <button 
                                                    className="btn btn-delete"
                                                    onClick={() => handleDeleteConfirm(menu.menu_id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {deleteConfirm === menu.menu_id && (
                                            <div className="delete-confirmation">
                                                <p>Êtes-vous sûr de vouloir supprimer le menu <strong>{menu.name}</strong> ?</p>
                                                <p className="warning">Cette action supprimera également tous les plats associés à ce menu.</p>
                                                <div className="confirmation-actions">
                                                    <button 
                                                        className="btn btn-cancel"
                                                        onClick={handleDeleteCancel}
                                                    >
                                                        Annuler
                                                    </button>
                                                    <button 
                                                        className="btn btn-confirm-delete"
                                                        onClick={() => handleDeleteMenu(menu.menu_id)}
                                                    >
                                                        Confirmer
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantMenus;