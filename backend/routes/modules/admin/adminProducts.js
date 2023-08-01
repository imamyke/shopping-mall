const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/adminController')
const { authMiddleware, admin } = require('../../../middlewares/authMiddleware')

// router.get('/products', authMiddleware, admin, adminController.getproducts)
// router.get('/products/:id', authMiddleware, admin, adminController.getUserById)
// router.put('/products/:id', authMiddleware, admin, adminController.updateUser)
router.delete('/:id', authMiddleware, admin, adminController.deleteProduct)

module.exports = router
