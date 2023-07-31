const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const userController = {
  authUser: asyncHandler (async (req, res) => {
    const { phone, verifyCode } = req.body
    if (verifyCode !== 123456) {
      res.status(401)
      throw new Error(`无效的验证码${verifyCode}`)
    }
    const user = await User.findOne({ phone })
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        accountName: user.accountName,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('无效的手机号')
    }
  }),
  signupUser: asyncHandler (async (req, res) => {
    const { phone, verifyCode } = req.body
    if (verifyCode !== 123456) {
      res.status(401)
      throw new Error(`无效的验证码${verifyCode}`)
    }
    
    const userExist = await User.findOne({ phone })
    
    if (userExist) {
      res.status(400)
      throw new Error('此手機號已經被註冊')
    }
    const user = await User.create({ phone })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        accountName: user.accountName,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }),
  getVerifyCode: asyncHandler (async (req, res) => {
    const { phone } = req.body
    
    if (phone) {
      res.status(201).json({
        code: 123456,
        data: {},
        message: 'success',
        success: true
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }),
  getUserProfile: asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        accountName: user.accountName,
        phone: user.phone,
        isAdmin: user.isAdmin
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }),
  updateUserProfile: asyncHandler (async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (user) {
      user.name = req.body.name || user.name
      user.accountName = req.body.accountName || user.accountName
      user.phone = req.body.phone || user.phone
      
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

module.exports = userController