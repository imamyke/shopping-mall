const express = require('express')
const router = express.Router()
const productController = require('../../controllers/productController')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.post('/:id/reviews', authMiddleware, productController.createProductReview)

module.exports = router
