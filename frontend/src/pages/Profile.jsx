import { Meta, DefaultProfileTemplate } from '../components'
import styled from 'styled-components'
import { Row, Col, Avatar, Carousel } from 'antd'
import { Link } from 'react-router-dom'
import { 
  UserOutlined, 
  RedEnvelopeOutlined,
  ShoppingCartOutlined, 
  CommentOutlined, 
  SafetyOutlined, 
  RightCircleOutlined,
  PhoneOutlined, 
  RocketOutlined, 
  HomeOutlined, 
  BankOutlined, 
  CreditCardOutlined, 
  VideoCameraOutlined,
  RobotOutlined, 
  ContainerOutlined, 
  GiftOutlined, 
  ProfileOutlined
} from '@ant-design/icons';

const walletList = [
  { name: '优惠券', value: '0' },
  { name: '京豆', value: '0' },
  { name: '余额', value: '0' },
  { name: '暂未开通白条', value: '0' },
  { name: '小金库昨日收益', value: '0' },
]
const orderList = [
  { name: '待付款', value: <RedEnvelopeOutlined /> },
  { name: '待收货', value: <ShoppingCartOutlined /> },
  { name: '待评价', value: <CommentOutlined /> },
  { name: '退换/售后', value: <SafetyOutlined /> },
  { name: '全部订单', value: <RightCircleOutlined /> },
]
const myFocusList = [
  { name: '商品关注', value: 0 },
  { name: '店铺关注', value: 0 },
]
const service_first = [
  { name: '话费', value: <PhoneOutlined /> },
  { name: '机票', value: <RocketOutlined /> },
  { name: '酒店', value: <HomeOutlined /> },
  { name: '企业购', value: <BankOutlined /> },
  { name: '加油卡', value: <CreditCardOutlined /> },
  { name: '电影票', value: <VideoCameraOutlined /> },
]
const service_second = [
  { name: '游戏', value: <RobotOutlined /> },
  { name: '火车票', value: <ContainerOutlined /> },
  { name: '礼品卡', value: <GiftOutlined /> },
  { name: '白条', value: <ProfileOutlined /> },
]


const Profile = () => {
  return (
    <>
      <Meta title="个人信息" />
      <DefaultProfileTemplate>
        <Row>
          <Col>
            <StyledProfile>
              <div className="profile">
                <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: 'rgb(226, 152, 148)' }} />
                <p className='user'>使用者</p>
                <Link to="/editprofile" className='edit-profile'>编辑个人信息</Link>
              </div>
            </StyledProfile>
          </Col>
          <Col className="my-wallet" style={{ flex: 1 }}>
            <StyledWallet>
              <h2>我的钱包</h2>
              <ul className='wallet-list'>
                {walletList.map(item => (
                  <li className='list-item'>
                    <p className="value">{item.value}</p>
                    <span className="name">{item.name}</span>
                  </li>
                ))}
              </ul>
            </StyledWallet>
          </Col>
        </Row>
        <Row gutter={20} style={{ marginTop: 20 }}>
          <Col span={16}>
            <StyledOrderList>
              <h2>我的订单</h2>
              <ul className='order-list'>
                {orderList.map(item => (
                  <li className='list-item'>
                    <Link to='/'>
                      <p className="value">{item.value}</p>
                      <span className="name">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </StyledOrderList>
          </Col>
          <Col span={8}>
            <StyledOrderList style={{ marginBottom: 20 }}>
              <h2>我的关注</h2>
              <ul className='order-list'>
                {myFocusList.map(item => (
                  <li className='list-item'>
                    <Link to='/'>
                      <p className="value">{item.value}</p>
                      <span className="name">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </StyledOrderList>
            <StyledOrderList >
              <h2>生活服务</h2>
              <ul className='service-list'>
                  {service_first.map(item => (
                    <li className='service-list-item'>
                      <Link to='/'>
                        <p className="value">{item.value}</p>
                        <span className="name">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                  {/* {service_second.map(item => (
                    <li className='service-list-item'>
                      <Link to='/'>
                        <p className="value">{item.value}</p>
                        <span className="name">{item.name}</span>
                      </Link>
                    </li>
                  ))} */}
              </ul>
            </StyledOrderList>
          </Col>
        </Row>
      </DefaultProfileTemplate>
    </>
  )
}

export default Profile

const StyledOrderList = styled.div`
  background: #fff;
  height: 200px;
  h2 {
    padding: 12px;
    line-height: 30px;
    font-size: 20px;
    border-bottom: 1px solid #eee;
  }
  .order-list, .service-list {
    display: flex;
    justify-content: space-around;
  }
  .list-item, .service-list-item {
    padding: 35px;
    text-align: center;
    .value {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    a {
      color: #000;
      transition: all 0.3s;
    }
    a:hover {
      color: rgb(225, 37, 27);
    }
  }
  .service-list-item {
    background: #fff;
    padding: 18px;
    text-align: center;
    width: 33.33333%;
    border-width: 0 1px 1px 0;
    border-style: solid;
    border-color: #eee;
    a {
      color: #9b8066;
    }
  }
  .service-list {
    flex-wrap: wrap;
    border-left: 1px solid #eee;
  }
`

const StyledWallet = styled.div`
  background: #fff;
  height: 200px;
  h2 {
    padding: 12px;
    line-height: 30px;
    font-size: 20px;
    border-bottom: 1px solid #aaa;
  }
  .wallet-list {
    display: flex;
  }
  .list-item {
    padding: 35px;
    text-align: center;
    .value {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
`
const StyledProfile = styled.div`
  background: #fff;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .profile {
    .user {
      margin-top: 16px;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
    }
    .edit-profile {
      font-size: 10px;
      color: #666;
    }
    .edit-profile:hover {
      color: #999;
    }
  }
`
const StyledMenu = styled.div`
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  border: ${props => props.border};
  .menu-title {
    padding-top: 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .menu-item {
    font-size: 14px;
    padding-bottom: 20px;
    a {
      color: #000;
    }
  }
`