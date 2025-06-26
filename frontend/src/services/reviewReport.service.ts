import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

export interface ReviewReport {
  report_id: number;
  review_id: number;
  reporter_user_id: number;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reported_at: string;
  updated_at: string;
  review?: {
    review_id: number;
    text: string;
    rating: number;
    user?: {
      username: string;
      nom: string;
      prenom: string;
    };
  };
  reporter?: {
    username: string;
    nom: string;
    prenom: string;
  };
}

export interface CreateReviewReportDto {
  review_id: number;
  status?: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
}

// Signaler un avis
export const reportReview = async (data: CreateReviewReportDto): Promise<ReviewReport> => {
  const response = await axios.post(`${API_URL}/review-reports`, data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Récupérer tous les signalements (admin seulement)
export const getAllReports = async (): Promise<ReviewReport[]> => {
  const response = await axios.get(`${API_URL}/review-reports`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Récupérer les signalements d'un avis spécifique (admin seulement)
export const getReportsByReviewId = async (reviewId: number): Promise<ReviewReport[]> => {
  const response = await axios.get(`${API_URL}/review-reports/review/${reviewId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Mettre à jour le statut d'un signalement (admin seulement)
export const updateReportStatus = async (
  reportId: number, 
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
): Promise<ReviewReport> => {
  const response = await axios.patch(`${API_URL}/review-reports/${reportId}/status`, 
    { status }, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  return response.data;
}; 