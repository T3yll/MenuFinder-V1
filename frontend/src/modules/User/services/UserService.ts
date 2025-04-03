import { CONTENT_JSON } from '@/common/constants/API/APIContentType';
import apiClient from '@/common/service/apiConfig';

const moduleUrl = '/users';

const UserService = {
  getUsers: async (page?: number, offset?: number, search?: string) => {
    try {
      const response = await apiClient(CONTENT_JSON).get(moduleUrl, {
        params: { page, offset, search },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting infos:', error);
      throw error;
    }
  },
  changeCurrentTeam: async (id: number, teamId: number) => {
    try {
      const response = await apiClient(CONTENT_JSON).put(
        `${moduleUrl}/${id}/team/${teamId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error changing current team :', error);
      throw error;
    }
  },
  getUserById: async (id: string) => {
    try {
      const response = await apiClient(CONTENT_JSON).get(`${moduleUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  },
  deleteUser: async (id: string): Promise<void> => {
    try {
      await apiClient(CONTENT_JSON).delete(`${moduleUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default UserService;
