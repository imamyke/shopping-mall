import styled from 'styled-components'
import { Layout, Dropdown, Space, Row, Col, Image  } from 'antd';
import { Footer } from '.'
import { productListAction } from "../store/actions"
import { useEffect } from "react"

import { DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions'

const OrderTemplate = ({ children, title, background }) => {
  
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const handleLogout = async () => {
    dispatch(logout())
  }

  const items = [
    {
      key: '1',
      label: (<Link to="/profile">个人主页</Link>),
    },
    {
      key: '2',
      label: (<Link onClick={handleLogout}>退出登录</Link>),
    }
  ];
  useEffect(() => {
    dispatch(productListAction())
  },[dispatch])
  return (
    <Layout>
      <StyledHeader>
        <StyledNavbarContainer>
          <Row justify="end" style={{ textAlign: 'center'}}>
          { userInfo && userInfo.isAdmin && (
              <Col span={2} key="6">
                <Link to='/admin/userlist'>
                  後台管理
                </Link>
              </Col>
            )}
            <Col span={2} key="2">
              <Link to='/cart'>
                <i className="fas fa-shopping-cart"></i>购物车
              </Link>
            </Col>
            <Col span={2} key="6">
            <Dropdown menu={{ items }}>
              <Space style={{ color: '#fff', fontSize: 16, cursor: 'pointer' }}>
                { userInfo ? (
                  <div>{userInfo.name}</div>
                ) : (
                  <Link to="/login">登入</Link>
                )}
                <DownOutlined />
              </Space>
            </Dropdown>
            </Col>
          </Row>
        </StyledNavbarContainer>
      </StyledHeader>
      <StyledSearchBar>
        <StyledTopMenu>
          <StyledContainer>
            <Row justify="flex-start" align="middle">
              <Col span={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Link to="/">
                  <Image 
                    preview={false}
                    height={120}
                    src='https://img10.360buyimg.com/img/jfs/t1/192028/25/33459/5661/63fc2af2F1f6ae1b6/d0e4fdc2f126cbf5.png'
                    />
                </Link>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</h1>
              </Col>
            </Row>
          </StyledContainer>
        </StyledTopMenu>
      </StyledSearchBar>
      <StyledContentBackground background={background}>
        <StyledContent>
          { children }
        </StyledContent>
      </StyledContentBackground>
      <Footer />
    </Layout>
  )
}

export default OrderTemplate

const StyledContentBackground = styled.div`
  background: ${props => props.background};
`
const StyledContent = styled.div`
  max-width: 1250px; 
  margin: 0 auto;
`
const StyledContainer = styled.div`
  min-width: 1250px;
  margin: 0 auto;
`
const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  background: #e1251b;
`
const StyledNavbarContainer = styled(StyledContainer)`
  line-height: 32px;
  a {
    color: #fff;
    font-size: 16px;
  }
  i {
    padding-right: 4px;
  }
`
const StyledTopMenu = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  background: #fff;
`
const StyledSearchBar = styled.div`
  background: #fff;
`
