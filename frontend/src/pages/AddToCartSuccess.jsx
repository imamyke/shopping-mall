import styled from 'styled-components'
import { DefaultTemplate } from "../components"
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"

const AddToCartSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const addItem = cartItems.find(item => item.product === id)

  return (
    <DefaultTemplate>
      <StyledCart>
        <p className="success-inform">
          <CheckCircleOutlined /> 商品已成功加入购物车！
        </p>
        <div className='product-container'>
          <StyledImage image={addItem.image}>
            <div className="image-container">
              <div className="image"></div>
            </div>
          </StyledImage>
          <div className='product-info'>
            <h1 className="title">{addItem.name}</h1>
            <p className='quantity'>数量 x {addItem.qty}</p>
          </div>
          <div className="product-button">
            <button className='secondary' onClick={() => navigate(`/product/${id}`)}>查看商品详情</button>
            <button className='primary' onClick={() => navigate(`/cart`)}>去購物車結算 {'>'}</button>
          </div>
        </div>
      </StyledCart>
    </DefaultTemplate>
  )
}

export default AddToCartSuccess

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
    .product-info {
      padding: 10px;
      .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .quantity {
        font-size: 16px;
        color: #aaa;
      }
    }
    .product-button {
      position: absolute;
      bottom: 0;
      right: 0;
      button {
        border: 0;
        padding: 10px;
        font-size: 20px;
        cursor: pointer;
      }
      .primary {
        background: rgb(225, 37, 27);
        color: #fff;
      }
      .secondary {
        background: #fff;
        color: rgb(225, 37, 27);
        margin-right: 10px;
      }
    }
  }
`
const StyledImage = styled.div`
  display: block;
  padding: 30px;
  width: 200px;
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