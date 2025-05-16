import axios from 'axios';

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
    token: string;
    user: {
        id: string;
        email: string;
        // add other user fields as needed
    };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}login`, credentials); 
    return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}register`, credentials); 
    return response.data;
}