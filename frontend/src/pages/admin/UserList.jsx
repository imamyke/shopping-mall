import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUser, deleteUser } from '../../store/actions'
import { FileSearchOutlined, UserOutlined, ClusterOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Table } from 'antd';
import { Loader } from '../../components'
const { Header, Content, Footer, Sider } = Layout;

const UserList = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDelete = useSelector((state) => state.userDelete)
  const { success } = userDelete;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  }


  useEffect(() => {
    if (userInfo && userInfo.isAdmin)  {
      dispatch(listUser())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, success])

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
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userID',
      key: 'userID'
    },
    {
      title: '用户姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '帐号名',
      dataIndex: 'accountName',
      key: 'accountName'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '管理員權限',
      dataIndex: 'admin',
      key: 'admin'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (<>
        <button onClick={() => handleDelete(record.userID)}>刪除</button> <button>編輯</button> </>)
    }
  ];
  
  const data = users?.map(user => (
    {
      key: user._id,
      userID: user._id,
      name: user.name,
      accountName: user.accountName,
      phone: user.phone,
      admin: user.isAdmin ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />
    }
  ))
  const onSelectChange = (newSelectedRowKeys, record) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    console.log('record:', record);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

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
      { loading ? <Loader /> : (
        <Layout>
          <Content style={{ margin: '90px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <h1 style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold' }}>用戶列表</h1>
            <Table 
              rowSelection={rowSelection} 
              columns={columns} 
              dataSource={data} 
              onRow={(e) => {
                return {
                  onClick: (e) => { console.log(e.target) }
                }
              }}
            />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      ) }
    </Layout>
  )
}

export default UserList

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