import { ReportService } from "../services/report.service";
import { RestaurantService } from "../services/RestaurantService";
import { getUserById } from "../services/user.service";

import { useState, useEffect } from "react";
import { FullReport, Report } from "../types/Report";

export const useReports = () => {
    const [reports, setReports] = useState<FullReport[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
            if (!userId) return;

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
            }
        };

        fetchReports();
    }, []); 

    return {
        reports,
        setReports,
    };
};
