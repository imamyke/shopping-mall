const User = require('../models/user')
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
}

module.exports = adminController