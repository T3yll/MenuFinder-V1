import axios, { AxiosResponse } from "axios";
import { User } from "../types/User";


export interface UserRegister {
  prenom: string;
  nom: string;
  email: string;
  password: string;
  username?: string; // Optional - backend will generate if not provided
  bAdmin?: boolean; // Optional
  image_file_id?: number; // Optional
}

export const registerUser = async (user: UserRegister) => {
    console.log('registerUser');

    const response: AxiosResponse<User> = await axios.post(`${process.env.VITE_API_URL}/users`, user);

    if (response.status !== 201) {
        throw new Error('Failed to register user');
    }

    console.log('registerUser ok');
    return response.data;
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

    return await res.json();
}

