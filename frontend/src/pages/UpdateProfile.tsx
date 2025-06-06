import React, { useState, useEffect } from 'react';
import { updateUserProfile, getUserProfile } from '../services/user.service';
import { useAppDispatch } from '../hooks/storeToast';
import { useProfilePicture } from '../hooks/useProfilePicture';
import { showToast } from '../store/slice/toastSlice';


interface UpdateProfileProps {
    currentFirstName?: string;
    currentLastName?: string;
    currentProfilePic?: string;
}

export interface UpdateProfileFormData {
    nom: string;
    prenom: string;
    ProfilePic?: File | null;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({
    currentFirstName = '',
    currentLastName = '',
    currentProfilePic = '',
}) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    currentFirstName = currentFirstName || currentUser.nom || '';
    currentLastName = currentLastName || currentUser.prenom || '';
    
    const dispatch = useAppDispatch();
    const [firstName, setFirstName] = useState(currentFirstName);
    const [lastName, setLastName] = useState(currentLastName);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const {picture,setPicture}= useProfilePicture();
    currentProfilePic = picture || 'public/default.png';
    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getUserProfile();
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setPicture(data.image_path || '');
            } catch (err) {
                console.error('Erreur lors du chargement du profil', err);
            }
        }

        fetchUser();
    }, []);

    const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(e.target.files[0]);
            setPicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'nom') {
            setLastName(value);
        } else if (name === 'prenom') {
            setFirstName(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id: string = JSON.parse(localStorage.getItem('user') || "{}").id || ''
        updateUserProfile({ prenom: firstName, nom: lastName, ProfilePic: profilePic }, id).then((result) => {
                dispatch(showToast({
                    message: 'Profil mis à jour avec succès',
                    severity: 'success'
                }));
        }).catch((error) => {
            console.error('Erreur lors de la mise à jour du profil', error);
            dispatch(showToast({
                message: error.message || 'Erreur lors de la mise à jour du profil',
                severity: 'error'
            }));
        });
    }

return (
    <div className="register-restaurant-page" style={{ padding: '1%' }}>
        <section className="register-hero">
            <div className="hero-bg">
                <div className="hero-overlay"></div>
                <div className="hero-image" style={{ backgroundImage: "/public/banner.png" }}></div>
            </div>
            <div className="hero-content">
                <h1 className="hero-title">Mettre a jour le profil</h1>

            </div>
        </section>
        <section className="section section-light">
            <div className="section-container">
                <div className="register-form-container" style={{ padding: '6px' }}>
                    <form onSubmit={handleSubmit} className="update-profile-form">
                        <div className="form-step">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nom">Nom *</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="prenom">Prenom *</label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        name="prenom"
                                        value={firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>


                            <div className="form-media-section">
                                <h3>Avatar</h3>
                                <div className="media-upload-container">
                                    <div className="media-upload-box cover-upload">
                                        <label htmlFor="image" className="upload-label">
                                            <div className="upload-icon">
                                                {picture ? (
                                                    <img src={picture} alt="Profile Preview" className="profile-preview" />
                                                ) : (
                                                    <span className="upload-placeholder">Choisir une image</span>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                onChange={handlePicChange}
                                                accept="image/*"
                                                className="file-input"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="reset" className="btn-secondary" onClick={() => {
                                    setFirstName(currentFirstName);
                                    setLastName(currentLastName);
                                    setProfilePic(null);
                                    setPicture(currentProfilePic);
                                }}>
                                    Réinitialiser
                                </button>
                                <button type="submit" className="btn-primary" onClick={handleSubmit}>
                                    Mettre à jour le profil
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    </div>
);
};

export default UpdateProfile;