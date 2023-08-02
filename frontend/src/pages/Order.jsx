import { OrderTemplate, Loader } from "../components"
import styled from 'styled-components'
import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAction, getOrderDetailAction } from "../store/actions"
import { Alert } from 'antd'

const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const { id } = useParams()
  const redirect = search ? `/myorders` : '/cart' // myorder 使用

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const orderDetail = useSelector(state => state.orderDetail)
  const { loading, order, error } = orderDetail
  console.log(redirect);

  const handleAddToCart = (id, qty) => {
    dispatch(addToCartAction(id, qty))
  }
  const phoneTransfer = (phone) => {
    return phone.split('').map((item, idx) => {
      if (idx > 2 && idx < 7) {
        return '*'
      } else {
        return item
      }
    }).join('')
  }
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(getOrderDetailAction(id))
  }, [dispatch, id, userInfo, navigate])
  
  return loading ? <Loader /> :(
    <OrderTemplate title="订单详情">
      <StyledBlock>
        <h1>
          <i class="fa-regular fa-circle-user" style={{ marginRight: '4px' }}></i> 
          {order.shippingDetail.name}
          <span className='order-phone'>{phoneTransfer(order.shippingDetail.phone)}</span>
        </h1>
        <span className='order-address'>地址: {order.shippingDetail.address}</span>
      </StyledBlock>
      <h1 className="fill-title" style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>订单內容</h1>
      <StyledOrder>
        <StyledCart>
          <h1>送货清单</h1>
          {order.orderItems.map(item => (
            <div className='product-container'>
              <StyledImage image={item.image}>
                <div className="image-container">
                  <div className="image"></div>
                </div>
              </StyledImage>
              <div className='product-info'>
                <h1 className="title">{item.name}</h1>
                <Alert type="warning" message="支持7天无理由退货" />
              </div>
              <div className="order-price">
                ￥{item.price}
              </div> 
              <div className="order-quantity">
                x {item.qty}
              </div>  
            </div>
          ))}
        </StyledCart>
        <StyledPaymentContainer>
          <h1>支付內容</h1>
          <table>
            <tr>
              <th>实付款</th>
              <td>合計 ￥<span>{addDecimals(order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0))}</span></td>
            </tr>
            <tr>
              <th>订单编号</th>
              <td>{order._id}</td>
            </tr>
            <tr>
              <th>支付方式</th>
              <td>{order.paymentMethod}</td>
            </tr>
            <tr>
              <th>下单时间</th>
              <td>{order.createdAt.substring(0, 10)}</td>
            </tr>
          </table>
        </StyledPaymentContainer>
      </StyledOrder>
    </OrderTemplate>
  )
}

export default Order

const StyledBlock = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: #fff;
  h1 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .order-address {
    font-size: 16px;
    color: #666;
  }
  .order-phone {
    margin-left: 4px;
    color: #666;
  }
`
const StyledPaymentContainer = styled.div`
  padding: 10px;
  background: #fff;
  h1 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    th, td {
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    th {
      width: 100px;
    }
    td {
      border-collapse: collapse;
    }
  }
`
const StyledCart = styled.div`
  background: #fff;
  padding: 10px;
  h1 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .ant-alert {
    margin-top: 10px;
    padding: 4px 8px;
  }
  .product-container {
    position: relative;
    display: flex;
    align-items: center;
    .product-info {
      padding: 10px;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
`
const StyledOrder = styled.div`
  border: 1px solid #aaa;
  margin: 10px 0;
  .fill-title{
    font-size: 20px;
  }
  .order-quantity, .order-price {
    text-align: center;
    width: 100px;
  }
  .order-price {
    color: rgb(225, 37, 27);
    font-weight: bold;
    font-size: 18px;
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