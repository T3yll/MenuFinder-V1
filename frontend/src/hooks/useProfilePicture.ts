import { useState, useEffect } from 'react';

import { getNumberOfUsers,
  getNumberOfRestaurants,
  getNumberOfReviews } from '../services/admin.service';
import { getPath } from '../services/file.service';


export const useProfilePicture = () => {
  const [picture, setPicture] = useState<string>('public/default.png');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const path = await getPath(user.image_file_id);
        setPicture(path);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };

    fetchStats();
  }, []);

  return { picture,setPicture };
};
