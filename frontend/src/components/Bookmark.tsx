import React, { MouseEventHandler, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import { Button } from 'antd';
import { BookmarkService } from '../services/bookmarks.service';
import { useBookmarked } from '../hooks/useBookmarked';
import { number } from 'react-admin';
import { useAppDispatch } from '../hooks/storeToast';
import { showToast } from '../store/slice/toastSlice';

interface BookmarkProps {
    onToggle?: (bookmarked: boolean) => void;
    size?: number;
    text?: string;
    restaurantId: string | number;
    disabled?: boolean;
}

const Bookmark: React.FC<BookmarkProps> = ({ 
    onToggle,
    size = 24,
    disabled = false,
    text,
    restaurantId
}) => {

    const dispatch = useAppDispatch();
    
    const [bookmarked, setBookmarked] = useBookmarked(restaurantId);

    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (localStorage.getItem('user') === null) {
            disabled = true;
        }
        if (disabled) {
            dispatch(showToast({
                message: "Vous devez être connecté pour ajouter un restaurant à vos favoris.",
                severity: 'error'
            }));
            return; // Ignore click if disabled
        }
        const newState = !bookmarked;
        setBookmarked(newState);
        const userid = JSON.parse(localStorage.getItem('user') || '{}').id;
        if (newState) {
            // Add bookmark
            const resid : number = +restaurantId;
            BookmarkService.addBookmark(userid, resid) // Replace with actual userId and restaurantId
        } else {
            // Remove bookmark
            BookmarkService.removeBookmark(userid, restaurantId) // Replace with actual userId and restaurantId
        }


        onToggle?.(newState);
    };

return (
    <button
        disabled={disabled}
        onClick={handleClick}  
        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        className="bookmark-button action-button"
    >
        {bookmarked ? (
            <FaBookmark size={size} color={disabled ? "#bdbdbd" : "#ff9800"} />
        ) : (
            <FaRegBookmark size={size} color={disabled ? "#bdbdbd" : "black"} />
        )}
        {text}
    </button>
);
        };


export default Bookmark;