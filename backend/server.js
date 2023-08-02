const express = require('express')
const app = express()
const cors = require('cors')
const routers = require('./routes')
const path = require('path')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT || 6000

require('./config/db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use(cors())
app.use(routers)
app.use(notFound)
app.use(errorHandler)

// upload image
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT} ${__dirname} in ${process.env.NODE_ENV}`);
})