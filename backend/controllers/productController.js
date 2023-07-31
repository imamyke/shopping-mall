const Product = require('../models/product')
const asyncHandler = require('express-async-handler')

const productController = {
  getProducts: asyncHandler (async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  }),
  getProductById: asyncHandler (async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    if (product) {
      return res.json(product)
    } else {
      throw new Error('Product not found')
    }
  })
}

module.exports = productController