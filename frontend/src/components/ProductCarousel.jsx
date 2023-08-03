import { Carousel } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { productTopRated } from '../store/actions/productAction'
import { useEffect } from 'react'
import { Loader } from '../components'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTop = useSelector(state => state.productTopRated)
  const { loading, products } = productTop

  useEffect(() => {
    dispatch(productTopRated())
  }, [dispatch])

  return loading ? <Loader /> : (
      <Carousel autoplay>
        {products?.map(product => (
          <div key={product._id}>
            <img src={product.image} width="100%" height={524} alt={product.name} style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </Carousel>
    )
  
}

export default ProductCarousel