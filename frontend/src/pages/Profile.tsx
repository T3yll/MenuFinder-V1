import React, { useEffect, useState } from 'react';
import '../styles/pages/profile.scss';
import { getUserProfile } from '../services/user.service';

const Profile: React.FC = () => {
    const [user, setUser] = useState<{ username: string; contributions: number; followers: number; following: number }>({
        username: '',
        contributions: 0,
        followers: 0,
        following: 0,
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getUserProfile();
                setUser(data);
            } catch (err) {
                console.error('Erreur lors du chargement du profil', err);
            }
        }

        fetchUser();
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-banner">
                <button className="edit-cover-btn">Ajouter une photo de couverture</button>
            </div>

            <div className="profile-header">
                <div className="avatar">
                    <img src="/assets/images/avatar.png" alt="Avatar utilisateur" />
                </div>
                <div className="profile-info">
                    <h2>{user.username || 'Nom d’utilisateur'}</h2>
                    <div className="stats">
                        <span>Contributions <strong>{user.contributions}</strong></span>
                        <span>Abonnés <strong>{user.followers}</strong></span>
                        <span>Abonnements <strong>{user.following}</strong></span>
                    </div>
                </div>
                <button className="edit-profile-btn">Modifier le profil</button>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h3>Vos Accomplissements</h3>
                    <p>Commencez à partager pour débloquer des niveaux</p>
                    <button className="primary-btn">Écrivez votre premier avis</button>
                </div>

                <div className="profile-section">
                    <h3>Complétez votre profil</h3>
                    <p>Ajoutez des infos pour que les utilisateurs puissent vous trouver facilement</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
