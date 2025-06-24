import React, { useState, useEffect } from 'react';
import { updateUserProfile, getUserProfile } from '../services/user.service';
import { useAppDispatch } from '../hooks/storeToast';
import { useProfilePicture } from '../hooks/useProfilePicture';
import { showToast } from '../store/slice/toastSlice';

export interface UpdateProfileFormData {
    nom: string;
    prenom: string;
    ProfilePic?: File | null;
}

const UpdateProfile: React.FC = () => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const dispatch = useAppDispatch();
    const [firstName, setFirstName] = useState(currentUser.prenom || '');
    const [lastName, setLastName] = useState(currentUser.nom || '');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const { picture, setPicture } = useProfilePicture();

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
        if (e.target.files?.[0]) {
            setProfilePic(e.target.files[0]);
            setPicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'nom') setLastName(value);
        if (name === 'prenom') setFirstName(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id: string = currentUser.id || '';
        updateUserProfile({ prenom: firstName, nom: lastName, ProfilePic: profilePic }, id)
            .then(() => {
                dispatch(showToast({
                    message: 'Profil mis à jour avec succès',
                    severity: 'success'
                }));
            })
            .catch((error) => {
                dispatch(showToast({
                    message: error.message || 'Erreur lors de la mise à jour du profil',
                    severity: 'error'
                }));
            });
    };

    return (
        <div className="px-4 py-6">
            <section className="bg-gray-100 rounded-md shadow-sm mb-6 p-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Mettre à jour le profil</h1>
            </section>

            <section className="bg-white rounded-md shadow p-6 max-w-3xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom *</label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={lastName}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom *</label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={firstName}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="text-left">
                        <h3 className="text-lg font-semibold mb-2">Avatar</h3>
                        <div className="flex flex-col items-center sm:flex-row gap-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
                                <img
                                    src={picture || '/default.png'}
                                    alt="Aperçu"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label htmlFor="image" className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
                                Changer l'image
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handlePicChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-4">
                        <button
                            type="reset"
                            className="btn-secondary border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
                            onClick={() => {
                                setFirstName(currentUser.prenom || '');
                                setLastName(currentUser.nom || '');
                                setProfilePic(null);
                                setPicture(currentUser.image_path || '/default.png');
                            }}
                        >
                            Réinitialiser
                        </button>
                        <button
                            type="submit"
                            className="btn-primary bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Mettre à jour le profil
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default UpdateProfile;
