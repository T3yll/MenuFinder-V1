import { useNavigate } from "react-router-dom";
import authService from "@/common/service/authService";
import { useEffect } from "react";

const Error = () => {

    const navigate = useNavigate();

    const attemptLogin = async () => {
        try {
            await authService.login();
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            attemptLogin();
        }, 3000); // Appelle attemptLogin toutes les 3 secondes

        return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage du composant
    }, []);

    return (
        <div className="text-center mt-12">
            <h1 className="text-xl font-bold pt-5">Accès refusé</h1>
            <p className="mt-4">Vous n'êtes pas authentifié. Veuillez vous connecter via le SSO pour accéder à l'application.</p>
            <progress className="progress w-56 mt-2"></progress>
            <p className="mt-1 pb-5">Tentative de reconnexion...</p>
        </div>
    );
};

export default Error;
