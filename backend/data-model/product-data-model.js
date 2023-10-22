const mongoose = require('mongoose')
const schemaObj = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/shopping-cart')

let productSchema = new schemaObj(
    {
        name: {type: String, require: true},
        price: {type: Number, require: true},
        description: {type: String, require: true},
        rating: {type: Number, require: true},
        quantity: {type: Number, default: 1},
        reviews: Object
    }
)

let productModel = mongoose.model("product", productSchema)

module.exports = productModel