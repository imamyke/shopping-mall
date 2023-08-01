const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/adminController')
const { authMiddleware, admin } = require('../../../middlewares/authMiddleware')

router.get('/users', authMiddleware, admin, adminController.getUsers)
router.get('/users/:id', authMiddleware, admin, adminController.getUserById)
router.put('/users/:id', authMiddleware, admin, adminController.updateUser)
router.delete('/users/:id', authMiddleware, admin, adminController.deleteUser)

module.exports = router
