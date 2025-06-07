import React, { useEffect, useState } from 'react';
import '../styles/pages/profile.scss';
import { getUserProfile } from '../services/user.service';
import { Button } from 'antd';
import CustomAvatar from '../components/Avatar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Block } from '@mui/icons-material';

const Profile: React.FC = () => {
    const [user, setUser] = useState<{ username: string; image_path: string; contributions: number; followers: number; following: number }>({
        username: '',
        image_path: 'public/default.png',
        contributions: 0,
        followers: 0,
        following: 0,
    });
    const userlocal = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = userlocal.user_id;
    user.username = userlocal.username;
    
    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getUserProfile();
                //setUser(data);
            } catch (err) {
                console.error('Erreur lors du chargement du profil', err);
            }
        }

        fetchUser();
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-banner" style={{ backgroundImage: `url(public/banner.png)`, WebkitFilter: 'blur(3px)', backgroundSize: 'cover' }}>
                <div className="banner-overlay"></div>
            </div>

            <div className="profile-header">
                <CustomAvatar fileId={userlocal.image_file_id} />
                <div className="profile-info">
                    <div className="flex justify-between items-center">
                        <h2>{user.username || 'Nom d’utilisateur'}</h2>
                        <Button className="secondary-btn">
                            <Link to={`/updateProfile`} >
                                <FontAwesomeIcon icon={faEdit} />
                            </Link>
                        </Button>
                    </div>

                    <div className="stats">
                        <span>Contributions <strong>{user.contributions}</strong></span>
                        <span>Abonnés <strong>{user.followers}</strong></span>
                        <span>Abonnements <strong>{user.following}</strong></span>
                    </div>
                </div>

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
