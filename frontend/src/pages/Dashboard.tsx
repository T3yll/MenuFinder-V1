import React, { useState } from 'react';
import { Card, Statistic, Row, Col, Tabs, TabsProps, Progress, Avatar, Typography, Space, Badge } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  FileTextOutlined,
  ShopOutlined,
  TrophyOutlined,
  RiseOutlined,
  CalendarOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useAdminStats } from '../hooks/useAdminStats';
import ReportTable from '../components/reports/ReportTable';
import UserManagement from '../components/UserManagement';
import { Line } from 'react-chartjs-2';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { stats } = useAdminStats();
  const [activeTab, setActiveTab] = useState('overview');

  // Données des statistiques réelles seulement
  const statisticsData = [
    { 
      title: 'Total Utilisateurs', 
      value: stats.users ?? 0, 
      icon: <UserOutlined />,
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    { 
      title: 'Total Restaurants', 
      value: stats.restaurants ?? 0, 
      icon: <ShopOutlined />,
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    { 
      title: 'Total Avis', 
      value: stats.reviews ?? 0, 
      icon: <StarOutlined />,
      bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  // Composant Overview (tableau de bord principal)
  const OverviewTab = () => (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {statisticsData.map((stat) => (
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

      <ReportTable />
    </div>
  );

  // Configuration des onglets
  const tabItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: (
        <Space style={{ padding: '8px 16px' }}>
          <DashboardOutlined style={{ fontSize: '16px' }} />
          <span style={{ fontWeight: 500 }}>Vue d'ensemble</span>
        </Space>
      ),
      children: <OverviewTab />,
    },
    {
      key: 'users',
      label: (
        <Space style={{ padding: '8px 16px' }}>
          <UserOutlined style={{ fontSize: '16px' }} />
          <span style={{ fontWeight: 500 }}>Gestion des Utilisateurs</span>
          <Badge count={stats.users ?? 0} style={{ backgroundColor: '#52c41a' }} />
        </Space>
      ),
      children: <UserManagement />,
    },
    {
      key: 'reports',
      label: (
        <Space style={{ padding: '8px 16px' }}>
          <FileTextOutlined style={{ fontSize: '16px' }} />
          <span style={{ fontWeight: 500 }}>Rapports</span>
        </Space>
      ),
      children: (
        <Card 
          title={
            <Space>
              <FileTextOutlined />
              <span>Rapports détaillés</span>
            </Space>
          }
          style={{ 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
          }}
          headStyle={{ 
            backgroundColor: '#fafafa',
            borderRadius: '12px 12px 0 0'
          }}
        >
          <ReportTable />
        </Card>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '24px', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ 
        marginBottom: 32,
        textAlign: 'center',
        padding: '32px 0'
      }}>
        <Title level={1} style={{ 
          margin: 0, 
          fontSize: '36px', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Admin Dashboard
        </Title>
        <Text style={{ 
          fontSize: '16px', 
          color: '#666', 
          marginTop: 8,
          display: 'block'
        }}>
          Gérez vos utilisateurs, surveillez les statistiques et consultez les rapports
        </Text>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '0 24px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
        tabBarStyle={{
          marginBottom: '24px',
          borderBottom: '2px solid #f0f0f0'
        }}
      />
    </div>
  );
};

export default Dashboard;