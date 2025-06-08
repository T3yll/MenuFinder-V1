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


const lineData = {
labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
datasets: [
    {
        label: 'New Users',
        data: [120, 200, 150, 220, 300, 250],
        fill: false,
        borderColor: '#ff4d4f',
        tension: 0.1,
    },
    {
        label: 'New Restaurants',
        data: [120, 200, 150, 220, 300, 250],
        fill: false,
        borderColor: '#52c41a',
        tension: 0.1,
    },
    {
        label: 'New Reviews',
        data: [100, 180, 130, 210, 280, 240],
        fill: false,
        borderColor: '#1890ff',
        tension: 0.1,
    },
],

};

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
        { title: 'Total Restaurants', value: stats.restaurants ?? 0 },
        { title: 'Total Reviews', value: stats.reviews ?? 0 },
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