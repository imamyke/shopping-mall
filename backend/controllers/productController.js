const Product = require('../models/product')
const asyncHandler = require('express-async-handler')

const productController = {
  getProducts: asyncHandler (async (req, res) => {
    const keyword = req.query.keyword 
      ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      } : {}
    const products = await Product.find({ ...keyword })
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
  }),
  createProductReview: asyncHandler (async (req, res) => {
    const {
      rating,
      comment
    } = req.body
    const product = await Product.findById(req.params.id)
    
    if (product) {
      const alreadyReviewed = product.reviews.find((review) => {
        review.user.toString() === req.user._id.toString()
      })

      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating = 
        product.reviews.reduce((acc, item) => item.rating + acc, 0) / 
        product.reviews.length

      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  }),
}

module.exports = productController