import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { Line } from 'react-chartjs-2';
import { useAdminStats } from '../hooks/useAdminStats';
import ReportTable from '../components/reports/ReportTable';
import {

Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
} from 'chart.js';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

const lineOptions = {
responsive: true,
plugins: {
    legend: { display: true, position: 'top' as const },
},
};

const Dashboard: React.FC = () => {
    const {stats} = useAdminStats();
    const list = [
        { title: 'Total Users', value: stats.users ?? 0 },
        { title: 'Total active users', value: stats.activeUsers ?? 0 },
        { title: 'Total Restaurants', value: stats.restaurants ?? 0 },
        { title: 'Total Reviews', value: stats.reviews ?? 0 },
        { title: 'Total Reports', value: stats.reports ?? 0 },

    ];

    return (
        <div style={{ padding: 24 }}>
            <h1>Admin Dashboard</h1>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                {list.map((stat) => (
                    <Col xs={24} sm={12} md={6} key={stat.title}>
                        <Card>
                            <Statistic title={stat.title} value={stat.value} />
                        </Card>
                    </Col>
                ))}
            </Row>
            <ReportTable />
        </div>
    );
};

export default Dashboard;