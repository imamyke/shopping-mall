import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <StyledLoginNavbar>
      <div className="container">
        <h1>欢迎登录</h1>
        <p>
          已有帳號?
          <Link to='/login'>请登录</Link>
        </p>
      </div>
    </StyledLoginNavbar>
  )
}

export default Login

const StyledLoginNavbar = styled.div`
  border: 1px solid #000;
  height: 110px;
`