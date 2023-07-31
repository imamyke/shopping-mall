import axios from 'axios'
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from '../types/adminConstants'

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