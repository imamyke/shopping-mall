const express = require('express')
const router = express.Router()
const apiGetUsers = require('./modules/apiGetUsers')
const apiGetProducts = require('./modules/apiGetProducts')
const apiGetOrders = require('./modules/apiGetOrders')

const adminUsers = require('./modules/admin/adminUsers')
const adminProducts = require('./modules/admin/adminProducts')

const path = require('path')

router.use('/api/users', apiGetUsers)
router.use('/api/products', apiGetProducts)
router.use('/api/orders', apiGetOrders)
router.use('/api/admin/users', adminUsers)
router.use('/api/admin/products', adminProducts)

module.exports = router

