import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, getUser } from '../../store/actions'
import { Loader, BackgroundDefault } from '../../components'

const ProductEdit = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const inputRef = useRef(null)

  // 跟後端拿 user 的資料: GET /api/admin/users/:id
  const userProfile = useSelector((state) => state.userProfile)
  const { loading: loadingProfile } = userProfile
  // 從 store 取得 user 的 Data
  const userDetail = useSelector((state) => state.userDetail)
  const { user } = userDetail
  // 更新 user 的資料: PUT /api/admin/users/:id
  const userEdit = useSelector((state) => state.userEdit)
  const { loading: loadingEdit, success: successEdit } = userEdit

  const [name, setName] = useState(user.name)
  const [brand, setBrand] = useState(user.brand)
  const [category, setCategory] = useState(user.category)
  const [price, setPrice] = useState(user.price)
  const [typeNum, setTypeNum] = useState(user.typeNum)
  const [scale, setScale] = useState(user.scale)
  const [color, setColor] = useState(user.color)
  const [style, setStyle] = useState(user.style)
  const [material, setMaterial] = useState(user.material)
  
  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUser(id))
    } else {
      setName(user.name)
      setBrand(user.brand)
      setCategory(user.category)
      setPrice(user.price)
      setTypeNum(user.typeNum)
      setScale(user.scale)
      setColor(user.color)
      setStyle(user.style)
      setMaterial(user.material)
    }
  }, [dispatch, id, user, successEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch(editUser({ _id: id, name, accountName, phone, isAdmin }))
  }

  return (
    <BackgroundDefault title="编辑产品信息">
      { loadingProfile && <Loader /> } 
      { loadingEdit ? <Loader /> : (
        <StyledForm onSubmit={handleSubmit}>
          <div className='form-item'>
            <label htmlFor="name">产品名称</label>
            <input
              ref={inputRef}  
              id='name' 
              type="text" 
              defaultValue={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="brand">品牌</label>
            <input 
              ref={inputRef}
              id='brand' 
              type="text" 
              defaultValue={brand} 
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="category">分类</label>
            <input 
              ref={inputRef}
              id='category'
              type="text" 
              defaultValue={category} 
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="price">价格</label>
            <input 
              ref={inputRef}
              id='price'
              type="text" 
              defaultValue={price} 
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="typeNum">型号</label>
            <input 
              ref={inputRef}
              id='typeNum'
              type="text" 
              defaultValue={typeNum} 
              onChange={(e) => setTypeNum(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="scale">规格</label>
            <input 
              ref={inputRef}
              id='scale'
              type="text" 
              defaultValue={scale} 
              onChange={(e) => setScale(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="color">颜色样式</label>
            <input 
              ref={inputRef}
              id='color'
              type="text" 
              defaultValue={color} 
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="style">款式</label>
            <input 
              ref={inputRef}
              id='style'
              type="text" 
              defaultValue={style} 
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="material">材质</label>
            <input 
              ref={inputRef}
              id='material'
              type="text" 
              defaultValue={material} 
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>
          <button type='submit'>确认</button>
        </StyledForm>
      ) }
    </BackgroundDefault>
  )
}

export default ProductEdit

const StyledForm = styled.form`
  height: 80vh;
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