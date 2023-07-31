import styled from 'styled-components'
import { Layout, Dropdown, Space, Row, Col, Image  } from 'antd';
import { ProductCard, Footer, Loader } from '../components'
import { productListAction } from "../store/actions"
import { useEffect } from "react"

import { DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions'

const Home = () => {
  
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const results = useSelector(state => state.productList)
  const { loading, productList, error } = results
  const handleLogout = async () => {
    dispatch(logout())
  }

  const items = [
    {
      key: '1',
      label: (<Link to="/login">个人主页</Link>),
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
              <Link to='/'>
                <i className="fas fa-shopping-cart"></i>Cart
              </Link>
            </Col>
            <Col span={2} key="6">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  { userInfo ? (
                    <div>{userInfo.name}</div>
                  ) : (
                    <Link to="/login">登入</Link>
                  )}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            </Col>
          </Row>
        </StyledNavbarContainer>
      </StyledHeader>
      <div style={{ background: '#fff' }}>
        <StyledTopMenu>
          <StyledContainer>
            <Row justify="space-between" align="middle">
              <Col span={6}>
                <Image 
                  preview={false}
                  height={120}
                  src='https://img10.360buyimg.com/img/jfs/t1/192028/25/33459/5661/63fc2af2F1f6ae1b6/d0e4fdc2f126cbf5.png'
                  />
              </Col>
              <Col span={12} style={{ alignSelf: 'end', marginBottom: '14px' }}>
                <StyledSearchContainer>
                  <input 
                    type="text"
                    placeholder='请输入商品...'
                  />
                  <button type='button'>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </StyledSearchContainer>
                <StyledUnderList>
                  {
                    menuItems.map((item, idx) => 
                      <li key={idx}>
                        <a href="#">{item}</a>
                      </li>
                    )
                  }
                </StyledUnderList>
              </Col>
              <Col span={6} style={{ textAlign: 'center' }}>
                <Image 
                  preview={false}
                  height={66}
                  src='data:image/png;base64,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'
                  />
              </Col>
            </Row>
            <StyledPrimaryList>
              {
                menuPrimaryItems.map((item, idx) => 
                  <li key={idx}>
                    <a href="#">{item}</a>
                  </li>
                )
                }
            </StyledPrimaryList>
          </StyledContainer>
        </StyledTopMenu>
      </div>
      { loading && <Loader /> }
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
        <StyledContainer>
          <StyledContent>
            <Row gutter={12} justify="start">
              {productList.map(product => (
                <Col span={4} key={product._id} style={{ marginBottom: '10px' }}>
                  <ProductCard 
                    image={product.image} 
                    name={product.name}
                    price={product.price}
                  />
                </Col>
              ))}
            </Row>
            <Row gutter={12} justify="start">
              {productList.map(product => (
                <Col span={4} key={product._id} style={{ marginBottom: '10px' }}>
                  <ProductCard 
                    image={product.image} 
                    name={product.name}
                    price={product.price}
                  />
                </Col>
              ))}
            </Row>
          </StyledContent>
        </StyledContainer>
      </div>
      <Footer />
    </Layout>
  )
}

export default Home

const menuItems = [
  '京东礼品卡',
  'Z50S PRO',
  '装修福利',
  '新秀丽',
  '免费设计',
  '购机补贴', 
  '超值奢品',
  '防晒消暑'
]
const menuPrimaryItems = [
  '京东超市',
  '京东家电',
  '秒杀',
  '京东生鲜',
  'PLUS会员',
  '电脑数码',
  '便宜包邮',
  '拍卖',
  '进口好物',
  '京东五金城'
]
const StyledContainer = styled.div`
  min-width: 1500px;
  margin: 0 auto;
  border: 1px solid #000;
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
  max-width: 1500px;
  margin: 0 auto;
  background: #fff;
  `
const StyledContent = styled.div`
  margin-top: 10px;
  min-width: 1500px;
`
const StyledSearchContainer = styled.div`
  display: flex;
  width: 100%;
  input {
    flex: 1;
    height: 40px;
    border: 3px solid #e1251b;
    padding-left: 10px;
    &:focus {
      outline: 0;
    }
  }
  button {
    cursor: pointer;
    width: 40px;
    background-color: #e1251b;
    border: 0;
    &:hover {
      background-color: #c81623;
    }
    i {
      font-size: 16px;
      color: #fff;
    }
  }
`
const StyledUnderList = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-around;
  
  a {
    display: block;
    padding: 8px 4px;
    color: #999;
  }
  a:hover {
    color: #e1251b;
  }
`
const StyledPrimaryList = styled(StyledUnderList)`
justify-content: center;
  a {
    display: block;
    color: #000;
    padding: 4px 8px;
    font-size: 16px;
  }
`

