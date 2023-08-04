import styled from 'styled-components'
import { CartTemplate } from "../components"
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { removeFromCartAction, addToCartAction } from '../store/actions/cartAction'
import { Alert, message } from 'antd';
import { Meta } from '../components'

const Cart = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  

  const handleCheckout = () => {
    if (!cartItems.length) {
      messageApi.open({
        type: 'warning',
        content: '你的购物车是空的',
      });
      return
    }
    navigate(`/login?redirect=fillorder`)
  }

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCartAction(id))
  }
  
  const handleReduceQuantity = (id, qty) => {
    let minusQty = qty - 1
    if (minusQty > 0) {
      dispatch(addToCartAction(id, minusQty))
    }
    console.log(qty);
  }
  const handleAddQuantity = (id, qty) => {
    let addQty = qty + 1
    dispatch(addToCartAction(id, addQty))
  }
  return (
    <>
      <Meta title="我的购物车" />
      <CartTemplate background="#fff">
        <StyledTable>
          <h1 className='product-amount'>
            全部商品 <span className='amount'>{cartItems.reduce((acc, item) => acc + item.qty, 0)} 件</span>
          </h1>
          {cartItems.length === 0 ? (
            <Alert message="快填满你的购物车吧~" type="error" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>商品</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>小计</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <Link to={`/product/${item.product}`} style={{ color: '#000' }}>
                        <StyledCart>
                          <div className='product-container'>
                            <StyledImage image={item.image}>
                              <div className="image-container">
                                <div className="image"></div>
                              </div>
                            </StyledImage>
                            <div className='product-info'>
                              <h1 className="title">{item.name}</h1>
                            </div>
                          </div>
                        </StyledCart>
                      </Link>
                    </td>
                    <td className='item'>
                      <span className='td-item'>
                        ￥{item.price}
                      </span>
                    </td>
                    <td className='item'>
                      <div className="stepper td-item">
                        <div className="minus" onClick={() => handleReduceQuantity(item.product, item.qty)}>
                          <MinusOutlined />
                        </div>
                        <div className="quantity">{item.qty}</div>
                        <div className="plus" onClick={() => handleAddQuantity(item.product, item.qty)}>
                          <PlusOutlined />
                        </div>
                      </div>
                    </td>
                    <td className='item'>
                      <span className='td-item'>
                        ￥{(item.price * item.qty).toFixed(2)}
                      </span>
                    </td>
                    <td className='item'>
                      <button className='delete td-item' onClick={() => handleRemoveFromCart(item.product)}>删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="checkout-container">
            <p className='total'>
              总价: 
              <span className='total-price'>
                ￥{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </span>
            </p>
            {contextHolder}
            <button onClick={handleCheckout}>去结算</button>
          </div>
        </StyledTable>
      </CartTemplate>
    </>
  )
}

export default Cart

const StyledTable = styled.div`
  margin-top: 10px;
  .checkout-container {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .total {
      color: #888;
      margin-right: 18px;
    }
    .total-price {
      color: rgb(225, 37, 27);
      font-weight: bold;
      font-size: 24px;
    }
    button {
      background: rgb(225, 37, 27);
      color: #fff;
      border: 0;
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .product-amount {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: rgb(225, 37, 27);
  }
  table {
    background: #fff;
    width: 100%;
    border: 1px solid #ccc;
    th, td {
      line-height: 20px;
      padding: 0 4px;
      font-size: 14px;
    }
    th {
      font-weight: bold;
      color: #000;
      border-bottom: 1px solid #ccc;
    }
    td {
      border-collapse: collapse;
    }
    .item {
      position: relative;
      width: 100px;
      .td-item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .delete.td-item {
        border: 0;
        padding: 4px 8px;
        background: #eee;
        transition: all 0.3s;
        cursor: pointer;
      }
    }
  }
  .stepper {
    display: flex;
    text-align: center;
    margin-right: 10px;
    font-size: 16px;
    .minus, .plus, .quantity {
      width: 24px;
      height: 24px;
      line-height: 24px;
    }
    .minus, .plus {
      border: 1px solid #aaa;
      cursor: pointer;
      font-size: 12px;
    }
    .quantity {
      border-style: solid;
      border-color: #aaa;
      border-width: 1px 0 1px 0;
      font-weight: bold;
    }
  }
`

const StyledCart = styled.div`
  margin: 10px;
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
        font-size: 16px;
        font-weight: bold;
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