import axios from 'axios'
import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_DETAIL,
  CART_SAVE_PAYMENT_METHOD 
} from '../types/cartConstants'

export const addToCartAction = (id, qty) => 
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCartAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
  
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingDetailAction = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_DETAIL,
    payload: data
  })
  
  localStorage.setItem('shippingDetail', JSON.stringify(data))
}

export const savePaymentMethodsAction = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })
  
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}