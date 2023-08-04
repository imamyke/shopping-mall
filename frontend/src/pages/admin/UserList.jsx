import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUser, deleteUser } from '../../store/actions'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Loader, BackgroundDefault, Meta } from '../../components'

const UserList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
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
      title: '管理员权限',
      dataIndex: 'admin',
      key: 'admin'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
      <>
        <StyledButton onClick={() => handleDelete(record.userID)}>删除</StyledButton> 
        <StyledButton onClick={() => navigate(`/admin/users/${record.userID}/edit`)}>修改</StyledButton> 
      </>)
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
  
  return (
    <>
      <Meta title="用户管理" />
      <BackgroundDefault title="用戶列表">
        {loading ? <Loader /> : (
          <Table 
          columns={columns} 
          dataSource={data} 
          onRow={(e) => {
            return {
              onClick: (e) => { console.log(e.target) }
            }
          }}
        />
        )}
      </BackgroundDefault>
    </>
    
  )
}

export default UserList

const StyledButton = styled.button`
  border: 0;
  padding: 4px 8px;
  background: #eee;
  cursor: pointer;
  margin-right: 8px;
  background: #184670;
  color: #fff;
  transition: all 0.3s;
  &:hover {
    background: #1d568c;
  }
`