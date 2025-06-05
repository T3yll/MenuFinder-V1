import axios from 'axios';
import exp from 'constants';

const API_URL = process.env.VITE_API_URL+"/";

export const getNumberOfRestaurants = async (): Promise<number> => {
    const response = await axios.get<{ count: number }>(`${API_URL}restaurants/count`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.count;
};

export const getNumberOfUsers = async (): Promise<number> => {
    const response = await axios.get<{ count: number }>(`${API_URL}users/count`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    );
    return response.data.count;
};

export const getNumberOfReviews = async (): Promise<number> => {
    const response = await axios.get<{ count: number }>(`${API_URL}reviews/count`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.count;
};

