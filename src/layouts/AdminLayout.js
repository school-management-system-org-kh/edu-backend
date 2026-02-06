import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

function AdminLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            <Link to="/admin/subjects">Subjects</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="/admin/materials">Learning Materials</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;