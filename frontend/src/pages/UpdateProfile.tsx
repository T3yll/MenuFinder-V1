import React, { useState } from 'react';

interface UpdateProfileProps {
    currentFirstName?: string;
    currentLastName?: string;
    currentProfilePic?: string;
    onUpdate: (data: { firstName: string; lastName: string; profilePic?: File | null }) => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({
    currentFirstName = localStorage.getItem('user.nom') || '',
    currentLastName = localStorage.getItem('user.prenom') || '',
    currentProfilePic = localStorage.getItem('user.image_file_id') || '',
    onUpdate,
}) => {
    const [firstName, setFirstName] = useState(currentFirstName);
    const [lastName, setLastName] = useState(currentLastName);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [preview, setPreview] = useState(currentProfilePic);

    const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ firstName, lastName, profilePic });
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Mettre a jour son profil</h2>
            <div>
                <label>Nom:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Prenom:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Avatar:</label>
                <input type="file" accept="image/*" onChange={handlePicChange} />
                {preview && (
                    <div>
                        <img
                            src={preview}
                            alt="Profile Preview"
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </div>
                )}
            </div>
            <button type="submit">Valider</button>
        </form>
    );
};

export default UpdateProfile;