import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_RESET,
  USER_ADMIN_PROFILE_REQUEST,
  USER_ADMIN_PROFILE_SUCCESS,
  USER_ADMIN_PROFILE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET
} from '../types/adminConstants'

export const userListReducer = (
  state = { users: [] }, 
  action
  ) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false , users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}
export const userDeleteReducer = (
  state = {}, 
  action
  ) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userEditReducer = (
  state = { user: {} }, 
  action
  ) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { loading: true }
    case USER_EDIT_SUCCESS:
      return { loading: false, success: true }
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload }
    case USER_EDIT_RESET:
      return { user: {} }
    default:
      return state
  }
}
export const userAdminProfileReducer = (
  state = { user: {} }, 
  action
  ) => {
  switch (action.type) {
    case USER_ADMIN_PROFILE_REQUEST:
      return { ...state, loading: true }
    case USER_ADMIN_PROFILE_SUCCESS:
      return { loading: false , user: action.payload }
    case USER_ADMIN_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (
  state = {}, 
  action
  ) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true, productList: [] }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    
    default:
      return state
  }
}