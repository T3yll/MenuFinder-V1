import axios, { AxiosResponse } from "axios";
import { User,UserFromDB } from "../types/User";
import { UpdateProfileFormData } from "../pages/UpdateProfile";
import {getPath, upload} from "../services/file.service"
import { generateUsername } from "../helpers/user.helper";

export interface UserRegister {
  prenom: string;
  nom: string;
  email: string;
  password: string;
  username?: string; // Optional - backend will generate if not provided
  bAdmin?: boolean; // Optional
  image_file_id?: number; // Optional
}

interface UserUpdate {
    prenom: string;
    nom: string;
    username: string;
    password?: string;
    image_file_id?: string;
}

export const registerUser = async (user: UserRegister) => {
    user.username = generateUsername(user.prenom, user.nom);
    console.log('username', user.username);

    const response: AxiosResponse<User> = await axios.post(`${process.env.VITE_API_URL}/users`, user);

    if (response.status !== 201) {
        throw new Error('Failed to register user');
    }

    console.log('registerUser ok');
    return response.data;
};

export const getUserById = async (id: number): Promise<UserFromDB> => {
    const response: AxiosResponse<UserFromDB> = await axios.get(`${process.env.VITE_API_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (response.status !== 200) {
        throw new Error('Failed to fetch user');
    }
    const user = response.data;
    user.image_path = await getPath(user.image_file_id?.toString() || "-1") || 'public/default.png';
    console.log('getUserById', user);
    return user;
};




export async function getUserProfile(token: string = localStorage.getItem('token') || ''): Promise<User> {
    const res = await fetch(`${process.env.VITE_API_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error('Erreur lors du chargement du profil');
    }
    const data = await res.json();
    data.image_path = await getPath(JSON.parse(localStorage.getItem("user") || '{}').image_file_id) || 'public/default.png';
    console.log('getUserProfile', data);
    return data
}

export async function updateUserProfile(info:UpdateProfileFormData ,id:string): Promise<Boolean> {
    console.log('bool', !(info.prenom?.trim() || info.nom?.trim()));
    if (!(info.prenom?.trim() || info.nom?.trim()) ) {
        throw new Error('Veuillez saisir votre prénom et nom.');
    }

    const username = generateUsername(info.prenom, info.nom);
    var fullinfo: UserUpdate;
    if (info.ProfilePic){
        const uploadedFile = await upload(info.ProfilePic as Blob);
        fullinfo = {
            prenom: info.prenom,
            nom: info.nom,
            username: username,
            image_file_id: uploadedFile.file_id.toString()
        }
    } else {
        fullinfo = {
            prenom: info.prenom,
            nom: info.nom,
            username: username
        }
    }
    
    const res = axios.patch<User>(`${process.env.VITE_API_URL}/users/${id}`, fullinfo, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    if ((await res).status == 200 || (await res).status == 201) {
        localStorage.setItem('user', JSON.stringify((await res).data));
        return true;       
    }
    throw new Error('Erreur lors de la mise à jour du profil');
}

  export async function GetUserImagePath(userId: number): Promise<string> {
    try {
      const response = await axios.get(`${process.env.VITE_API_URL}/users/${userId}`, {
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
        console.log('Image URL: avatar : ', imageUrl);
      return imageUrl;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'image du restaurant:', error);
        throw error;
        }
}

// Nouvelles interfaces pour l'admin (en plus de vos existantes)
interface PaginatedUsersResponse {
  data: UserFromDB[];
  total: number;
  page: number;
  totalPages: number;
}

// Interface pour créer un utilisateur depuis l'admin (différent de UserRegister)
interface AdminCreateUserData {
  prenom: string;
  nom: string;
  email: string;
  password: string;
  username?: string;
  bAdmin?: boolean;
  image_file_id?: number;
}

// Interface pour mettre à jour un utilisateur depuis l'admin (différent de UserUpdate)
interface AdminUpdateUserData {
  prenom?: string;
  nom?: string;
  email?: string;
  password?: string;
  username?: string;
  bAdmin?: boolean;
  image_file_id?: number;
}

/**
 * NOUVELLES FONCTIONS POUR L'ADMIN - Ajoutez ces fonctions à votre service existant
 */

/**
 * Récupère tous les utilisateurs avec pagination et recherche (ADMIN)
 */
export const getAllUsers = async (
  page: number = 1,
  offset: number = 10,
  search?: string
): Promise<PaginatedUsersResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('offset', offset.toString());
    if (search) {
      params.append('search', search);
    }

    const response: AxiosResponse<PaginatedUsersResponse> = await axios.get(
      `${process.env.VITE_API_URL}/users?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch users');
    }

    // Ajouter les chemins d'images aux utilisateurs
    const usersWithImages = await Promise.all(
      response.data.data.map(async (user) => ({
        ...user,
        image_path: await getPath(user.image_file_id?.toString() || "-1") || 'public/default.png'
      }))
    );

    return {
      ...response.data,
      data: usersWithImages
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

/**
 * Crée un nouvel utilisateur depuis l'admin (différent de registerUser)
 */
export const createUser = async (userData: AdminCreateUserData): Promise<User> => {
  try {
    // Générer le username si pas fourni
    const userToCreate = {
      ...userData,
      username: userData.username || generateUsername(userData.prenom, userData.nom)
    };

    const response: AxiosResponse<User> = await axios.post(
      `${process.env.VITE_API_URL}/users`,
      userToCreate,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.status !== 201) {
      throw new Error('Failed to create user');
    }

    console.log('Admin: User created successfully');
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to create user');
  }
};

/**
 * Met à jour un utilisateur depuis l'admin (différent de updateUserProfile)
 */
export const updateUser = async (
  userId: number,
  userData: AdminUpdateUserData
): Promise<User> => {
  try {
    // Générer le username si prénom/nom changent mais pas de username fourni
    const userToUpdate = { ...userData };
    if ((userData.prenom || userData.nom) && !userData.username) {
      // Récupérer l'utilisateur actuel pour avoir les infos manquantes
      const currentUser = await getUserById(userId);
      const prenom = userData.prenom || currentUser.firstName;
      const nom = userData.nom || currentUser.lastName;
      userToUpdate.username = generateUsername(prenom, nom);
    }

    const response: AxiosResponse<User> = await axios.patch(
      `${process.env.VITE_API_URL}/users/${userId}`,
      userToUpdate,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to update user');
    }

    console.log('Admin: User updated successfully');
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to update user');
  }
};

/**
 * Supprime un utilisateur (ADMIN)
 */
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    const response = await axios.delete(
      `${process.env.VITE_API_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to delete user');
    }

    console.log('Admin: User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to delete user');
  }
};

/**
 * Récupère le nombre total d'utilisateurs
 */
export const getUsersCount = async (): Promise<number> => {
  try {
    const response = await axios.get(
      `${process.env.VITE_API_URL}/users/count`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch users count');
    }

    return response.data.count;
  } catch (error) {
    console.error('Error fetching users count:', error);
    throw new Error('Failed to fetch users count');
  }
};

/**
 * Recherche des utilisateurs par terme
 */
export const searchUsers = async (searchTerm: string): Promise<UserFromDB[]> => {
  try {
    const response = await getAllUsers(1, 50, searchTerm);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw new Error('Failed to search users');
  }
};

// Export des nouvelles interfaces pour utilisation dans d'autres fichiers
export type { PaginatedUsersResponse, AdminCreateUserData, AdminUpdateUserData };
