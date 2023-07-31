const express = require('express')
const router = express.Router()
const apiGetUsers = require('./modules/apiGetUsers')
const apiGetProducts = require('./modules/apiGetProducts')
const apiGetOrders = require('./modules/apiGetOrders')

const adminUsers = require('./modules/admin/adminUsers')

const path = require('path')

router.use('/api/users', apiGetUsers)
router.use('/api/products', apiGetProducts)
router.use('/api/orders', apiGetOrders)
router.use('/api/admin', adminUsers)

module.exports = router