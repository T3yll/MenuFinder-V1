import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Restaurant } from '../types/Restaurant';
import '../styles/pages/EditRestaurant.scss';
import { RestaurantService} from '../services/RestaurantService';
import { upload } from '../services/file.service';

// Fonction utilitaire pour obtenir l'URL de l'image
const getImageUrl = (restaurant: Restaurant) => {
    if (!restaurant) return null;
    
    if (restaurant.image && restaurant.image.path) {
        // Si c'est une URL complète
        if (restaurant.image.path.startsWith('http')) {
            return restaurant.image.path;
        }
        // Sinon, construire l'URL correcte vers le fichier local
        return `/${restaurant.image.path}`;
    } 
    
    if (restaurant.image_file_id) {
        // Si on a un ID de fichier image mais pas d'objet image complet
        return `http://localhost:3000/api/files/${restaurant.image_file_id}`;
    }
    
    // Image par défaut
    return null;
};

const EditRestaurant: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        type: '',
    });

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                const restaurantData = await RestaurantService.findOne(parseInt(id));
                setRestaurant(restaurantData);
                setFormData({
                    name: restaurantData.name,
                    type: restaurantData.type,
                });

                // Définir l'aperçu de l'image avec la fonction utilitaire
                const imageUrl = getImageUrl(restaurantData);
                if (imageUrl) {
                    setImagePreview(imageUrl);
                }
                
                setLoading(false);
            } catch (err) {
                setError("Erreur lors de la récupération des détails du restaurant");
                setLoading(false);
                console.error(err);
            }
        };

        fetchRestaurant();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
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

    const handleOpenFileDialog = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!id || !restaurant) return;
        
        try {
            setSaving(true);
            
            // Uploader la nouvelle image si elle a été changée
            let updatedImageFileId = restaurant.image_file_id;
            
            if (newImageFile) {
                try {
                    const uploadedFile = await upload(newImageFile);
                    updatedImageFileId = uploadedFile.file_id;
                    console.log("Nouvelle image téléchargée, ID:", updatedImageFileId);
                } catch (err) {
                    setError("Erreur lors de l'upload de l'image");
                    setSaving(false);
                    console.error(err);
                    return;
                }
            }
            
            // Préparer les données à mettre à jour
            const updatedData = {
                name: formData.name,
                type: formData.type,
                image_file_id: updatedImageFileId
            };
            
            console.log("Mise à jour du restaurant avec les données:", updatedData);
            
            // Mettre à jour les données du restaurant
            await RestaurantService.update(parseInt(id), updatedData);
            
            setSuccess(true);
            setSaving(false);
            
            // Rediriger vers le dashboard après 2 secondes
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            setError("Erreur lors de la mise à jour du restaurant");
            setSaving(false);
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="edit-restaurant-container">
                <div className="loading-spinner">Chargement des informations du restaurant...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="edit-restaurant-container">
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
            <div className="edit-restaurant-container">
                <div className="error-message">
                    <h2>Restaurant introuvable</h2>
                    <p>Le restaurant que vous essayez de modifier n'existe pas ou a été supprimé.</p>
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
        <div className="edit-restaurant-container">
            <div className="edit-header">
                <div className="header-nav">
                    <Link to="/dashboard" className="btn btn-back">
                        ← Retour au tableau de bord
                    </Link>
                    <Link to="/" className="btn btn-back">
                        ← Retour à l'accueil
                    </Link>
                </div>
                <h1>Modifier le restaurant</h1>
            </div>

            {success && (
                <div className="success-message">
                    Restaurant mis à jour avec succès! Redirection en cours...
                </div>
            )}

            <div className="edit-form-container">
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="name">Nom du restaurant</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type de cuisine</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Sélectionner un type</option>
                            <option value="français">Français</option>
                            <option value="italien">Italien</option>
                            <option value="japonais">Japonais</option>
                            <option value="américain">Américain</option>
                            <option value="thaïlandais">Thaïlandais</option>
                            <option value="indien">Indien</option>
                            <option value="mexicain">Mexicain</option>
                            <option value="burger">Burger</option>
                            <option value="pizza">Pizza</option>
                            <option value="sushi">Sushi</option>
                            <option value="végétarien">Végétarien</option>
                            <option value="vegan">Vegan</option>
                            <option value="méditerranéen">Méditerranéen</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Image du restaurant</label>
                        <div className="image-upload-container">
                            <div 
                                className="image-preview" 
                                onClick={handleOpenFileDialog}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Aperçu du restaurant" />
                                ) : (
                                    <div className="no-image">
                                        <span>Pas d'image sélectionnée</span>
                                    </div>
                                )}
                                <div className="image-overlay">
                                    <span>Cliquez pour changer l'image</span>
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
                                    <p>Nouveau fichier sélectionné: <strong>{newImageFile.name}</strong></p>
                                </div>
                            )}
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={handleOpenFileDialog}
                            >
                                {restaurant.image_file_id ? 'Changer l\'image' : 'Ajouter une image'}
                            </button>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn btn-cancel"
                            onClick={() => navigate('/dashboard')}
                        >
                            Annuler
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-save"
                            disabled={saving}
                        >
                            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                        </button>
                    </div>
                </form>

                <div className="restaurant-preview">
                    <h3>Aperçu</h3>
                    <div className="preview-card">
                        <div className="preview-image">
                            {imagePreview ? (
                                <img src={imagePreview} alt={formData.name} />
                            ) : (
                                <div className="image-placeholder">
                                    <span>Pas d'image</span>
                                </div>
                            )}
                        </div>
                        <div className="preview-info">
                            <h4>{formData.name}</h4>
                            <p className="preview-type">{formData.type}</p>
                            {restaurant.adress && (
                                <p className="preview-address">
                                    {restaurant.adress.street}, {restaurant.adress.city}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRestaurant;