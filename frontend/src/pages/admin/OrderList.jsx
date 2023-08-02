import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { orderList } from '../../store/actions'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Loader, BackgroundDefault } from '../../components'

const OrderList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const listOrder = useSelector((state) => state.orderList)
  const { loading, error, orders } = listOrder
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  // const userDelete = useSelector((state) => state.userDelete)
  // const { success } = userDelete;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      // dispatch(deleteUser(id));
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin)  {
      dispatch(orderList())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'orderID',
      key: 'orderID'
    },
    {
      title: '订单名称',
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
        <button onClick={() => handleDelete(record.orderID)}>删除</button> 
        <button onClick={() => navigate(`/admin/orders/${record.orderID}/edit`)}>修改</button> 
      </>)
    }
  ];
  
  const data = orders?.map(order => (
    {
      key: order._id,
      orderID: order._id,
      name: order.name,
      accountName: order.accountName,
      phone: order.phone,
      admin: order.isAdmin ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />
    }
  ))
  
  return (
    <BackgroundDefault title="订单列表">
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
    
  )
}

export default OrderList