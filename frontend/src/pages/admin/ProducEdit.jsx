import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productDetailAction, updateProduct, getProduct } from '../../store/actions'
import { Loader, BackgroundDefault } from '../../components'
import { PRODUCT_UPDATE_RESET } from '../../store/types/adminConstants'

const ProductEdit = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productAdminDetail = useSelector((state) => state.productAdminDetail)
  const { loading, product, error } = productAdminDetail
  // const productDetail = useSelector((state) => state.productDetail)
  // const { loading , product, error } = productDetail

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, success: successUpdate } = productUpdate

  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [image, setImage] = useState(product.image)
  const [brand, setBrand] = useState(product.brand)
  const [category, setCategory] = useState(product.category)
  const [countInStock, setCountInStock] = useState(product.countInStock)
  const [typeNum, setTypeNum] = useState(product.typeNum)
  const [scale, setScale] = useState(product.scale)
  const [color, setColor] = useState(product.color)
  const [style, setStyle] = useState(product.style)
  const [material, setMaterial] = useState(product.material)

  
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type:  PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } 
    if (!product.name || product._id !== id) {
      dispatch(getProduct(id))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setTypeNum(product.typeNum)
      setScale(product.scale)
      setColor(product.color) 
      setStyle(product.style)
      setMaterial(product.material)
    }
    
  }, [dispatch, id, product, successUpdate, navigate])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({ 
        _id: product._id,
        name, 
        price,
        image,
        category, 
        countInStock,
        brand, 
        typeNum,
        scale,
        color,
        style,
        material
      })
    )
  }

  // upload image
  const [uploading, setUploading] = useState(false)
  const handleUploadFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      const { data } = await axios.post('/api/upload', formData, config)
      let path = String.raw`${data}`
      setImage(path)
      setUploading(false)
      console.log(path)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  return (
    <BackgroundDefault title="编辑产品信息">
      { loading ? <Loader /> : (
        <StyledForm onSubmit={handleSubmit}>
          <div className='form-item'>
            <label htmlFor="name">商品名称</label>
            <input
              value={name}              
              id='name' 
              type="text" 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="brand">品牌</label>
            <input
              value={brand}
              id='brand' 
              type="text" 
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="category">分类</label>
            <input
              value={category}
              id='category'
              type="text" 
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="price">价格</label>
            <input
              value={price}
              id='price'
              type="text" 
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="countInStock">库存量</label>
            <input
              value={countInStock}
              id='countInStock'
              type="text" 
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="typeNum">型号</label>
            <input
              value={typeNum}
              id='typeNum'
              type="text" 
              onChange={(e) => setTypeNum(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="scale">规格</label>
            <input
              value={scale}
              id='scale'
              type="text" 
              onChange={(e) => setScale(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="color">颜色样式</label>
            <input
              value={color}
              id='color'
              type="text" 
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="style">款式</label>
            <input
              value={style}
              id='style'
              type="text" 
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="material">材质</label>
            <input
              value={material}
              id='material'
              type="text" 
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="image">商品图片</label>
            <input
              value={image}
              id='image'
              type="text" 
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          { uploading && <Loader /> }
          <div className='form-item'>
            <label htmlFor="file">商品图片</label>
            <input
              id='file'
              type="file" 
              onChange={handleUploadFile}
            />
          </div>
          <button type='submit'>确认</button>
        </StyledForm>
      )}
    </BackgroundDefault>
  )
}

export default ProductEdit

const StyledForm = styled.form`
  width: 500px;
  margin: 60px auto 0 auto;
  .form-item {
    display: flex;
    flex-direction: column;
  }
  label, .admin-title {
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  input {
    font-size: 16px;
    border: 1px solid #aaa;
    margin-bottom: 10px;
    padding: 10px 4px;
    &:focus {
      outline: 0;
    }
  }
  .checkbox-container {
    display: flex;
    align-items: center;
    position: relative;
    .checkbox-para {
      padding-left: 24px;
      font-size: 16px;
    }
    input[type="checkbox"] {
      width: 1px;
      height: 1px;
      visibility: hidden;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      &:checked ~ div{
        i {
          opacity: 1;
        }
      }
    }
    .checkbox {
      width: 20px;
      height: 20px;
      border: 1px solid #000;
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      i {
        color: #000;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
      }
    }
  }
  button {
    display: block;
    margin-top: 20px;
    border: 0;
    padding: 10px 4px;
    width: 100%;
    background: #032a4f;
    color: #fff;
    font-size: 16px;
  }
`