import styled from 'styled-components'
import axios from 'axios'
import Logo from '../assets/images/logo.png'
import { Footer } from '../components'
import { message, Alert } from 'antd'
import { phoneReg, verifyCodeReg } from '../constants'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/actions'
import { Meta } from '../components'

const Signup = () => {
  const navigate = useNavigate()
  const [phoneNumer, setPhoneNumer] = useState('')
  const [code, setCode] = useState('')
  const [time, setTime] = useState(null)

  const [messageApi, contextHolder] = message.useMessage()
  const userSignup = useSelector(state => state.userSignup)
  const { loading, error, userInfo } = userSignup
  const dispatch = useDispatch()
  
  const handleVerifyCode = async () => {
    const phone = phoneNumer
    if (phoneReg.test(phone)) {
      const { data } = await axios.post(
        'http://localhost:5000/api/users/verifycode',
        { phone })
      setCode(data.code)
      count()
    } else {
      messageApi.open({
        type: 'error',
        content: '手机号格式不合法',
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const verifyCode = code
    if (verifyCodeReg.test(verifyCode)) {
      dispatch(signup(phoneNumer, verifyCode))
    } else {
      messageApi.open({
        type: 'error',
        content: '验证码格式不合法',
      });
    }
  }

  // 18681547948
  const count = () => {
    let timer = null
    let sec = 60
    timer = setInterval(() => {
      sec--
      setTime(sec)
      if (sec <= 0) {
        clearInterval(timer)
        return false
      }
    }, 1000)
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  })

  console.log(userInfo, error);

  return (
    <>
      <Meta title="欢迎注册" />
      <StyledLoginNavbar>
        <StyledContainer>
          <div className="navbar">
            <div className='navbar-logo'>
              <Link to="/">
                <img src={Logo} width={160} alt="logo"  />
              </Link>
              <h1 className='title'>欢迎注册</h1>
            </div>
            <p className='login-link'>
              已有帳號?
              <Link to='/login' className='login'>请登录 {`>`}</Link>
            </p>
          </div>
        </StyledContainer>
      </StyledLoginNavbar>
      <StyledLoginContainer>
        <div style={{ width: '500px', margin: '0 auto' }}>
          <h1>手机号快速注册</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="form-item phone-container">
                <input 
                  type="text" 
                  placeholder="请输入手机号" 
                  value={phoneNumer}
                  onChange={(e) => setPhoneNumer(e.target.value)}
                />
              </div>
              <div className="form-item verify-code">
                <input 
                  type="text" 
                  placeholder="请输入验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button 
                  className='verify-button'
                  type="button" 
                  onClick={handleVerifyCode}
                  disabled={time > 0 && true}
                >{time > 0 && `(${time})`}获取验证码</button>
              </div>
              <button 
                type="submit" 
                className="login-button" 
              >一键快速注册</button>
            </div>
            <div className='error'>
              { error && <Alert message={error} type="warning" /> }
            </div>
          </form>
        </div>
      </StyledLoginContainer>
      <Footer />
    </>
  )
}

export default Signup

const StyledLoginContainer = styled.div`
  margin-top: 200px;
  height: 150vh;
  h1 {
    text-align: center;
    padding-bottom: 10px;
    font-size: 22px;
    font-weight: bold;
  }
  .error {
    padding: 0 20px;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    button {
      border: 0;
    }
    .form-item {
      overflow: hidden;
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      border: 1px solid #ccc;
      background: #ccc;
      input {
        font-size: 14px;
        padding: 14px 20px;
        border: 0;
        background: #fff;
        flex: 1;
      }
      input:focus {
        border: 0;
        outline: 0;
      }
    }
    .form-item.verify-code {
      display: flex;
      button {
        width: 100px;
        font-size: 14px;
        cursor: pointer;
      }
      button:disabled {
        color: #fb5d5a;
        font-size: 8px;
      }
    }
    .login-button {
      width: 100%;
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background: #fb5d5a;
      cursor: pointer;
    }
    .signup-link {
      text-decoration: none;
      margin-top: 20px;
      color: grey;
      font-size: 14px;
    }
  }
`

const StyledLoginNavbar = styled.header`
  padding: 20px 0;
  box-shadow: 0 3px 5px #888;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .navbar-logo {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 30px;
    font-weight: bold;
  }
  .login-link {
    color: #aaa;
    font-size: 20px;
    align-self: flex-end;
    .login {
      color: rgb(225, 37, 27);
      text-decoration: none;
      margin-left: 4px;
    }
  }
`
const StyledContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`