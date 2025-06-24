// import axios from 'axios';
// import { toast } from 'react-toastify';

// const url = import.meta.env.VITE_API_URL;

// async function handleToken() {
//   try {
//     const token = await authService.login();
//     return `Bearer ${token}`;
//   } catch (error) {
//     console.error('Erreur lors de la récupération du token', error);
//     // window.location.href = '/error';
//     throw new Error('Redirection due to token fetch failure');
//   }
// }

// // Création de l'instance d'axios apiClient avec intercepteurs
// const apiClient = (contentType: string) => {
//   const instance = axios.create({
//     baseURL: url,
//     headers: {
//       'Content-Type': contentType || 'application/json',
//     },
//   });

//   // Intercepteur pour ajouter le token d'authentification
//   instance.interceptors.request.use(
//     async (config) => {
//       let token = localStorage.getItem('token');

//       // Si le token n'est pas présent, on le récupère via authService
//       if (!token && import.meta.env.VITE_NODE_ENV === 'development') {
//         config.headers['Authorization'] = await handleToken();
//       } else {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }

//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && error.response.status === 503) {
//         toast.error("Cette fonctionnalité est innaccessible");
//       } else if (error.response && error.response.status === 403) {
//         toast.error("Vous n'avez pas les droits pour accéder à cette fonctionnalité");
//       }
//       return Promise.reject(error);
//     }
//   );

//   if (import.meta.env.VITE_NODE_ENV === 'development') {
//     instance.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (
//           !error.response ||
//           error.response.status === 401
//         ) {
//           // Gestion centralisée des erreurs de connexion et d'authentification
//           error.config.headers['Authorization'] = await handleToken();
//         }
//         return Promise.reject(error);
//       }
//     );
//   }

//   return instance;
// };

// export default apiClient;
