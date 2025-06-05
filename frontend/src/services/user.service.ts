import axios, { AxiosResponse } from "axios";
import { User } from "../types/User";
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
    data.image_path = await getPath(JSON.parse(localStorage.getItem("user") || '').image_file_id) || 'public/default.png';
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

