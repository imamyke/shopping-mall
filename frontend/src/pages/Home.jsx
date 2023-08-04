import styled from 'styled-components'
import { Row, Col, Avatar } from 'antd';
import { ProductCard, Loader, DefaultTemplate, ProductCarousel } from '../components'
import { productListAction } from "../store/actions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Meta } from "../components";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { homeLeftMenu } from '../assets/data/homeLeftMenu'
import { logout } from '../store/actions'
import { 
  UserOutlined, 
  PhoneOutlined,
  RocketOutlined,
  BankOutlined,
  CreditCardOutlined, 
  VideoCameraOutlined, 
  RobotOutlined, 
  GiftOutlined, 
  ProfileOutlined,
  ContainerOutlined
} from '@ant-design/icons';
const service = [
  { name: '企业购', icon: <BankOutlined />, color: '#5aaae5' },
  { name: '礼品卡', icon: <GiftOutlined />, color: '#f2a234' },
  { name: '话费', icon: <PhoneOutlined />, color: '#5aaae5' },
  { name: '白条', icon: <ProfileOutlined />, color: '#fd625d' },
  { name: '加油卡', icon: <CreditCardOutlined />, color: '#41d7c7' },
  { name: '火车票', icon: <ContainerOutlined />, color: '#fd625d' },
  { name: '游戏', icon: <RobotOutlined />, color: '#f2a234' },
  { name: '机票', icon: <RocketOutlined />, color: '#5aaae5' },
  { name: '电影票', icon: <VideoCameraOutlined />, color: '#f2a234' },
  { name: '白条', icon: <ProfileOutlined />, color: '#fd625d' },
  { name: '加油卡', icon: <CreditCardOutlined />, color: '#f9544e' },
  { name: '火车票', icon: <ContainerOutlined />, color: '#41d7c7' },
]
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
  const primaryCards = [
    { image: 'https://img11.360buyimg.com/babel/s580x740_jfs/t1/158508/36/30610/43629/6424fd45F620bb591/811388c560f59787.jpg!cc_290x370.avif',},
    { image: 'https://img20.360buyimg.com/babel/s580x740_jfs/t1/61765/22/23208/26498/6398130dEf8997877/f09f3f45f4cf89c8.png!cc_290x370.avif',},
  ]
  useEffect(() => {
    dispatch(productListAction(keyword))
  },[dispatch, keyword])
  const handleLogout = async () => {
    dispatch(logout())
  }

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
                  <p style={{ marginBottom: 6 }}>Hi，{userInfo ? userInfo.name : '您好'}</p>
                  <button className='logout-btn' onClick={() => handleLogout()}>退出</button>
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
                          <StyledIcon color={item.color}>{item.icon}</StyledIcon>
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
        <StyledChannel>
          <div className='channel-title-container'>
            <div className="channel-icon"></div>
            <h1 className='channel-title'>频道广场</h1>          
            <div className="channel-icon"></div>          
          </div>
          <Row gutter={10}>
            <Col span={6}>
              <Row style={{ flexDirection: 'column' }}>
                <Col style={{ marginBottom: 10 }}>
                  <ChannelPrimaryCard card={primaryCards[0]} />
                </Col>
                <Col>
                  <ChannelSecondaryCard card={secondaryCards[0]} />
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Row gutter={12} style={{ flexDirection: 'column' }}>
                <Col style={{ marginBottom: 10 }}>
                  <ChannelPrimaryCard card={primaryCards[1]}  />
                </Col>
                <Col>
                  <ChannelSecondaryCard card={secondaryCards[1]} />
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Row gutter={12} style={{ flexDirection: 'column' }}>
                <Col style={{ marginBottom: 10 }}>
                  <ChannelSecondaryCard card={secondaryCards[2]} />
                </Col>
                <Col style={{ marginBottom: 10 }}>
                  <ChannelSecondaryCard card={secondaryCards[3]} />
                </Col>
                <Col>
                  <ChannelSecondaryCard card={secondaryCards[4]} />
                </Col>
              </Row>
            </Col>
            <Col span={6}>
            <Row gutter={12} style={{ flexDirection: 'column' }}>
              <Col style={{ marginBottom: 10 }}>
                <ChannelSecondaryCard card={secondaryCards[5]} />
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <ChannelSecondaryCard card={secondaryCards[6]} />
              </Col>
              <Col>
                <ChannelSecondaryCard card={secondaryCards[7]} />
              </Col>
            </Row>
            </Col>
          </Row>
          <Row></Row>
        </StyledChannel>
        <StyledChannel>
          <div className='channel-title-container'>
            <div className="channel-icon"></div>
            <h1 className='channel-title'>为你推荐</h1>          
            <div className="channel-icon"></div>          
          </div>
        </StyledChannel>
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

const ChannelPrimaryCard = ({ card }) => {
  return (
    <div>
      <Link>
        <img 
          src={card.image} 
          alt={card.image}
          width="100%"
          height="66.666666%"
          style={{ objectFit: 'cover' }}
          />
      </Link>
    </div>
  )
}
const secondaryCards = [
  { 
    title: '京东图书', 
    text: '专注优质好书',
    images: [
      'https://img14.360buyimg.com/img/s200x200_jfs/t1/138978/32/37598/96844/64c0f2b1F4fa82f40/08d882958e61a593.jpg!cc_100x100.avif',
      'https://img30.360buyimg.com/img/s200x200_jfs/t1/168307/14/17466/163218/60719f42E238b678b/9323fb9c57701e07.jpg!cc_100x100.avif'
    ]
  },
  { 
    title: '京东五金城', 
    text: '工业品一站式采购',
    images: [
      'https://img20.360buyimg.com/img/s200x200_jfs/t1/181337/7/15347/54580/60f90b6cEe9fac4c4/2042f6735826b6e3.jpg!cc_100x100.avif',
      'https://img12.360buyimg.com/img/s200x200_jfs/t1/118117/23/39470/69716/64635020F221fbd5c/3c23c328d77e33b4.jpg!cc_100x100.avif'
    ]
  },
  { 
    title: '生鲜馆', 
    text: '尝遍天下鲜',
    images: [
      'https://img12.360buyimg.com/img/s200x200_jfs/t1/210178/9/37941/96885/64ae44d0F2ae0e18a/44b6ac9381b34f05.jpg!cc_100x100.avif',
      'https://img11.360buyimg.com/img/s200x200_jfs/t1/44204/1/18950/76233/63070c9cEc7dcd979/8ff426e04ee478b6.jpg!cc_100x100.avif'
    ]
  },
  { 
    title: '家用电器', 
    text: '买家电 上京东',
    images: [
      'https://img14.360buyimg.com/img/s200x200_jfs/t1/162835/21/39422/104091/64c74dbdF0c368700/baff93c5f203c4f9.jpg!cc_100x100.avif',
      'https://img30.360buyimg.com/img/s200x200_jfs/t1/133495/24/34952/117672/64c8f525Fb2ecf65a/edeacfc856f578c5.jpg!cc_100x100.avif'
    ]
  },
  { 
    title: '拍拍二手', 
    text: '大牌1元抢',
    images: [
      'https://img12.360buyimg.com/img/s200x200_jfs/t1/132423/19/11570/85912/5f7c02faEc94e78cc/9019924011bff0ed.jpg!cc_100x100.avif',
      'https://img14.360buyimg.com/img/s200x200_jfs/t1/214471/18/34750/78211/64cc5d49F4c0e3c29/df321dfb6bc5e302.jpg!cc_100x100.avif'
    ]
  },
  { 
    title: '京东工品购', 
    text: 'PLUS专享福利',
    images: [
      'https://img13.360buyimg.com/img/s200x200_jfs/t1/134642/26/18518/52063/5fc9b144E2591a1f6/25a07f68d4d40570.jpg!cc_100x100.avif',
      'https://img30.360buyimg.com/img/s200x200_jfs/t1/148019/16/31175/46177/6427f251F4bd8fe24/231cbf08d0e9117a.jpg!cc_100x100.avif'
    ]
  },
  { 
    title: '京东酒行', 
    text: '享全球美酒品美好生活',
    images: [
      'https://img13.360buyimg.com/img/s200x200_jfs/t1/11002/16/2281/66103/5c1230caE14b4f44a/907912009e57d077.jpg!cc_100x100.avif',
      'https://img20.360buyimg.com/img/s200x200_jfs/t1/77109/33/24543/145481/6479b306Fed636b54/f418f945a95816dd.jpg!cc_100x100.avif'
    ]
  },
  { 
    title: '京东手机', 
    text: '一个极客的诞生',
    images: [
      'https://img13.360buyimg.com/img/s200x200_jfs/t1/92199/4/35860/60423/64c79260Fe9164def/74957e35440723e9.jpg!cc_100x100.avif',
      'https://img11.360buyimg.com/img/s200x200_jfs/t1/171996/24/36048/59764/6492a752F3f245ad3/14f9a80a187bb7ba.jpg!cc_100x100.avif'
    ]
  }
]
const ChannelSecondaryCard = ({ card }) => {
  return (
    <StyledSecondaryCard>
      <Row className='card'>
        <Col>
          <Row className='title-container'>
            <h1>{card.title}</h1>
            <p>{card.text}</p>
          </Row>
        </Col>
        <Col>
          <Row gutter={30}>
            <Col span={12}>
              <img 
                src={card.images[0]} 
                alt={card.images[0]}
                width="100%"
                style={{ objectFit: 'cover' }}
                />
            </Col>
            <Col span={12}>
              <img 
                src={card.images[1]} 
                alt={card.images[1]}
                width="100%"
                style={{ objectFit: 'cover' }}
                />
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledSecondaryCard>
  )
}

const StyledSecondaryCard = styled.div`
  padding: 20px; 
  background: #fff; 
  .card {
    justify-content: center;
    align-items: center;
  }
  .title-container {
    margin-bottom: 10px;
    justify-content: center;
    align-items: end;
    h1 {
      font-size: 20px;
      font-weight: bold;
    }
    p {
      color: #aaa;
      margin-left: 4px;
      font-size: 12px;
      font-weight: bold;
    }
  }
`

const StyledChannel = styled.div`
  margin-bottom: 20px;
  .channel-title-container, 
  .channel-title,
  .channel-icon {
    line-height: 45px;
  }
  .channel-title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .channel-title {
    font-size: 28px;
    color: #333;
    font-weight: bold;
  }
  .channel-icon {
    margin: 0 22px;
    width: 25px;
    height: 20px;
    background-size: cover;
    background-image: url('	https://storage.360buyimg.com/channel2022/jd_home/0.0.28/assets/sprite/floor_hd/sprite-retina2x.png');
  }
`

const StyledIcon = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 6px;
  color: ${props => props.color};
`

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
  }
  a {
      color: #000;
      transition: all 0.3s;
      &:hover {
        color: rgb(225, 37, 27);
      }
    }
`
const StyledRightMenu = styled.div`
  justify-content: space-between;
  background: #fff;
  height: 524px;
  padding: 0 10px;
  .logout-btn {
    color: #333;
    border: 0;
    background: 0;
    cursor: pointer;
  }
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
    padding: 14px 10px;
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
      font-size: 12px;
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