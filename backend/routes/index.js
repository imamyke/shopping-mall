const express = require('express')
const router = express.Router()
const apiGetUsers = require('./modules/apiGetUsers')
const apiGetProducts = require('./modules/apiGetProducts')
const apiGetOrders = require('./modules/apiGetOrders')

const path = require('path')

router.use('/api/users', apiGetUsers)
router.use('/api/products', apiGetProducts)
router.use('/api/orders', apiGetOrders)

module.exports = router