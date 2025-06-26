import { ReportService } from "../services/report.service";
import { RestaurantService } from "../services/RestaurantService";
import { getUserById } from "../services/user.service";

import { useState, useEffect, useCallback } from "react";
import { FullReport } from "../types/Report";

export const useReports = () => {
    const [reports, setReports] = useState<FullReport[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchReports = useCallback(async () => {
        setLoading(true);
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            const reports = await ReportService.findAll();

            const fullReports = await Promise.all(
                reports.map(async (report) => {
                    const user = await getUserById(report.userId);
                    const restaurant = await RestaurantService.findOne(report.restaurantId);

                    return {
                        ...report,
                        user: {
                            username: user.username,
                            email: user.email,
                        },
                        restaurant: {
                            name: restaurant.name,
                        },
                    } as FullReport;
                })
            );

            setReports(fullReports);
        } catch (error) {
            console.error("Error fetching reports:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]); 

    return {
        reports,
        setReports,
        loading,
        refetch: fetchReports,
    };
};
