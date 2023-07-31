const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'User'
  },
  accountName: {
    type: String,
    required: true,
    default: 'account_name'
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)