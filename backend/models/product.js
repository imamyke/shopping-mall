const mongoose = require('mongoose');
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
}, { timestamps: true })

const productSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  sale: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  brand: {
    type: String,
    required: true,
  },
  typeNum: {
    type: String,
    required: true,
  },
  scale: {
    type: String,
  },
  color: {
    type: String,
  },
  style: {
    type: String,
  },
  material:{
    type: String,
  },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)