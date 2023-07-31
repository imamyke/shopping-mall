const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/adminController')
const { authMiddleware, admin } = require('../../../middlewares/authMiddleware')

router.get('/users', authMiddleware, admin, adminController.getUsers)


module.exports = router
