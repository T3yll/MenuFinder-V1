import { IFeature } from '@/modules/Feature/models/IFeature';
import apiClient from '@/common/service/apiConfig';
import { CONTENT_JSON } from '@/common/constants/API/APIContentType';

const moduleUrl = '/features';

const FeatureService = {
  createFeature: async (featureData: IFeature): Promise<IFeature> => {
    try {
      const response = await apiClient(CONTENT_JSON).post<IFeature>(
        moduleUrl,
        featureData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating feature :', error);
      throw error;
    }
  },
  getFeatures: async (page?: number, offset?: number, search?: string) => {
    try {
      const response = await apiClient(CONTENT_JSON).get(moduleUrl, {
        params: { page, offset, search },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting features :', error);
      throw error;
    }
  },
  deleteFeature: async (id: number): Promise<void> => {
    try {
      await apiClient(CONTENT_JSON).delete(`${moduleUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting feature:', error);
      throw error;
    }
  },
};

export default FeatureService;
