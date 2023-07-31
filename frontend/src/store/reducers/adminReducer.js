import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
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