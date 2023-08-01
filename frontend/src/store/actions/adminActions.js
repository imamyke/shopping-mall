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
  USER_ADMIN_PROFILE_FAIL
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