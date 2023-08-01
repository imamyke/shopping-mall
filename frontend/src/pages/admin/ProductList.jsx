import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productListAction, deleteProduct } from '../../store/actions'
import { PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Loader, BackgroundDefault } from '../../components'

const ProductList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const products = useSelector((state) => state.productList)
  const { loading, error, productList } = products
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productDelete = useSelector((state) => state.productDelete)
  const { loading : loadingDelete, success, error: errorDelete } = productDelete;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin)  {
      dispatch(productListAction())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, success])

  const columns = [
    {
      title: '产品ID',
      dataIndex: 'productID',
      key: 'productID'
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: '评价',
      dataIndex: 'rating',
      key: 'rating'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
      <>
        <button onClick={() => handleDelete(record.productID)}>删除</button> 
        <button onClick={() => navigate(`/admin/productedit/${record.productID}`)}>修改</button> 
      </>)
    }
  ];
  
  const data = productList?.map(product => (
    {
      key: product._id,
      productID: product._id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      rating: product.rating,
    }
  ))
  return (
    <BackgroundDefault title="产品列表" buttonTitle="添加产品" onClick>
      { loadingDelete && <Loader /> }
      { loading ? <Loader /> : (
        <Table 
        columns={columns} 
        dataSource={data} 
        onRow={() => {
          return {
            onClick: (e) => { console.log(e.target) }
          }
        }}
      />
      )}
    </BackgroundDefault>
    
  )
}

export default ProductList