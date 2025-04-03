import { IInfo } from '@/modules/Info/models/IInfo';
import apiClient from '@/common/service/apiConfig';
import { CONTENT_JSON } from '@/common/constants/API/APIContentType';

const moduleUrl = '/infos';

const InfoService = {
  createInfo: async (infoData: IInfo): Promise<IInfo> => {
    try {
      const response = await apiClient(CONTENT_JSON).post<IInfo>(
        moduleUrl,
        infoData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating info:', error);
      throw error;
    }
  },
  getInfos: async (query: { page: number; offset: number; teamId?: number; search?: string }) => {
    try {
      const response = await apiClient(CONTENT_JSON).get(moduleUrl, {
        params: query,
      });
      return response.data;
    } catch (error) {
      console.error('Error getting infos:', error);
      throw error;
    }
  },
  getInfoById: async (id: string): Promise<IInfo> => {
    try {
      const response = await apiClient(CONTENT_JSON).get<IInfo>(`${moduleUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting info by ID:', error);
      throw error;
    }
  },
  updateInfo: async (id: number, infoData: IInfo) => {
    try {
        const res = await apiClient(CONTENT_JSON).patch(`${moduleUrl}/${id}`, infoData);
        return res.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'info :", error);
        throw error;
    }
  },
  deleteInfo: async (id: number): Promise<void> => {
    try {
      await apiClient(CONTENT_JSON).delete(`${moduleUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting info:', error);
      throw error;
    }
  },
};

export default InfoService;
