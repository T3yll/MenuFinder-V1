// Types basés sur vos entités backend NestJS

export interface Restaurant {
  restaurant_id: number;
  adress_id: number;
  owner_id: number;
  name: string;
  type: string;
  image_file_id: number;
  adress?: Adress;
  owner?: User;
  image?: FileEntity;
  rewiews?: Review[];
  menus?: Menu[];
  tagRestaurants?: RestaurantTag[];
  bookmarks?: Bookmark[];
}

export interface Adress {
  adress_id: number;
  street: string;
  city: string;
  state?: string;
  zip_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  restaurants?: Restaurant[];
}

export interface FileEntity {
  file_id: number;
  name: string;
  path: string;
  type: string;
  users?: User[];
  restaurants?: Restaurant[];
  meals?: any[];
}

export interface Review {
  review_id: number;
  restaurant_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: Date;
  restaurant?: Restaurant;
  user?: User;
}

export interface Menu {
  menu_id: number;
  restaurant_id: number;
  name: string;
  description: string;
  restaurant?: Restaurant;
  items?: MenuItem[];
}

export interface MenuItem {
  item_id: number;
  menu_id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_file_id?: number;
  menu?: Menu;
  image?: FileEntity;
}

export interface RestaurantTag {
  restaurant_tag_id: number;
  restaurant_id: number;
  tag_id: number;
  restaurant?: Restaurant;
  tag?: Tag;
}

export interface Tag {
  tag_id: number;
  name: string;
  tagRestaurants?: RestaurantTag[];
}

export interface Bookmark {
  bookmark_id: number;
  user_id: number;
  restaurant_id: number;
  created_at: Date;
  user?: User;
  restaurant?: Restaurant;
}