

import axios from 'axios';
import { CreateReportDto } from '../types/Report';
import { Report } from '../types/Report';

const API_URL = process.env.VITE_API_URL+'/report';
// Service pour les rapports
export const ReportService = {
    // Créer un nouveau rapport
    async create(reportData: CreateReportDto): Promise<any> {
        try {
        const response = await axios.post(API_URL, reportData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }
        );
        return response.data;
        } catch (error) {
        console.error('Erreur lors de la création du rapport:', error);
        throw error;
        }
    },
    
    // Récupérer tous les rapports
    async findAll(): Promise<Report[]> {
        try {
        const response = await axios.get(API_URL);
        return response.data;
        } catch (error) {
        console.error('Erreur lors de la récupération des rapports:', error);
        throw error;
        }
    },
    
    // Récupérer un rapport par son ID
    async findOne(id: number): Promise<any> {
        try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
        } catch (error) {
        console.error(`Erreur lors de la récupération du rapport ${id}:`, error);
        throw error;
        }
    },
    
    // Supprimer un rapport
    async remove(id: number): Promise<void> {
        try {
        await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
        console.error(`Erreur lors de la suppression du rapport ${id}:`, error);
        throw error;
        }
    },
    
    // Résoudre un rapport
    async resolve(id: number): Promise<any> {
        try {
        const response = await axios.patch(`${API_URL}/${id}/resolve`);
        return response.data;
        } catch (error) {
        console.error(`Erreur lors de la résolution du rapport ${id}:`, error);
        throw error;
        }
    }
    };

