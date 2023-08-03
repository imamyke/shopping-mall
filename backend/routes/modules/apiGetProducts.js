const express = require('express')
const router = express.Router()
const productController = require('../../controllers/productController')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.get('/', productController.getProducts)
router.get('/top', productController.getTopRatedProducts)

// 動態路由擺下面
router.get('/:id', productController.getProductById)
router.post('/:id/reviews', authMiddleware, productController.createProductReview)

module.exports = router
