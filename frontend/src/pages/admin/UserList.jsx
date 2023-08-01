import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUser, deleteUser } from '../../store/actions'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Loader, BackgroundDefault } from '../../components'

const UserList = () => {

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
        <button onClick={() => handleDelete(record.userID)}>删除</button> 
        <button onClick={() => navigate(`/admin/useredit/${record.userID}`)}>修改</button> 
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
    <BackgroundDefault title="用戶列表">
      {loading ? <Loader /> : (
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
      )}
    </BackgroundDefault>
    
  )
}

export default UserList