import { OrderTemplate } from "../components"
import styled from 'styled-components'
import clsx from 'clsx'
import { message, Alert } from 'antd'
import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
  createOrderAction, 
  savePaymentMethodsAction, 
  saveShippingDetailAction 
} from "../store/actions"
import { ORDER_CREATE_RESET } from '../store/types/orderConstants'
import { Meta } from "../components";

const FillOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const cart = useSelector(state => state.cart)
  const { cartItems, shippingDetail, paymentMethod: payment } = cart
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success } = orderCreate

  const [messageApi, contextHolder] = message.useMessage()
  const [paymentMethod, setPaymentMethod] = useState(payment)
  const [name, setName] = useState(shippingDetail.name)
  const [phone, setPhone] = useState(shippingDetail.phone)
  const [address, setAddress] = useState(shippingDetail.address)
  const [edit, setEdit] = useState(false)

  const handleSubmitOrder = () => {
    if (!name || !phone || !address) {
      navigate('/fillorder')
      messageApi.open({
        type: 'warning',
        content: '请输入正确的收货信息',
      });
      return
    } else if (!Object.keys(paymentMethod).length){
      messageApi.open({
        type: 'warning',
        content: '请输入支付方式',
      });
      return
    } else {
      // 總價: 
      cart.totalPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
      
      dispatch(createOrderAction({
        orderItems: cart.cartItems,
        shippingDetail: cart.shippingDetail,
        paymentMethod: cart.paymentMethod,
        totalPrice: cart.totalPrice
      }))
    }
  }
  useEffect(() => {
    dispatch(savePaymentMethodsAction(paymentMethod))
    dispatch(saveShippingDetailAction({ name, phone, address }))
  }, [ dispatch, paymentMethod, name, phone, address ])

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [navigate, dispatch, success, order])
  return (
    <>
      <Meta title="結算頁" />
      <OrderTemplate title="結算頁">
        <h1 className="fill-title" style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>填写并核对订单信息</h1>
        <StyledOrder>
          <StyledFormContainer>
            <span className="edit" onClick={() => setEdit(true)}>编辑收货信息</span>
            <h1>收货信息</h1>
            <form>
              <div className='form-item'>
                <label htmlFor="name">收货人</label>
                <span 
                  className={clsx('', { inputBody: true, isEdit: edit })}
                >{shippingDetail.name}</span>
                <input 
                  className={clsx('', { isEdit: edit })}
                  ref={inputRef}
                  id='name' type="text" 
                  placeholder='请输入收货人' 
                  defaultValue={shippingDetail.name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='form-item'>
                <label htmlFor="phone">手机号码</label>
                <span 
                  className={clsx('', { inputBody: true, isEdit: edit })}
                >{shippingDetail.phone}</span>
                <input id='phone' type="text" 
                  className={clsx('', { isEdit: edit })}
                  ref={inputRef}
                  placeholder='请输入收货人手机号码'
                  defaultValue={shippingDetail.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className='form-item'>
                <label htmlFor="address">收货地址</label>
                <span 
                  className={clsx('', { inputBody: true, isEdit: edit })}
                  >{shippingDetail.address}</span>
                <input 
                  className={clsx('', { isEdit: edit })}
                  ref={inputRef}
                  id='address' type="text" 
                  placeholder='请输入收货地址'
                  defaultValue={shippingDetail.address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </form>
          </StyledFormContainer>
          <StyledPaymentContainer>
            <h1>支付方式</h1>
            <StyledTagContainer>
              <div 
                className={clsx('', { tag: true, active: paymentMethod === '货到付款' })}
                onClick={() => setPaymentMethod('货到付款')}
              >
              货到付款
              </div>
              <div 
                className={clsx('', { tag: true, active: paymentMethod === '在线支付' })}
                onClick={() => setPaymentMethod('在线支付')}
              >
              在线支付
              </div>
              <div 
                className={clsx('', { tag: true, active: paymentMethod === '对公转账' })}
                onClick={() => setPaymentMethod('对公转账')}
              >
              对公转账
              </div>
            </StyledTagContainer>
          </StyledPaymentContainer>
          <StyledCart>
            <h1>送货清单</h1>
            {cartItems.map(item => (
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
        </StyledOrder>
        <StyledCheckout>
          <table>
            <tr>
              <th>总商品金额：</th>
              <td>￥<span className="price">{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span></td>
            </tr>
            <tr>
              <th>运费：</th>
              <td>￥<span className="price">0.00</span></td>
            </tr>
            <tr className="total">
              <th>应付总额：</th>
              <td>￥<span className="total-price">{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span></td>
            </tr>
          </table>
          <div className="check-button">
            <button
              onClick={handleSubmitOrder}
            >提交订单</button>
          </div>
        </StyledCheckout>
        
        {contextHolder}
      </OrderTemplate>
    </>
  )
}

export default FillOrder

const StyledCheckout = styled.div`
  .check-button {
    margin: 12px 0;
    display: flex;
    justify-content: flex-end;
    button {
      border: 0;
      background: rgb(225, 37, 27);
      color: #fff;
      font-size: 16px;
      padding: 10px 18px;
      cursor: pointer;
    }
  }
  table {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  th, td {
    padding: 8px 0;
    font-size: 16px;
  }
  th {
    width: 100px;
    text-align: right;
  }
  td {
    width: 100px;
    text-align: right;
  }
  .total {
    margin-top: 10px;
    td {
      font-size: 24px;
      font-weight: bold;
      color: rgb(225, 37, 27);
    }
  }
`
const StyledTagContainer = styled.div`
  display: flex;
  .tag {
    border: 1px solid #aaa;
    border-radius: 4px;
    color: #aaa;
    font-weight: bold; 
    padding: 8px 12px;
    margin: 0 8px;
    cursor: pointer;
  }
`
const StyledPaymentContainer = styled.div`
  padding: 10px;
  background: #fff;
  h1 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .active {
    border: 1px solid rgb(225, 37, 27);
    color: rgb(225, 37, 27);
    background: rgb(253, 231, 230);
  }
`
const StyledCart = styled.div`
  background: #fff;
  padding: 10px;
  h1 {
    font-size: 16px;
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
const StyledFormContainer = styled.div`
  position: relative;
  background: #fff;
  padding: 10px;
  h1 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  .edit {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 16px;
    color: #666;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      color: #888;
    }
  }  
  .form-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  } 
  label {
    width: 60px;
    font-weight: bold;
    font-size: 14px;
  }
  .inputBody, input {
    margin-left: 8px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    flex: 1;
    padding: 0;
  }
  .inputBody.isEdit {
    display: none;
  }
  input.isEdit {
    display: block;
  }
  .inputBody {
    display: block;
  }
  input {
    display: none;
    border: 0;
    &:focus {
      outline: 0;
    }
  }
`
const StyledOrder = styled.div`
  border: 1px solid #aaa;
  margin-top: 10px;
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