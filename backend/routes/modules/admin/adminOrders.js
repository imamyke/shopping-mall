const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/adminController')
const { authMiddleware, admin } = require('../../../middlewares/authMiddleware')

router.get('/', authMiddleware, admin, adminController.getOrders)
// router.get('/:id', authMiddleware, admin, adminController.getUserById)
// router.put('/:id', authMiddleware, admin, adminController.updateUser)
// router.delete('/:id', authMiddleware, admin, adminController.deleteUser)


module.exports = router
