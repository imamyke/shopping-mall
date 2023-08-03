import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ProductCard = ({ image, name, price, url }) => {
  return (
    <Link to={url}>
      <StyledProductCard image={image}>
        <div className='image-container'>
          <div className="image"></div>
        </div>
        <div className="card-content">
          <p className="card-title">
            {name}
          </p>
          <div className="card-price">
            ￥<span className="price">{price}</span>
          </div>
        </div>
      </StyledProductCard>
    </Link>
  )
}

const StyledProductCard = styled.div`
  display: block;
  background-color: #fff;
  padding: 30px;
  width: 100%;
  &:hover {
    .image-container {
      opacity: 0.8;
    }
  }
  .image-container {
    position: relative;
    width: 100%;
    transition: opacity 0.3s ease-out;
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
  .card-content {
    margin-top: 36px;
    .card-title {
      height: 48px;
      font-size: 16px;
      line-height: 24px;
      text-align: left;
      color: rgb(102, 102, 102);
      transition: color 0.2s ease 0s;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .card-price {
      display: block;
      line-height: 24px;
      font-weight: bold;
      font-size: 14px;
      margin-top: 10px;
      color: rgb(225, 37, 27);
      .price {
        font-size: 24px;
      }
    }
  }
`

export default ProductCard

