export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    agreeTerms: boolean;
    image_file_id?: string;
    image_path?: string;
}
