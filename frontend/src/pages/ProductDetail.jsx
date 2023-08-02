import styled from "styled-components"
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productDetailAction, addToCartAction } from "../store/actions"
import { useEffect, useState } from "react"
import { Loader, DefaultTemplate } from '../components'
import { DownOutlined } from '@ant-design/icons'
import { Row, Col, Rate, message } from 'antd';


const ProductDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  const [quantity, setQuantity] = useState(1)

  const results = useSelector(state => state.productDetail)
  const { loading, product } = results

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log(cartItems);

  // 導入產品資訊
  useEffect(() => {
    dispatch(productDetailAction(id))
  }, [dispatch, id])

  const handleAddQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity + 1)
    }
  }
  const handleReduceQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = (id, qty) => {
    dispatch(addToCartAction(id, qty))
    navigate(`/cart/${id}`)
  }
  console.log(product);

  return (
    <DefaultTemplate>
      { loading && <Loader /> }
      <StyledCart>
        <Row>
          <Col span={12}>
            <StyledImage image={product.image}>
              <div className="image-container">
                <div className="image"></div>
              </div>
            </StyledImage>
          </Col>
          <Col span={12} style={{ paddingLeft: 10 }}>
            <h1 className="title">{product.name}</h1>
            <div className="rate">
              <Rate disabled count={5} value={product.rating} />
            </div>
            <div className="cart-price">
              ￥<span className="price">{product.price}</span>
            </div>
            <div className="parameter-container">
              <h1 className="parameter-title">规格参数</h1>
                { product.brand && (
                  <div className="parameter">
                    品牌: <span className="parameter-value">{product.brand}</span>
                  </div>
                ) }
                { product.typeNum && (
                  <div className="parameter">
                    型号: <span className="parameter-value">{product.typeNum}</span>
                  </div>
                ) }
                { product.scale && (
                  <div className="parameter">
                    规格: <span className="parameter-value">{product.scale}</span>
                  </div>
                ) }
                { product.color && (
                  <div className="parameter">
                    颜色样式: <span className="parameter-value">{product.color}</span>
                  </div>
                ) }
                { product.style && (
                  <div className="parameter">
                    款式: <span className="parameter-value">{product.style}</span>
                  </div>
                ) }
                { product.materiel && (
                  <div className="parameter">
                    材质: <span className="parameter-value">{product.materiel}</span>
                  </div>
                ) }
            </div>
            <div className="add-to-cart">
              <div className="stepper">
                <div className="minus" onClick={handleReduceQuantity}>-</div>
                <div className="quantity">{quantity}</div>
                <div className="plus" onClick={handleAddQuantity}>+</div>
              </div>
              <button onClick={() => handleAddToCart(id, quantity)}>加入购物车</button>
            </div>
          </Col>
        </Row>
      </StyledCart>
    </DefaultTemplate>
  )
}

export default ProductDetail

const StyledCart = styled.div`
  margin: 20px 0;
  .title {
    font-size: 24px;
    line-height: 36px;
    font-weight: bold;
  }
  .rate {
    margin: 10px 0;
  }
  .cart-price {
    font-size: 18px;
    font-weight: bold;
    color: rgb(225, 37, 27);
    margin-bottom: 10px;
    .price {
      font-size: 28px;
    }
  }
  
  .add-to-cart {
    border-top: 1px solid #aaa;
    display: flex;
    padding-top: 10px;
    .stepper {
      display: flex;
      text-align: center;
      margin-right: 10px;
      font-size: 18px;
      .minus, .plus, .quantity {
        width: 40px;
        height: 40px;
        border: 1px solid #aaa;
        line-height: 40px;
      }
      .minus, .plus {
        cursor: pointer;
      }
      .quantity {
        font-weight: bold;
      }
    }
    button {
      cursor: pointer;
      padding: 0 10px;
      display: block;
      border: 0;
      background: rgb(225, 37, 27);
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .parameter-container {
    padding: 10px 0;
    border-top: 1px solid #aaa;
    .parameter-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .parameter {
      font-size: 16px;
      margin-bottom: 10px;
      .parameter-value {

      }
    }
  }
`
const StyledImage = styled.div`
  display: block;
  background-color: #fff;
  padding: 30px;
  width: 100%;
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