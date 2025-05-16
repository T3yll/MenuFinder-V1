import axios, { AxiosResponse } from "axios";
import { User } from "../types/User";


export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerUser = async (user: UserRegister) => {
    console.log('registerUser');

    const response: AxiosResponse<User> = await axios.post(`${process.env.VITE_API_URL}/register`, user);

    if (response.status !== 200) {
        throw new Error('Failed to register user');
    }

    console.log('registerUser ok');
    return response.data;
};

export async function getUserProfile() {
    const res = await fetch(`${process.env.API_URI_BACKEND}/users/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!res.ok) {
        throw new Error('Erreur lors du chargement du profil');
    }

    return await res.json();
}

