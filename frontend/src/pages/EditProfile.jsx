import styled from 'styled-components'
import axios from "axios"
import { message } from "antd"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultProfileTemplate, Meta, Loader } from "../components"
import { getUserDetail, updateUserProfile } from '../store/actions'
import { USER_UPDATE_PROFILE_RESET } from '../store/types/userConstants'

const EditProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userDetail = useSelector(state => state.userDetail)
  const { loading, user } = userDetail
  const userUpdateProfile = useSelector(state => state.userUpdate)
  const { success } = userUpdateProfile

  const [image, setImage] = useState('')
  const [name, setName] = useState(user.name)
  const [accountName, setAccountName] = useState(user.accountName)
  const [phone, setPhone] = useState(user.phone)
  const [messageApi, contextHolder] = message.useMessage()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !accountName || !phone) {
      messageApi.open({
        type: 'warning',
        content: '还有信息没填写完唷',
      })
      return
    } else {
      dispatch(updateUserProfile({ name, accountName, phone }))
    }
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetail('profile'))
      } else {
        setName(user.name)
        setAccountName(user.accountName)
        setPhone(user.phone)
      }
    }
  }, [userInfo, navigate, dispatch, user, success])

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
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  
  
  return (
    <>
      <Meta title="编辑个人信息" />
      <DefaultProfileTemplate>
        {contextHolder}
        <StyledEditProfile>
          <h1>编辑个人信息</h1>
          {loading ? <Loader /> : (
            <form onSubmit={handleSubmit}>
              <div className='form-item'>
                <label htmlFor="name">名稱</label>
                <input 
                  id='name' type="text" 
                  placeholder='请输入名稱' 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='form-item'>
                <label htmlFor="accountName">帐号名</label>
                <input 
                  id='accountName' type="text" 
                  placeholder='请输入帐号名' 
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
              </div>
              <div className='form-item'>
                <label htmlFor="phone">手机号码</label>
                <input id='phone' type="text" 
                  placeholder='请输入手机号码'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="update-button">
                <button type='submit'>提交</button>
              </div>
            </form>
          )}
        </StyledEditProfile>
      </DefaultProfileTemplate>
    </>
  )
}

export default EditProfile

const StyledEditProfile = styled.div`
  padding: 20px;
  background: #fff;
  h1 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  form {
    width: 300px;
    .update-button {
      display: flex;
      justify-content: flex-end;
    }
    button {
      border: 0;
      padding: 8px 12px;
      cursor: pointer;
      transition: all 0.3s;
      background: #ccc;
      &:hover {
        background: #ddd;
      }
    }
  }
  .form-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    label, input {
      font-size: 14px;
      line-height: 20px;
    }
    label {
      font-weight: bold;
      margin-bottom: 4px;
    }
    input {
      padding: 4px;
      border: 1px solid #aaa;
      &:focus {
        outline: 0;
      }
    }
  }
`