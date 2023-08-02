const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/adminController')
const { authMiddleware, admin } = require('../../../middlewares/authMiddleware')

router.get('/', authMiddleware, admin, adminController.getOrders)

// 修改運送狀態
router.put('/:id/deliver', authMiddleware, admin, adminController.updateOrderToDelivered)
router.put('/:id/pay', authMiddleware, admin, adminController.updateOrderToPaid)

// 修改付款狀態
// router.get('/:id', authMiddleware, admin, adminController.getUserById)
// router.delete('/:id', authMiddleware, admin, adminController.deleteUser)


module.exports = router
