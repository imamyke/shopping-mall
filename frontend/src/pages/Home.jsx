import styled from 'styled-components'
import { Row, Col } from 'antd';
import { ProductCard, Loader, DefaultTemplate } from '../components'
import { productListAction } from "../store/actions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Meta } from "../components";
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch()
  const results = useSelector(state => state.productList)
  const { loading, productList } = results
  
  // 搜尋
  const { keyword } = useParams()
  console.log(keyword);
  
  
  useEffect(() => {
    dispatch(productListAction(keyword))
  },[dispatch, keyword])
  return (
    <>
      <Meta />
      <DefaultTemplate>
        { loading && <Loader /> }
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
      </DefaultTemplate>
    </>
  )
}

export default Home