import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,  
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../types/userConstants'
import axios from 'axios'

export const login = (phone, verifyCode) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = {
      headers: { 'Content-type': 'application/json' }
    }
    
    const { data } = await axios.post(
      '/api/users/login', 
      { phone, verifyCode }, config)

    dispatch({ 
      type: USER_LOGIN_SUCCESS, 
      payload: data 
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ 
      type: USER_LOGIN_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const signup = (phone, verifyCode) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST })
    const config = {
      headers: { 'Content-type': 'application/json' }
    }
    
    const { data } = await axios.post(
      '/api/users/signup', 
      { phone, verifyCode }, config)

    dispatch({ 
      type: USER_SIGNUP_SUCCESS, 
      payload: data 
    })
    dispatch({ 
      type: USER_LOGIN_SUCCESS, 
      payload: data 
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ 
      type: USER_SIGNUP_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/login'
}

export const getUserDetail = (id) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: USER_DETAIL_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(
      `/api/users/${id}`, config)

    // 提交給前端取用 data
    dispatch({ 
      type: USER_DETAIL_SUCCESS, 
      payload: data 
    })
  } catch (error) {
    dispatch({ 
      type: USER_DETAIL_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    // 從 store 取出 user 的 token
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    // 向 後端請求 user 的 data
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(
      `/api/users/profile`,
      user, 
      config)

    // 提交給前端取用 data
    dispatch({ 
      type: USER_UPDATE_PROFILE_SUCCESS, 
      payload: data 
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ 
      type: USER_UPDATE_PROFILE_FAIL, 
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.response
    })
  }
}
