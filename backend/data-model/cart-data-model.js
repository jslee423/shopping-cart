const mongoose = require('mongoose')
const schemaObj = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/shopping-cart')

let cartSchema = new schemaObj(
    {
        userid: {type: String, required: true},
        cart: Object
    }
)

let cartModel = mongoose.model("cart", cartSchema)

module.exports = cartModel