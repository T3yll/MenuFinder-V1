import exp from "constants";


export interface CreateReportDto {
    userId: number; // ID de l'utilisateur qui crée le rapport
    restaurantId: number ; // ID du restaurant concerné par le rapport
    motif: string; // Motif du rapport
    description: string; // Description détaillée du rapport
    }

    export interface Report extends CreateReportDto {
    id: number; // ID du rapport
    createdAt: Date; // Date de création du rapport
    updatedAt: Date; // Date de mise à jour du rapport
    }

export interface FullReport  extends Report {
    id: number; // ID du rapport
    createdAt: Date; // Date de création du rapport
    updatedAt: Date; // Date de mise à jour du rapport
    user: {
        username: string; // Nom de l'utilisateur
        email: string; // Email de l'utilisateur
    };
    restaurant: {
        name: string; // Nom du restaurant
    };
}

