const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/adminController')
const { authMiddleware, admin } = require('../../../middlewares/authMiddleware')

router.post('/', authMiddleware, admin, adminController.createProduct)
router.put('/:id', authMiddleware, admin, adminController.updateProduct)
router.delete('/:id', authMiddleware, admin, adminController.deleteProduct)

module.exports = router
