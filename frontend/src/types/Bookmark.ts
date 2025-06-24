export interface Bookmark {
    id: number;
    userId: number;
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
    }

export interface BookmarkData {
    user_id: number;
    restaurant_id: number;
}

