import axios from 'axios'
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_ADMIN_PROFILE_REQUEST,
  USER_ADMIN_PROFILE_SUCCESS,
  USER_ADMIN_PROFILE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_ADMIN_DETAIL_REQUEST,
  PRODUCT_ADMIN_DETAIL_SUCCESS,
  PRODUCT_ADMIN_DETAIL_FAIL,
  PRODUCT_ADMIN_DETAIL_RESET,
} from '../types/adminConstants'
import {
  USER_DETAIL_SUCCESS
} from '../types/userConstants'

export const listUser = () => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: USER_LIST_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(
      `/api/admin/users`, config)

    // 提交給前端取用 data
    dispatch({ 
      type: USER_LIST_SUCCESS, 
      payload: data 
    })
  } catch (error) {
    dispatch({ 
      type: USER_LIST_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}
export const getUser = (id) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: USER_ADMIN_PROFILE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(
      `/api/admin/users/${id}`, config)

    // 提交給前端取用 data
    dispatch({ 
      type: USER_ADMIN_PROFILE_SUCCESS, 
      payload: data 
    })
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: USER_ADMIN_PROFILE_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: USER_DELETE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    // await axios.delete(`/api/admin/users/${id}`, config)
    await axios.delete(`/api/admin/users/${id}`, config)

    // 提交給前端取用 data
    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({ 
      type: USER_DELETE_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const editUser = (user) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: USER_EDIT_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    // await axios.delete(`/api/admin/users/${id}`, config)
    const { data } = await axios.put(`/api/admin/users/${user._id}`, user, config)
  
    dispatch({ type: USER_EDIT_SUCCESS })
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: USER_EDIT_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`/api/admin/products/${id}`, config)

    // 提交給前端取用 data
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_DELETE_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}
export const createProduct = () => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    // await axios.delete(`/api/admin/users/${id}`, config)
    const { data } = await axios.post(`/api/admin/products`, {}, config)

    // 提交給前端取用 data
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_CREATE_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    // await axios.delete(`/api/admin/users/${id}`, config)
    const { data } = await axios.put(`/api/admin/products/${product._id}`, product, config)

    // 提交給前端取用 data
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_UPDATE_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}
export const getProduct = (id) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: USER_ADMIN_PROFILE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(
      `/api/admin/products/${id}`, config)

    // 提交給前端取用 data
    dispatch({ 
      type: PRODUCT_ADMIN_DETAIL_REQUEST, 
      payload: data 
    })
    dispatch({ type: PRODUCT_ADMIN_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_ADMIN_DETAIL_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}