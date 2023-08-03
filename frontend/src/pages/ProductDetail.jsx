import styled from "styled-components"
import { useNavigate, useParams } from 'react-router-dom'
import { PlusOutlined, MinusOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { productDetailAction, addToCartAction, createProductReview } from "../store/actions"
import { useEffect, useState } from "react"
import { Loader, DefaultTemplate } from '../components'
import { Row, Col, Rate, Alert, Avatar } from 'antd';
import { PRODUCT_CREATE_REVIEW_RESET } from "../store/types/productConstants";
import { Meta } from "../components";

const ProductDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  const [quantity, setQuantity] = useState(1)

  // 商品評論
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const results = useSelector(state => state.productDetail)
  const { loading, product } = results
  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { 
    success: successProductReview,
    loading: loadingProductReview
  } = productReviewCreate

  // 導入產品資訊
  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || successProductReview || product._id !== id) {
      dispatch(productDetailAction(id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, id, successProductReview, product])

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
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, { rating, comment })
    )
  }

  return (
    <>
      <Meta title={product.name} />
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
                  <div className="minus" onClick={handleReduceQuantity}><MinusOutlined /></div>
                  <div className="quantity">{quantity}</div>
                  <div className="plus" onClick={handleAddQuantity}><PlusOutlined /></div>
                </div>
                <button onClick={() => handleAddToCart(id, quantity)}>加入购物车</button>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              { loadingProductReview && <Loader /> }
              <StyledComment>
                { userInfo ? (
                  <form onSubmit={handleSubmit}>
                    <div className="form-item">
                      <span className="item-title" style={{ width: '10%' }}>商品评分</span> 
                      <Rate 
                        style={{ marginRight: '10px' }}
                        value={rating} 
                        allowHalf 
                        onChange={(value) => setRating(value)}
                      />
                      <span className="item-title">( {rating ? rating : 0} )分</span>
                    </div>
                    <div className="form-item">
                      <span className="item-title" style={{ width: '10%' }}>评价晒单</span>
                      <textarea 
                        className="textarea"
                        style={{ width: '90%' }}
                        name="textarea" 
                        id="textarea" 
                        placeholder='请输入你的評論'
                        cols="30" 
                        rows="5" 
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div className="button-container">
                      <button 
                        type="submit"
                        disabled={loadingProductReview}
                        >提交评论
                      </button>
                    </div>
                  </form>
                ) : (
                  <Alert message="請登入來寫下你的評論" type="warning" />
                  )}
              </StyledComment>
            </Col>
            <Col span={12}>
            <StyledComment>
              <h1>商品评论</h1>
                <ul>
                { product.reviews.length === 0 && <Alert message="目前没有评论" type="info" /> }
                  {product.reviews.map((review) => (
                    <li key={review._id} className="comment-item">
                      <div className="avatar">
                        <Avatar
                          style={{
                            backgroundColor: 'rgb(225, 114, 109)'
                          }}
                          icon={<UserOutlined />}
                        />
                        <strong className="user-name">{review.name}</strong>
                      </div>
                      <div className="comment">
                        <Rate disabled value={review.rating} />
                        <p className="content">{review.comment}</p>
                        <p className="comment-time">{review.createdAt.substring(0, 10)}</p>
                      </div>
                    </li>
                  ))}
                  
                </ul>        
            </StyledComment>
            </Col>
          </Row>
        </StyledCart>
      </DefaultTemplate>  
    </>
  )
}

export default ProductDetail

const StyledComment = styled.div`
  margin-top: 10px;
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .comment-item {
    display: flex;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #333;
  }
  .avatar {
    width: 30%;
    .user-name {
      margin-left: 10px;
      color: #333;
      font-weight: bold;
    }
  }
  .comment {
    width: 70%;
    .content, .comment-time {
      margin-top: 10px;
    }
    .content {
      font-size: 16px;
    }
    .comment-time {
      color: #666;
      text-align: right;
    }
  }
  .form-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .textarea {
    resize: none;
    font-size: 14px;
    padding: 8px;
    line-height: 16px;
    border-radius: 4px;
    border: 1px solid #aaa;
  }
  .textarea:hover {
    border-color: 0;
    outline: none;
  }
  .textarea:focus {
    outline: none;
    border-color: 0;
    box-shadow: 0;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    button {
      border: 0;
      background: #555;
      color: #fff;
      padding: 8px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: #888;
      }
    }
  }
`

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
        line-height: 40px;
      }
      .minus, .plus {
        border: 1px solid #aaa;
        cursor: pointer;
        font-size: 14px;
      }
      .quantity {
        border-style: solid;
        border-color: #aaa;
        border-width: 1px 0 1px 0;
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