import { Meta, OrderTemplate } from '../components'
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

const MenuList = ({ menu, border }) => (
  <StyledMenu border={border}>
    <h1 className='menu-title'>{menu.title}</h1>
    <ul>
      {menu.list.map((item, idx) => (
        <li key={idx} className='menu-item'>
          <Link to={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </StyledMenu>
)
const orderCenter = {
  title: '订单中心',
  list: [
    { link: '/myorders', name: '我的订单' },
    { link: '/', name: '评价晒单' },
  ]
}
const myWallet = {
  title: '我的钱包',
  list: [
    { link: '/', name: '优惠券' },
    { link: '/', name: '京豆' },
    { link: '/', name: '白条' },
    { link: '/', name: '红包' },
    { link: '/', name: '礼品卡' },
    { link: '/', name: '更多 >' },
  ]
}
const myFocus = {
  title: '我的关注',
  list: [
    { link: '/', name: '关注商品' },
    { link: '/', name: '关注店铺' },
  ]
}
const myActivity = {
  title: '我的活动',
  list: [
    { link: '/', name: '我的预约' },
    { link: '/', name: '我的拍卖' },
    { link: '/', name: '我的回收单' },
    { link: '/', name: '我的必购码' },
    { link: '/', name: '我的口令' },
    { link: '/', name: '更多 >' },
  ]
}
const customerService = {
  title: '客户服务',
  list: [
    { link: '/', name: '返修退换货' },
    { link: '/', name: '价格保护' },
    { link: '/', name: '我的发票' },
    { link: '/', name: '购买咨询' },
    { link: '/', name: '交易纠纷' },
    { link: '/', name: '更多 >' },
  ]
}
const business = {
  title: '订单中心',
  list: [
    { link: '/', name: '我的营业厅' },
    { link: '/', name: '京东通信' },
    { link: '/', name: '医疗服务' },
    { link: '/', name: '流量加油站' },
    { link: '/', name: '更多 >' },
  ]
}


const DefaultProfileTemplate = ({ children }) => {
  return (
    <>
      <OrderTemplate title="个人信息">
        <Row>
          <Col span={4} className='left' style={{ marginBottom: 20 }}>
            <MenuList menu={orderCenter}  />
            <MenuList menu={myWallet} />
            <MenuList menu={myFocus} />
            <MenuList menu={myActivity} />
            <MenuList menu={customerService} />
            <MenuList menu={business} border="none" />
          </Col>
          <Col className='right' span={20} style={{ padding: '20px 0 20px 20px' }}>
            { children }
          </Col>
        </Row>
      </OrderTemplate>
    </>
  )
}

export default DefaultProfileTemplate

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