const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const adminController = {
  getUsers: asyncHandler (async (req, res) => {
    const users = await User.find({})
    res.json(users)
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
}

module.exports = adminController