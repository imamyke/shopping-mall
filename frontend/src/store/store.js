import {combineReducers, legacy_createStore as createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { 
  userLoginReducer, 
  userSignupReducer, 
  userDetailReducer, 
  userUpdateProfileReducer,
  productListReducer,
  productDetailReducer,
  cartReducer,
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  orderMyListReducer
} from './reducers'

// initialState
const UserInfoStorage = JSON.parse(localStorage.getItem('userInfo')) || null
const CartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')) || []
const shippingDetailFromStorage = JSON.parse(localStorage.getItem('shippingDetail')) || {}
const paymentMethodFromStorage = JSON.parse(localStorage.getItem('paymentMethod')) || {}

const initialState = {
  userLogin: { userInfo: UserInfoStorage},
  cart: { 
    cartItems: CartItemsFromStorage,
    shippingDetail: shippingDetailFromStorage,
    paymentMethod: paymentMethodFromStorage 
  }
}

// reducer
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateProfileReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer
})

// enhancer
const middlewares = [thunk]

// store
const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store