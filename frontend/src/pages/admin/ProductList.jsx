import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productListAction, deleteProduct, createProduct } from '../../store/actions'
import { Table } from 'antd';
import { Loader, BackgroundDefault, Meta } from '../../components'

const ProductList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const products = useSelector((state) => state.productList)
  const { loading, error, productList } = products
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const productDelete = useSelector((state) => state.productDelete)
  const { loading : loadingDelete, success: successDelete, error: errorDelete } = productDelete;
  
  const productCreate = useSelector((state) => state.productCreate)
  const { 
    loading : loadingCreate, 
    success: successCreate, 
    product: productCreated
  } = productCreate;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  }
  const handleCreate = () => {
    dispatch(createProduct())
  }
  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin)  {
      navigate('/login')
    } 
    dispatch(productListAction())
  }, [dispatch, navigate, userInfo, successCreate, productCreated, successDelete])

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
      title: '库存量',
      dataIndex: 'countInStock',
      key: 'countInStock'
    },
    {
      title: '型号',
      dataIndex: 'typeNum',
      key: 'typeNum'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
      <>
        <StyledButton onClick={() => handleDelete(record.productID)}>删除</StyledButton> 
        <StyledButton onClick={() => navigate(`/admin/products/${record.productID}/edit`)}>修改</StyledButton> 
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
      countInStock: product.countInStock,
      typeNum: product.typeNum,
    }
  ))
  return (
    <>
      <Meta title="产品管理" />
      <BackgroundDefault title="产品列表" buttonTitle="添加产品" onClick={handleCreate}>
        { loadingDelete && <Loader /> }
        { loadingCreate && <Loader /> }
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
    </>
    
  )
}

export default ProductList

const StyledButton = styled.button`
  border: 0;
  padding: 4px 8px;
  background: #eee;
  cursor: pointer;
  margin-right: 8px;
  background: #184670;
  color: #fff;
  transition: all 0.3s;
  &:hover {
    background: #1d568c;
  }
`