import axios from 'axios';
import exp from 'constants';


const API_URL = process.env.VITE_API_URL + '/auth/';


export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}



export interface AuthResponse {
    access_token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}login`, credentials); 
    return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}register`, credentials); 
    return response.data;
}

export const isAdmin = async (): Promise<boolean> => {
    const response = await axios.get(`${API_URL}isAdmin`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    );
    console.log('isAdmin response', response);
    if (response.data.bAdmin !== true) {
       return false;
    }
    return true;
}

export const logout = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
}