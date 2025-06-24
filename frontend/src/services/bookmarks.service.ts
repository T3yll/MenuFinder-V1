import axios from 'axios';

const API_URL = process.env.VITE_API_URL+ '/bookmarks';

import { BookmarkData, Bookmark } from '../types/Bookmark';
import { strict } from 'assert';

export const BookmarkService = {
    async getBookmarks(restaurantId: number | string, userId: number | string,): Promise<Bookmark[]> {
        const response = await axios.get(`${API_URL}/${restaurantId}/${userId}`, {
headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        }


        );
        return response.data;
    },
        async addBookmark(userId: number | string, restaurantId: number): Promise<Bookmark> {
            const response = await axios.post(`${API_URL}`, { restaurant_id:restaurantId, user_id:userId ,} as BookmarkData,{headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }});
                return response.data;
        },
        async removeBookmark(userId: number | string, restaurantId: number | string): Promise<void> {
                await axios.delete(`${API_URL}/${restaurantId}/${userId}`,{headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }});
        },
};
