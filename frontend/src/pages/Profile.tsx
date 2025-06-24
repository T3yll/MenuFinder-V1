import React, { useEffect, useState } from 'react';
import '../styles/pages/profile.scss';
import { getUserProfile } from '../services/user.service';
import { Button } from '@mui/material';

const Profile: React.FC = () => {
    const [user, setUser] = useState<{ username: string; image_path:string; contributions: number; followers: number; following: number }>({
        username: '',
        image_path: '/default.png',
        contributions: 0,
        followers: 0,
        following: 0,
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getUserProfile();
                
                // Récupérer l'ID utilisateur depuis le localStorage
                const userStr = localStorage.getItem('user');
                let userId = null;
                if (userStr) {
                    const userData = JSON.parse(userStr);
                    userId = userData.id;
                }
                
                // Récupérer les contributions (avis) depuis l'API
                const contributionsCount = userId ? await fetchUserContributions(userId) : 0;

                setUser({
                    username: `${(data as unknown as {prenom: string, nom: string}).prenom} ${(data as unknown as {prenom: string, nom: string}).nom}` || '',
                    image_path: data.image_path || '/default.png',
                    contributions: contributionsCount,
                    followers: 0, // À implémenter plus tard
                    following: 0, // À implémenter plus tard
                });
            } catch (err) {
                console.error('Erreur lors du chargement du profil', err);
            }
        }

        fetchUser();
    }, []);

    const fetchUserContributions = async (userId: number): Promise<number> => {
        try {
            const response = await fetch(`http://localhost:4000/reviews/user/${userId}`);
            if (response.ok) {
                const reviews = await response.json();
                return reviews.length;
            } else {
                console.error('Erreur lors de la récupération des contributions');
                return 0;
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des contributions:', err);
            return 0;
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-banner" style={{ backgroundImage: `url(/banner.png)` ,WebkitFilter:'blur(3px)', backgroundSize: 'cover' }}>
                <div className="banner-overlay"></div> 
            </div>

            <div className="profile-header">
                <div className="avatar">
                    <img src={user.image_path} alt="Avatar utilisateur" />
                </div>
                <div className="profile-info">
                    <h2>{user.username || 'Nom d’utilisateur'}</h2>
                    <div className="stats">
                        <span>Contributions <strong>{user.contributions}</strong></span>
                    </div>
                </div>
                <Button href='/updateProfile' className="edit-profile-btn">Modifier le profil</Button>
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
