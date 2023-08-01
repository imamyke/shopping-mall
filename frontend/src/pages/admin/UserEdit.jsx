import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, getUser } from '../../store/actions'
import { Loader, BackgroundDefault } from '../../components'

const UserEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const inputRef = useRef(null)
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
  const [accountName, setAccountName] = useState(user.accountName)
  const [phone, setPhone] = useState(user.phone)
  const [isAdmin, setIsAdmin] = useState(user.isAdmin)
  
  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUser(id))
    } else {
      setName(user.name)
      setAccountName(user.accountName)
      setPhone(user.phone)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, id, user, successEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editUser({ _id: id, name, accountName, phone, isAdmin }))
  }

  return (
    <BackgroundDefault title="编辑用户信息">
      { loadingProfile && <Loader /> } 
      { loadingEdit ? <Loader /> : (
        <StyledForm onSubmit={handleSubmit}>
          <div className='form-item'>
            <label htmlFor="name">用戶姓名</label>
            <input
              ref={inputRef}  
              id='name' 
              type="text" 
              defaultValue={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="accountName">帐号名</label>
            <input 
              ref={inputRef}
              id='accountName' 
              type="text" 
              defaultValue={accountName} 
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label htmlFor="phone">手机号</label>
            <input 
              ref={inputRef}
              id='phone'
              type="text" 
              defaultValue={phone} 
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <div className="admin-title">管理员权限</div>
            <div className='checkbox-container'>
              <label className='checkbox-label' htmlFor="admin">
                <input 
                  id='admin' 
                  type="checkbox" 
                  checked={isAdmin} 
                  onChange={() => setIsAdmin(!user.isAdmin)}
                />
                <span className='checkbox-para'>开启</span>
                <div className='checkbox'>
                  <i class="fa-solid fa-check"></i>
                </div>
              </label>
            </div>
          </div>
          <button type='submit'>确认</button>
        </StyledForm>
      ) }
    </BackgroundDefault>
  )
}

export default UserEdit

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