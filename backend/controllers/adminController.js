const User = require('../models/user')
const Product = require('../models/product')
const Order = require('../models/order')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const adminController = {
  getUsers: asyncHandler (async (req, res) => {
    const users = await User.find({})
    res.json(users)
  }),
  getUserById: asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
    res.json(user)
  }),
  deleteUser: asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      await user.deleteOne()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }),
  updateUser: asyncHandler (async (req, res) => {
    const user = await User.findById(req.body._id)
    if (user) {
      user.name = req.body.name || user.name
      user.accountName = req.body.accountName || user.accountName
      user.phone = req.body.phone || user.phone
      user.isAdmin = req.body.isAdmin
      
      const updateUser = await user.save()
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        accountName: updateUser.accountName,
        phone: updateUser.phone,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id)
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }),
  deleteProduct: asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      product.deleteOne()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  }),
  createProduct: asyncHandler (async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      category: '分类',
      countInStock: 0,
      numReviews: 0,
      brand: '品牌',
      typeNum: '型号',
      scale: '规格',
      color: '颜色样式',
      style: '款式',
      material: '材质'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  }),
  updateProduct: asyncHandler (async (req, res) => {
    const {
      name,
      price,
      image,
      category,
      countInStock,
      brand,
      typeNum,
      scale,
      color,
      style,
      material
    } = req.body
    const product = await Product.findById(req.params.id)
    
    if (product) {
      product.name = name
      product.price = price
      product.image = image
      product.category = category
      product.countInStock = countInStock
      product.brand = brand
      product.typeNum = typeNum
      product.scale = scale
      product.color = color
      product.style = style
      product.material = material

      const updatedProduct = await product.save()
      res.status(201).json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }

  }),
  getProductById: asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
    res.json(product)
  }),
  getOrders: asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
  }),
  
}

module.exports = adminController