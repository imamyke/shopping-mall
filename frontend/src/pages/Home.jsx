import styled from 'styled-components'
import { Row, Col, Avatar } from 'antd';
import { ProductCard, Loader, DefaultTemplate, ProductCarousel } from '../components'
import { productListAction } from "../store/actions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Meta } from "../components";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { homeLeftMenu } from '../assets/data/homeLeftMenu'
import { 
  UserOutlined, 
  PhoneOutlined,
  RocketOutlined,
  HomeOutlined,
  BankOutlined,
  CreditCardOutlined, 
  VideoCameraOutlined, 
  RobotOutlined, 
  GiftOutlined, 
  ProfileOutlined,
  ContainerOutlined
} from '@ant-design/icons';

const StyledMenu = styled.div`
  line-height: 28px;
  background: #fff;
  .menu-item {
    padding-left: 20px;
    font-size: 14px;
    &:hover {
      background: #eee;
    }
    a {
      color: #000;
      &:hover {
        color: rgb(225, 37, 27);
      }
    }
  }
`    
const MenuList = () => {
  const menu = homeLeftMenu.map((list, idx) => (
    <li key={idx} className='menu-item'>
      {list.map((item, idx) => (
        <>
          <Link key={idx}>
            {item}
          </Link>
          {idx < (list.length - 1) && '/'}
        </>
      ))}
    </li>
  ))
  return (
    <StyledMenu>
      <ul style={{ padding: '10px 0' }}>{menu}</ul>
    </StyledMenu>
  )
}

const Home = () => {
  const dispatch = useDispatch()
  const results = useSelector(state => state.productList)
  const { loading, productList } = results
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userDetail = useSelector(state => state.userDetail)
  const { loading: loadingUserDetail, user } = userDetail
  // 搜尋
  const { keyword } = useParams()
  
  useEffect(() => {
    dispatch(productListAction(keyword))
  },[dispatch, keyword])

  const service = [
    { name: '企业购', value: <BankOutlined /> },
    { name: '礼品卡', value: <GiftOutlined /> },
    { name: '话费', value: <PhoneOutlined /> },
    { name: '白条', value: <ProfileOutlined /> },
    { name: '加油卡', value: <CreditCardOutlined /> },
    { name: '火车票', value: <ContainerOutlined /> },
    { name: '游戏', value: <RobotOutlined /> },
    { name: '机票', value: <RocketOutlined /> },
    { name: '电影票', value: <VideoCameraOutlined /> },
    { name: '白条', value: <ProfileOutlined /> },
    { name: '加油卡', value: <CreditCardOutlined /> },
    { name: '火车票', value: <ContainerOutlined /> },
  ]

const StyledIconMenuList = styled.div`
  height: 200px;
  margin-bottom: 20px;
  .service-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .service-list-item {
    text-align: center;
    padding: 8px 0;
    width: 33.33333%;
    .value {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    a {
      color: #000;
      transition: all 0.3s;
      &:hover {
        color: rgb(225, 37, 27);
      }
    }
  }
`
const StyledRightMenu = styled.div`
  justify-content: space-between;
  background: #fff;
  height: 524px;
  padding: 0 10px;
  .label-container {
    margin-top: 74px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .label {
      color: #e1251b;
      padding: 0 4px;
      background-color: rgba(225,37,27,.08);
      margin-right: 6px;
    }
    .label-text {
      color: #666;
    }
  }
  .profile {
    text-align: center;
    padding: 10px 20px;
  }
  .open-plus {
    padding: 14px 20px;
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: url(https://img14.360buyimg.com/imagetools/jfs/t1/126879/14/34669/13509/647e95f7F96b1044c/d218475ab4638a25.png);
    .title {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: bold;
      color: #663300;
    }
    .coupon {
      font-size: 10px;
      margin-bottom: 8px;
      color: #A88100;
    }
    button {
      cursor: pointer;
      display: block;
      border: 0;
      padding: 4px 40px;
      border-radius: 10px;
      color: #fff;
      background: linear-gradient(180deg,#1452CC,#003399);
    }
    
  }
`
  return (
    <>
      <Meta />
      <DefaultTemplate>
        { loading && <Loader /> }
        { !keyword && (
          <Row gutter={12} style={{ marginBottom: 20 }}>
            <Col span={4} style={{ marginTop: 20 }}>
              <MenuList />
            </Col>
            <Col span={16} style={{ marginTop: 20 }}>
              <ProductCarousel />
            </Col>
            <Col span={4} style={{ marginTop: 20 }}>
              <StyledRightMenu>
                <div className="profile">
                  <Avatar size={42} icon={<UserOutlined />} style={{ marginBottom: 6, backgroundColor: 'rgb(226, 152, 148)' }} />
                  <p style={{ marginBottom: 6 }}>Hi，{userInfo ? user.name : '您好'}</p>
                  <Link style={{  color: '#333' }}>退出</Link>
                </div>
                <div className='open-plus'>
                  <p className='title'>开通PLUS预计可省￥1274</p>
                  <p className='coupon'>10倍返京豆 | 5张运费券</p>
                  <button>立即开通</button>
                </div>
                <StyledIconMenuList>
                  <ul className='service-list'>
                    {service.map(item => (
                      <li className='service-list-item'>
                        <Link to='/'>
                          <p className="value">{item.value}</p>
                          <span className="name">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </StyledIconMenuList>
                <div className='label-container' >
                  <span className='label'>资讯</span>
                  <Link className='label-text'>文强：我国工业绿色发展取得七个方面重大成就</Link>
                </div>
              </StyledRightMenu>
            </Col>
          </Row>
        )}

        <div style={{ width: '1250px' }}>
          <Row gutter={12} justify="start">
            {productList?.map(product => (
              <Col span={4} key={product._id} style={{ marginBottom: '10px' }}>
                <ProductCard 
                  url={`/product/${product._id}`}
                  image={product.image} 
                  name={product.name}
                  price={product.price}
                />
              </Col>
            ))}
          </Row>
        </div>
      </DefaultTemplate>
    </>
  )
}

export default Home

