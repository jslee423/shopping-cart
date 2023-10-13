const express = require('express')
const app = express()
const cors = require('cors')

const userRoute = require('./routes/user_route')
const userApp = express()
const productRoute = require('./routes/product_route')
const productApp = express()
const cartRoute = require('./routes/cart_route')
const cartApp = express()

console.log('in server.js')

app.use(cors())

app.use(express.json({ limit: '2mb', extended: false }))

app.use('/user', userApp)
userApp.use('/', userRoute)

app.use('/product', productApp)
productApp.use('/', productRoute)

app.use('/cart', cartApp)
cartApp.use('/', cartRoute)

app.get('*', (req, res) => {
    res.status(404).send("API not found")
})

console.log("listening on port 9000")
app.listen(9000)