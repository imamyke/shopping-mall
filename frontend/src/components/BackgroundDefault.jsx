import styled from 'styled-components'
import { useNavigate,Link } from 'react-router-dom'
import { FileSearchOutlined, UserOutlined, ClusterOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const BackgroundDefault = ({ children, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate()

  const menuItems = [
    {
      key: '/admin/userlist',
      icon: <UserOutlined />,
      label: '用戶管理',
      onClick: (item) => navigate(item.key)
    },
    {
      key: '/admin/productlist',
      icon: <ClusterOutlined />,
      label: '产品管理',
      onClick: (item) => navigate(item.key)
    },
    {
      key: '/admin/orderlist',
      icon: <FileSearchOutlined />,
      label: '订单管理',
      onClick: (item) => navigate(item.key)
    },
  ]
  return (
    <Layout hasSider>
      <StyledHeader>
        <Header className='header' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: '#fff', fontSize: '30px' }}>商城後台管理</h1>
          <Link to="/" style={{ color: '#fff' }}>回到前台</Link>
        </Header>
      </StyledHeader>
      <Sider
        style={{ marginTop: '70px', height: '100vh' }}
        className='sider'
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
        />
      </Sider>
        <Layout>
          <Content style={{ margin: '90px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <h1 style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold' }}>{title}</h1>
            { children }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    </Layout>
  )
}

export default BackgroundDefault

const StyledHeader = styled.div`
  .header {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0; 
    width: 100%;
    z-index: 1000;
  }
  .ant-layout-header {
    height: 70px;
  }

`