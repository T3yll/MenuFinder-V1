import { ITeam } from '@/modules/Team/models/ITeam';
import apiClient from '@/common/service/apiConfig';
import { CONTENT_JSON } from '@/common/constants/API/APIContentType';

const moduleUrl = '/teams';

const TeamService = {
  createTeam: async (teamData: ITeam): Promise<ITeam> => {
    try {
      const response = await apiClient(CONTENT_JSON).post<ITeam>(
        moduleUrl,
        teamData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création / récupération de la team :', error);
      throw error;
    }
  },
  getTeams: async (query: { page?: number, offset?: number, search?: string, userId?: number }) => {
    try {
      const response = await apiClient(CONTENT_JSON).get(moduleUrl, {
        params: query,
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupration des teams :', error);
      throw error;
    }
  },
  getTeamById: async (id: string): Promise<ITeam> => {
    try {
      const response = await apiClient(CONTENT_JSON).get<ITeam>(`${moduleUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting team by ID:', error);
      throw error;
    }
  },
  updateTeam: async (id: number, teamData: ITeam) => {
    try {
        const res = await apiClient(CONTENT_JSON).patch(`${moduleUrl}/${id}`, teamData);
        return res.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'équipe :", error);
        throw error;
    }
  },
  deleteTeam: async (id: number): Promise<void> => {
    try {
      await apiClient(CONTENT_JSON).delete(`${moduleUrl}/${id}`);
    } catch (error) {
      console.error('Erreur lors de la suppression de la team : ', error);
      throw error;
    }
  },
};

export default TeamService;
