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
      title: '用戶名稱',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '订单金额',
      dataIndex: 'totalPrice',
      key: 'totalPrice'
    },
    {
      title: '下单时间',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: '运送状况',
      dataIndex: 'isDelivered',
      key: 'isDelivered'
    },
    {
      title: '是否付款',
      dataIndex: 'isPaid',
      key: 'isPaid'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
      <>
        <button onClick={() => handleDelete(record.orderID)}>删除</button> 
        <button onClick={() => navigate(`/admin/orders/${record.orderID}/edit`)}>修改</button> 
        <button onClick={() => navigate(`/order/${record.orderID}`)}>訂單詳情</button> 
      </>)
    }
  ];
  
  const data = orders?.map(order => (
    {
      key: order._id,
      orderID: order._id,
      userName: order.user && order.user.name,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt.substring(0, 10),
      isDelivered: order.isDelivered ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />,
      isPaid: order.isPaid ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />
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