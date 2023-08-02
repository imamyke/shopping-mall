const Order = require('../models/order')
const asyncHandler = require('express-async-handler')

const orderController = {
  addOrderItems: asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingDetail,
      paymentMethod,
      totalPrice
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingDetail,
        paymentMethod,
        totalPrice
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
    }
  }),
  addOrderItemById: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name phone')
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not Found')
    }
  }),
  updateOrderToPay: asyncHandler(async (req, res) => { // 沒有設線上支付，待修改
    const order = await Order.findById(req.params.id)
    const { id, status, update_time, email_address } = req.body
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id,
        status,
        update_time,
        email_address
      }
      const updateOrder = await order.save()
      res.json(updateOrder)
    } else {
      res.status(404)
      throw new Error('Order not Found')
    }
  }),
  getMyOrders: asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  }),
  
}

module.exports = orderController