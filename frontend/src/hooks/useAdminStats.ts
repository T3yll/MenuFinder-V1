import { useState, useEffect } from 'react';

import { getNumberOfUsers,
  getNumberOfRestaurants,
  getNumberOfReviews } from '../services/admin.service';

interface AdminStats {
  users: number | null;
  restaurants: number | null;

    reviews: number | null;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    users: null,
    restaurants: null,
    reviews: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await getNumberOfUsers();
        const restaurants = await getNumberOfRestaurants();
        const reviews = await getNumberOfReviews();

        setStats({
          users,
          restaurants,
          reviews,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };

    fetchStats();
  }, []);

  return { stats };
};
