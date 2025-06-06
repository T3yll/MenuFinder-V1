import { BookmarkService } from "../services/bookmarks.service";

import { useState, useEffect } from "react";
import { Bookmark } from "../types/Bookmark";
import exp from "constants";


export const useBookmarked = (restaurantId: string | number) => {
    const [bookmarked, setBookmarked] = useState<boolean>(false);
    
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        if (userId) {
        BookmarkService.getBookmarks(restaurantId,userId)
            .then((bookmarks: Bookmark[]) => {
            const isBookmarked = bookmarks.length > 0;
            setBookmarked(isBookmarked);
            })
            .catch((error) => {
            console.error("Error fetching bookmarks:", error);
            });
        }
    }, [restaurantId]);
    
    return [bookmarked, setBookmarked] as const;
    }
