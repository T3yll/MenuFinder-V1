import { useState, useEffect } from 'react';

import { getNumberOfUsers,
  getNumberOfRestaurants,
  getNumberOfReviews,
  getNumberOfActiveUsers,
  getNumberOfReports } from '../services/admin.service';

interface AdminStats {
  users: number | null;
  restaurants: number | null;
    reviews: number | null;
    activeUsers: number | null;
    reports: number | null;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    users: null,
    restaurants: null,
    reviews: null,
    activeUsers: null,
    reports: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await getNumberOfUsers();
        const restaurants = await getNumberOfRestaurants();
        const reviews = await getNumberOfReviews();
        const activeUsers = await getNumberOfActiveUsers();
        const reports = await getNumberOfReports();

        setStats({
          users,
          restaurants,
          activeUsers,
          reports,
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
