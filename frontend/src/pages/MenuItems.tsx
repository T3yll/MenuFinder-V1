import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Menu } from '../types/Restaurant';
import { MenuService, MealService, CreateMealDto } from '../services/MenuService';
import '../styles/pages/MenuItems.scss';
import { FileService } from '../services/RestaurantService';

// Catégories pour les plats
const MEAL_CATEGORIES = [
  { id: 'entrée', name: 'Entrée' },
  { id: 'plat', name: 'Plat principal' },
  { id: 'dessert', name: 'Dessert' },
  { id: 'boisson', name: 'Boisson' },
  { id: 'accompagnement', name: 'Accompagnement' },
  { id: 'spécialité', name: 'Spécialité' },
  { id: 'enfant', name: 'Menu enfant' },
  { id: 'végétarien', name: 'Végétarien' },
  { id: 'autre', name: 'Autre' }
];

const MenuItems: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editFileInputRef = useRef<HTMLInputElement>(null);
    
    const [menu, setMenu] = useState<Menu | null>(null);
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddMeal, setShowAddMeal] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    
    // États pour le nouveau plat
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image_file_id: null as number | null
    });
    
    // États pour la modification de plat
    const [editMealId, setEditMealId] = useState<number | null>(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image_file_id: null as number | null
    });
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    
    // État pour la confirmation de suppression
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    
    useEffect(() => {
        const fetchMenuAndMeals = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                const menuId = parseInt(id);
                
                // Récupérer les détails du menu
                const menuData = await MenuService.findOne(menuId);
                setMenu(menuData);
                
                // Récupérer les plats du menu
                const mealData = await MealService.findByMenu(menuId);
                setMeals(mealData);
                
                setLoading(false);
            } catch (err) {
                setError("Erreur lors de la récupération des données");
                setLoading(false);
                console.error(err);
            }
        };

        fetchMenuAndMeals();
    }, [id]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setNewImageFile(file);
            
            // Créer un aperçu de l'image sélectionnée
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setEditImageFile(file);
            
            // Créer un aperçu de l'image sélectionnée
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleOpenFileDialog = () => {
        fileInputRef.current?.click();
    };
    
    const handleOpenEditFileDialog = () => {
        editFileInputRef.current?.click();
    };
    
    const handleAddMeal = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!id || !formData.name.trim() || !formData.price) return;
        
        try {
            // Uploader l'image si elle a été sélectionnée
            let imageFileId = null;
            
            if (newImageFile) {
                try {
                    const uploadedFile = await FileService.upload(newImageFile);
                    imageFileId = uploadedFile.file_id;
                } catch (err) {
                    setError("Erreur lors de l'upload de l'image");
                    console.error(err);
                    return;
                }
            }
            
            // Convertir le prix en number pour s'assurer qu'il est correctement formaté
            const price = parseFloat(parseFloat(formData.price).toFixed(2));
            
            const mealData: CreateMealDto = {
                menu_id: parseInt(id),
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: price,
                meal_category_id: formData.category ? parseInt(formData.category) : undefined,
                image_file_id: imageFileId
            };
            
            console.log("Données du plat à envoyer:", mealData);
            
            const createdMeal = await MealService.create(mealData);
            
            // Mettre à jour la liste des plats
            setMeals([...meals, createdMeal]);
            
            // Réinitialiser le formulaire
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                image_file_id: null
            });
            setImagePreview(null);
            setNewImageFile(null);
            setShowAddMeal(false);
        } catch (err) {
            setError("Erreur lors de la création du plat");
            console.error(err);
        }
    };
    
    const handleEditMeal = (meal: any) => {
        setEditMealId(meal.item_id);
        setEditFormData({
            name: meal.name,
            description: meal.description || '',
            price: meal.price.toString(),
            category: meal.category || '',
            image_file_id: meal.image_file_id
        });
        
        if (meal.image_file_id) {
            setEditImagePreview(`http://localhost:3000/api/files/${meal.image_file_id}`);
        } else {
            setEditImagePreview(null);
        }
        
        setEditImageFile(null);
    };
    
    const handleUpdateMeal = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!editMealId || !editFormData.name.trim() || !editFormData.price) return;
        
        try {
            // Uploader la nouvelle image si elle a été changée
            let updatedImageFileId = editFormData.image_file_id;
            
            if (editImageFile) {
                try {
                    const uploadedFile = await FileService.upload(editImageFile);
                    updatedImageFileId = uploadedFile.file_id;
                } catch (err) {
                    setError("Erreur lors de l'upload de l'image");
                    console.error(err);
                    return;
                }
            }
            
            // Convertir le prix en number pour s'assurer qu'il est correctement formaté
            const price = parseFloat(parseFloat(editFormData.price).toFixed(2));
            
            const updatedMealData = {
                name: editFormData.name.trim(),
                description: editFormData.description.trim(),
                price: price,
                meal_category_id: editFormData.category ? parseInt(editFormData.category) : undefined,
                image_file_id: updatedImageFileId
            };
            
            console.log("Données du plat à mettre à jour:", updatedMealData);
            
            const updatedMeal = await MealService.update(editMealId, updatedMealData);
            
            // Mettre à jour la liste des plats
            setMeals(meals.map(meal => 
                meal.item_id === editMealId ? { ...meal, ...updatedMeal } : meal
            ));
            
            // Réinitialiser le formulaire d'édition
            setEditMealId(null);
            setEditFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                image_file_id: null
            });
            setEditImagePreview(null);
            setEditImageFile(null);
        } catch (err) {
            setError("Erreur lors de la mise à jour du plat");
            console.error(err);
        }
    };
    
    const handleCancelEdit = () => {
        setEditMealId(null);
        setEditFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image_file_id: null
        });
        setEditImagePreview(null);
        setEditImageFile(null);
    };
    
    const handleDeleteConfirm = (mealId: number) => {
        setDeleteConfirm(mealId);
    };
    
    const handleDeleteCancel = () => {
        setDeleteConfirm(null);
    };
    
    const handleDeleteMeal = async (mealId: number) => {
        try {
            await MealService.remove(mealId);
            
            // Mettre à jour la liste des plats
            setMeals(meals.filter(meal => meal.item_id !== mealId));
            
            setDeleteConfirm(null);
        } catch (err) {
            setError("Erreur lors de la suppression du plat");
            console.error(err);
        }
    };
    
    const getImageUrl = (meal: any) => {
        if (meal.image_file_id) {
            return `http://localhost:3000/api/files/${meal.image_file_id}`;
        }
        return null;
    };
    
    // Fonction pour formater le prix correctement
    const formatPrice = (price: any): string => {
        // Si price est undefined ou null, retourner "0.00"
        if (price === undefined || price === null) {
            return "0.00";
        }
        
        // Si price est déjà une chaîne, essayer de la convertir en nombre
        if (typeof price === 'string') {
            try {
                return parseFloat(price).toFixed(2);
            } catch (e) {
                return "0.00";
            }
        }
        
        // Si price est un nombre, utiliser toFixed
        if (typeof price === 'number') {
            return price.toFixed(2);
        }
        
        // Pour tout autre cas, convertir en chaîne
        return String(price);
    };

    if (loading) {
        return (
            <div className="menu-items-container">
                <div className="loading-spinner">Chargement des plats...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="menu-items-container">
                <div className="error-message">
                    <h2>Erreur</h2>
                    <p>{error}</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            if (menu) {
                                navigate(`/restaurant-menus/${menu.restaurant_id}`);
                            } else {
                                navigate('/dashboard');
                            }
                        }}
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    if (!menu) {
        return (
            <div className="menu-items-container">
                <div className="error-message">
                    <h2>Menu introuvable</h2>
                    <p>Le menu que vous essayez de consulter n'existe pas ou a été supprimé.</p>
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
        <div className="menu-items-container">
            <div className="items-header">
                <div className="header-nav">
                    <Link to={`/restaurant-menus/${menu.restaurant_id}`} className="btn btn-back">
                        ← Retour aux menus
                    </Link>
                </div>
                <div className="menu-info">
                    <h1>Gestion des plats</h1>
                    <div className="menu-name">
                        <span>Menu :</span> {menu.name}
                    </div>
                </div>
            </div>

            <div className="items-actions">
                <button 
                    className="btn btn-add-item"
                    onClick={() => setShowAddMeal(!showAddMeal)}
                >
                    {showAddMeal ? 'Annuler' : '+ Ajouter un plat'}
                </button>
            </div>

            {showAddMeal && (
                <div className="add-item-form-container">
                    <h2>Ajouter un nouveau plat</h2>
                    <form onSubmit={handleAddMeal} className="item-form">
                        <div className="form-grid">
                            <div className="form-left">
                                <div className="form-group">
                                    <label htmlFor="name">Nom du plat</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Filet mignon, Salade César..."
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Catégorie</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {MEAL_CATEGORIES.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Prix (€)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        placeholder="Ex: 15.90"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description (optionnel)</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Ingrédients, préparation, allergènes..."
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <div className="form-right">
                                <div className="form-group">
                                    <label>Image du plat (optionnel)</label>
                                    <div className="image-upload-container">
                                        <div 
                                            className="image-preview" 
                                            onClick={handleOpenFileDialog}
                                        >
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Aperçu du plat" />
                                            ) : (
                                                <div className="no-image">
                                                    <span>Pas d'image sélectionnée</span>
                                                </div>
                                            )}
                                            <div className="image-overlay">
                                                <span>Cliquez pour ajouter une image</span>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                        {newImageFile && (
                                            <div className="file-info">
                                                <p>Fichier sélectionné: <strong>{newImageFile.name}</strong></p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="btn btn-cancel"
                                onClick={() => setShowAddMeal(false)}
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-save"
                            >
                                Ajouter le plat
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="items-list">
                <h2>Plats disponibles</h2>
                
                {meals.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🍽️</div>
                        <h3>Aucun plat disponible</h3>
                        <p>Commencez par ajouter des plats à votre menu.</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setShowAddMeal(true)}
                        >
                            Ajouter mon premier plat
                        </button>
                    </div>
                ) : (
                    <div className="meal-cards">
                        {meals.map(meal => (
                            <div 
                                key={meal.item_id} 
                                className={`meal-card ${editMealId === meal.item_id ? 'editing' : ''}`}
                            >
                                {editMealId === meal.item_id ? (
                                    // Formulaire d'édition
                                    <form onSubmit={handleUpdateMeal} className="edit-meal-form">
                                        <div className="form-grid">
                                            <div className="form-left">
                                                <div className="form-group">
                                                    <label htmlFor={`editName-${meal.item_id}`}>Nom du plat</label>
                                                    <input
                                                        type="text"
                                                        id={`editName-${meal.item_id}`}
                                                        name="name"
                                                        value={editFormData.name}
                                                        onChange={handleEditInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor={`editCategory-${meal.item_id}`}>Catégorie</label>
                                                    <select
                                                        id={`editCategory-${meal.item_id}`}
                                                        name="category"
                                                        value={editFormData.category}
                                                        onChange={handleEditInputChange}
                                                        required
                                                    >
                                                        <option value="">Sélectionner une catégorie</option>
                                                        {MEAL_CATEGORIES.map(category => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor={`editPrice-${meal.item_id}`}>Prix (€)</label>
                                                    <input
                                                        type="number"
                                                        id={`editPrice-${meal.item_id}`}
                                                        name="price"
                                                        value={editFormData.price}
                                                        onChange={handleEditInputChange}
                                                        step="0.01"
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor={`editDescription-${meal.item_id}`}>Description</label>
                                                    <textarea
                                                        id={`editDescription-${meal.item_id}`}
                                                        name="description"
                                                        value={editFormData.description}
                                                        onChange={handleEditInputChange}
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-right">
                                                <div className="form-group">
                                                    <label>Image du plat</label>
                                                    <div className="image-upload-container">
                                                        <div 
                                                            className="image-preview" 
                                                            onClick={handleOpenEditFileDialog}
                                                        >
                                                            {editImagePreview ? (
                                                                <img src={editImagePreview} alt="Aperçu du plat" />
                                                            ) : (
                                                                <div className="no-image">
                                                                    <span>Pas d'image</span>
                                                                </div>
                                                            )}
                                                            <div className="image-overlay">
                                                                <span>Cliquez pour changer l'image</span>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={editFileInputRef}
                                                            onChange={handleEditFileChange}
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                        />
                                                        {editImageFile && (
                                                            <div className="file-info">
                                                                <p>Nouveau fichier: <strong>{editImageFile.name}</strong></p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
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
                                    // Affichage du plat
                                    <>
                                        <div className="meal-image">
                                            {getImageUrl(meal) ? (
                                                <img src={getImageUrl(meal)} alt={meal.name} />
                                            ) : (
                                                <div className="no-image">
                                                    <span>Pas d'image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="meal-content">
                                            <h3 className="meal-name">{meal.name}</h3>
                                            <div className="meal-meta">
                                                <span className="meal-price">{formatPrice(meal.price)} €</span>
                                                <span className="meal-category">
                                                    {MEAL_CATEGORIES.find(c => c.id === meal.category)?.name || meal.category}
                                                </span>
                                            </div>
                                            {meal.description && (
                                                <p className="meal-description">{meal.description}</p>
                                            )}
                                            <div className="meal-actions">
                                                <button 
                                                    className="btn btn-edit"
                                                    onClick={() => handleEditMeal(meal)}
                                                >
                                                    Modifier
                                                </button>
                                                <button 
                                                    className="btn btn-delete"
                                                    onClick={() => handleDeleteConfirm(meal.item_id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {deleteConfirm === meal.item_id && (
                                            <div className="delete-confirmation">
                                                <p>Êtes-vous sûr de vouloir supprimer le plat <strong>{meal.name}</strong> ?</p>
                                                <div className="confirmation-actions">
                                                    <button 
                                                        className="btn btn-cancel"
                                                        onClick={handleDeleteCancel}
                                                    >
                                                        Annuler
                                                    </button>
                                                    <button 
                                                        className="btn btn-confirm-delete"
                                                        onClick={() => handleDeleteMeal(meal.item_id)}
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

export default MenuItems;