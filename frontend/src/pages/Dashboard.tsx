import React, { useState } from 'react';
import { Card, Statistic, Row, Col, Tabs, TabsProps } from 'antd';
import { Line } from 'react-chartjs-2';
import { 
  DashboardOutlined, 
  UserOutlined, 
  FileTextOutlined,
  ShopOutlined 
} from '@ant-design/icons';
import { useAdminStats } from '../hooks/useAdminStats';
import ReportTable from '../components/reports/ReportTable';
import UserManagement from '../components/UserManagement';
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
  const { stats } = useAdminStats();
  const [activeTab, setActiveTab] = useState('overview');

  const list = [
    { title: 'Total Users', value: stats.users ?? 0, icon: <UserOutlined /> },
    { title: 'Total Restaurants', value: stats.restaurants ?? 0, icon: <ShopOutlined /> },
    { title: 'Total Reviews', value: stats.reviews ?? 0, icon: <FileTextOutlined /> },
  ];

  // Composant Overview (tableau de bord principal)
  const OverviewTab = () => (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {list.map((stat) => (
          <Col xs={24} sm={12} md={6} key={stat.title}>
            <Card>
              <Statistic 
                title={stat.title} 
                value={stat.value}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="Évolution des données">
            <Line data={lineData} options={lineOptions} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Statistiques rapides">
            <div style={{ padding: '20px 0' }}>
              <Statistic
                title="Nouveaux utilisateurs ce mois"
                value={45}
                suffix="/ 100"
                valueStyle={{ color: '#3f8600' }}
              />
              <Statistic
                title="Restaurants actifs"
                value={(stats.restaurants ?? 0) - 5}
                suffix={`/ ${stats.restaurants ?? 0}`}
                valueStyle={{ color: '#1890ff' }}
                style={{ marginTop: 16 }}
              />
              <Statistic
                title="Taux de croissance"
                value={9.8}
                precision={1}
                suffix="%"
                valueStyle={{ color: '#cf1322' }}
                style={{ marginTop: 16 }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <ReportTable />
    </div>
  );

  // Configuration des onglets
  const tabItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: (
        <span>
          <DashboardOutlined />
          Vue d'ensemble
        </span>
      ),
      children: <OverviewTab />,
    },
    {
      key: 'users',
      label: (
        <span>
          <UserOutlined />
          Gestion des Utilisateurs
        </span>
      ),
      children: <UserManagement />,
    },
    {
      key: 'reports',
      label: (
        <span>
          <FileTextOutlined />
          Rapports
        </span>
      ),
      children: (
        <Card title="Rapports détaillés">
          <ReportTable />
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: '#666', marginTop: 8 }}>
          Gérez vos utilisateurs, surveillez les statistiques et consultez les rapports
        </p>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '0 24px',
        }}
      />
    </div>
  );
};

export default Dashboard;