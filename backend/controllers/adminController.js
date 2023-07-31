const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const adminController = {
  getUsers: asyncHandler (async (req, res) => {
    const users = await User.find({})
    res.json(users)
  }),
}

module.exports = adminController