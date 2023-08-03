import { Meta, OrderTemplate, Loader } from '../components'
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { myOrderListAction } from '../store/actions'
import { Alert } from 'antd'

const MyOrders = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const orderMyList = useSelector(state => state.orderMyList)
  const { loading, orders, error } = orderMyList

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      dispatch(myOrderListAction())
    }
  }, [navigate, userInfo, dispatch])

  let orderItems = []
  if (orders) {
    const orderDetail = orders.map(order => {
      return order
    })
    const orderItemsInList = orderDetail.map(item => {
      return [
        item.orderItems, 
        item._id, 
        item.isDelivered, 
        item.isPaid, 
        item.createdAt.substring(0, 10), 
        item.paymentMethod, 
        item.shippingDetail.name
      ]
    })
    for (let item of orderItemsInList) {
      orderItems.push(item)
    }
  }
  console.log(orderItems);
  return (
    <>
      <Meta title="我的订单" />
      <OrderTemplate title="我的订单">
      { loading ? <Loader /> : (
        <>
          {orderItems.length === 0 ? (
            <Alert message="目前没有订单" type="info" />
          ) : (
            <StyledOrder>
              <ul className='order-title'>
                <li className='order-title-item' style={{ width: '60%' }}>订单详情</li>
                <li className='order-title-item' style={{ width: '10%' }}></li>
                <li className='order-title-item' style={{ width: '10%' }}>收货人</li>
                <li className='order-title-item' style={{ width: '10%' }}>金额</li>
                <li className='order-title-item' style={{ width: '10%' }}>运送状态</li>
              </ul>
              {orderItems.map((order) => (
                order[0].map((item, idx) => (
                  <ul className='order-content' key={idx}>
                    <li className='order-content-first'>
                      <ul className='order-content-detail'>
                        <li className='order-item' style={{ color: '#aaa', marginRight: 30 }}>{order[4]}</li>
                        <li className='order-item' style={{ fontSize: 12 }}>
                          订单号： <Link to={`/order/${order[1]}?redirect=myorders`}>{order[1]}</Link>
                        </li>
                      </ul>
                    </li>
                    <li className='order-content-second'>
                      <ul className='order-content-detail'>
                        <li style={{ width: '60%' }}>
                          <Link to={`/product/${item.product}`} style={{ color: '#000' }}>
                            <StyledCart>
                              <div className='product-container'>
                                <StyledImage image={item.image}>
                                  <div className="image-container">
                                    <div className="image"></div>
                                  </div>
                                </StyledImage>
                                <div className='product-info' style={{ display: 'flex' }}>
                                  <p className="title">{item.name}</p>
                                </div>
                              </div>
                            </StyledCart>
                          </Link>
                        </li>
                        <li style={{ width: '10%', color: '#aaa' }}>x{item.qty}</li>
                        <li style={{ width: '10%' }}>{order[6]}</li>
                        <li style={{ width: '10%' }}>
                          <p style={{ marginBottom: 10 }}>￥{item.price * item.qty}</p>
                          <p style={{ borderTop: '1px solid #aaa', paddingTop: 10, fontSize: 12 }}>{order[5]}</p>
                          <p style={{ paddingTop: 10, fontSize: 12 }}>{order[3] ? '已付款' : '未付款'}</p>
                        </li>
                        <li style={{ width: '10%' }}>
                          <p style={{ paddingBottom: 10, fontSize: 12 }}>{order[2] ? '完成' : '运送中'}</p>
                          <Link to={`/order/${order[1]}?redirect=myorders`} style={{ fontSize: 12 }}>订单详情</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                ))
              ))}
            </StyledOrder>
          )}
        </>
      )}
      </OrderTemplate>
    </>
  )
}

export default MyOrders

const StyledOrder = styled.div`
  background: #fff;
  padding: 24px;
  margin: 20px 0;
  text-align: center;
  a {
    color: #333;
  }
  .order-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
    background: #eee;
  }
  .order-title-item, .order-item {
    line-height: 30px;
  }
  .order-content {
    border: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .order-content-first, .order-content-second {
    padding-left: 10px;
  }
  .order-content-first {
    background: #eee;
  }
  .order-content-detail {
    display: flex;
    align-items: center;
  }
`

const StyledCart = styled.div`
  margin: 10px 0;
  .success-inform {
    color: #71b247;
    line-height: 30px;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .product-container {
    position: relative;
    display: flex;
    align-items: center;
    .product-info {
      padding: 10px;
      .title {
        font-size: 14px;
      }
      .quantity {
        font-size: 16px;
        color: #aaa;
      }
    }
  }
`
const StyledImage = styled.div`
  display: block;
  width: 100px;
  background: #fff;
  .image-container {
    position: relative;
    width: 100%;
    background: #000;
  }
  .image-container:before {
    display: block;
    content: '';
    padding-top: 75%;
  }
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${props => `url(${props.image})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`