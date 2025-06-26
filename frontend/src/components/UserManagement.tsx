import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Space,
  Avatar,
  Switch,
  Upload,
  Card,
  Row,
  Col,
  Pagination,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { User, UserFromDB } from '../types/User';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,  
  getUserById,
  PaginatedUsersResponse,
  AdminCreateUserData,
  AdminUpdateUserData,
} from '../services/user.service';

interface UserManagementProps {}

// Interface pour le formulaire (compatible avec AdminCreateUserData/AdminUpdateUserData)
interface UserFormData {
  prenom: string;
  nom: string;
  email: string;
  password?: string;
  username?: string;
  bAdmin?: boolean;
  image_file_id?: number;
}

const UserManagement: React.FC<UserManagementProps> = () => {
  const [users, setUsers] = useState<UserFromDB[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserFromDB | null>(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Charger les utilisateurs
  const fetchUsers = async (page = 1, size = 10, search = '') => {
    setLoading(true);
    try {
      const response: PaginatedUsersResponse = await getAllUsers(page, size, search);
      setUsers(response.data);
      setTotal(response.total);
    } catch (error) {
      message.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, pageSize, searchText);
  }, [currentPage, pageSize, searchText]);

  // Colonnes du tableau
  const columns: ColumnsType<UserFromDB> = [
    {
      title: 'Avatar',
      dataIndex: 'image_path',
      key: 'avatar',
      width: 80,
      render: (imagePath) => (
        <Avatar
          size={40}
          src={imagePath}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      sorter: true,
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
      sorter: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Admin',
      dataIndex: 'bAdmin',
      key: 'bAdmin',
      render: (isAdmin) => (
        <Switch checked={isAdmin} disabled />
      ),
    },
    {
      title: 'Date de création',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Modifier
          </Button>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Supprimer
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Ouvrir le modal pour créer un nouvel utilisateur
  const handleCreate = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Ouvrir le modal pour éditer un utilisateur
  const handleEdit = async (user: UserFromDB) => {
    try {
      const fullUser = await getUserById(user.id);
      setEditingUser(fullUser);
      form.setFieldsValue({
        prenom: fullUser.firstName,
        nom: fullUser.lastName,
        email: fullUser.email,
        username: fullUser.username,
        bAdmin: fullUser.bAdmin,
      });
      setModalVisible(true);
    } catch (error) {
      message.error('Erreur lors du chargement des données utilisateur');
    }
  };

  // Supprimer un utilisateur
  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      message.success('Utilisateur supprimé avec succès');
      fetchUsers(currentPage, pageSize, searchText);
    } catch (error) {
      message.error('Erreur lors de la suppression');
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (values: UserFormData) => {
    try {
      if (editingUser) {
        // Mise à jour - utiliser AdminUpdateUserData
        const updateData: AdminUpdateUserData = {
          prenom: values.prenom,
          nom: values.nom,
          email: values.email,
          username: values.username,
          bAdmin: values.bAdmin,
          image_file_id: values.image_file_id,
        };
        // Ajouter le password seulement s'il est fourni
        if (values.password) {
          updateData.password = values.password;
        }
        await updateUser(editingUser.id, updateData);
        message.success('Utilisateur mis à jour avec succès');
      } else {
        // Création - utiliser AdminCreateUserData
        const createData: AdminCreateUserData = {
          prenom: values.prenom,
          nom: values.nom,
          email: values.email,
          password: values.password!, // Required for creation
          username: values.username,
          bAdmin: values.bAdmin,
          image_file_id: values.image_file_id,
        };
        await createUser(createData);
        message.success('Utilisateur créé avec succès');
      }
      setModalVisible(false);
      fetchUsers(currentPage, pageSize, searchText);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  // Gestion de la recherche
  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  // Gestion de la pagination
  const handlePaginationChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
  };

  return (
    <Card title="Gestion des Utilisateurs">
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={16}>
          <Input.Search
            placeholder="Rechercher un utilisateur..."
            allowClear
            onSearch={handleSearch}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            style={{ width: '100%' }}
          >
            Nouvel Utilisateur
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />

      <Row justify="end" style={{ marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} sur ${total} utilisateurs`
          }
          onChange={handlePaginationChange}
          onShowSizeChange={handlePaginationChange}
        />
      </Row>

      <Modal
        title={editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Prénom"
                name="prenom"
                rules={[
                  { required: true, message: 'Le prénom est requis' },
                  { min: 2, message: 'Le prénom doit contenir au moins 2 caractères' },
                ]}
              >
                <Input placeholder="Entrez le prénom" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Nom"
                name="nom"
                rules={[
                  { required: true, message: 'Le nom est requis' },
                  { min: 2, message: 'Le nom doit contenir au moins 2 caractères' },
                ]}
              >
                <Input placeholder="Entrez le nom" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'L\'email est requis' },
              { type: 'email', message: 'L\'email n\'est pas valide' },
            ]}
          >
            <Input placeholder="Entrez l'email" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              { min: 3, message: 'Le username doit contenir au moins 3 caractères' },
            ]}
          >
            <Input placeholder="Laissez vide pour générer automatiquement" />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[
                { required: true, message: 'Le mot de passe est requis' },
                { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' },
              ]}
            >
              <Input.Password placeholder="Entrez le mot de passe" />
            </Form.Item>
          )}

          <Form.Item
            name="bAdmin"
            valuePropName="checked"
          >
            <Switch checkedChildren="Admin" unCheckedChildren="Utilisateur" />
            <span style={{ marginLeft: 8 }}>Droits administrateur</span>
          </Form.Item>

          <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalVisible(false)}>
                Annuler
              </Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? 'Mettre à jour' : 'Créer'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserManagement;