const db = require('../../config/db')
const users = require('../../data/users')
const products = require('../../data/products')
const User = require('../user')
const Product = require('../product')
const Order = require('../order')

db.once('open', async () => {
  try {
    await Order.deleteMany() // 要先刪訂單，不然先刪其他會讓資料庫變不完整
    await Product.deleteMany()
    await User.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = await createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)
    console.log('done.')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
})
