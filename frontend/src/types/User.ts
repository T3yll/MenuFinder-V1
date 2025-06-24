export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    agreeTerms: boolean;
    image_file_id?: string;
    image_path?: string;
}


export interface UserFromDB {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    bAdmin: boolean;
    image_file_id?: number;
    image_path?: string;
    createdAt: Date;
    updatedAt: Date;
}
