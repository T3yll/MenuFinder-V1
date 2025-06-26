import React, { useState } from 'react';
import { registerUser } from '../services/user.service';

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 8,
  padding: 32,
  minWidth: 320,
  boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 4,
  border: '1px solid #ccc',
  fontSize: 16,
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: 4,
  border: 'none',
  background: '#1976d2',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: 16,
};

const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: 14,
};

const successStyle: React.CSSProperties = {
  color: 'green',
  fontSize: 14,
};

const CreateAdminButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setPrenom('');
    setNom('');
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!prenom.trim() || !nom.trim() || !email.trim() || !password.trim()) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez saisir un email valide.');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    setLoading(true);
    try {
      await registerUser({ prenom, nom, email, password, bAdmin: true });
      setSuccess('Administrateur créé avec succès !');
      setTimeout(() => {
        handleClose();
      }, 1200);
    } catch (err: any) {
      setError('Erreur lors de la création de l\'administrateur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button style={buttonStyle} onClick={handleOpen}>Ajouter un administrateur</button>
      {open && (
        <div style={modalStyle} onClick={handleClose}>
          <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <h2>Créer un administrateur</h2>
            <form onSubmit={handleSubmit}>
              <input
                style={inputStyle}
                type="text"
                placeholder="Prénom"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                required
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Nom de famille"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
              />
              <input
                style={inputStyle}
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                style={inputStyle}
                type="password"
                placeholder="Mot de passe (8+ caractères)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {error && <div style={errorStyle}>{error}</div>}
              {success && <div style={successStyle}>{success}</div>}
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button type="button" style={{ ...buttonStyle, background: '#888' }} onClick={handleClose} disabled={loading}>Annuler</button>
                <button type="submit" style={buttonStyle} disabled={loading}>{loading ? 'Création...' : 'Créer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAdminButton;
