const mongoose = require('mongoose')
const schemaObj = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/shopping-cart')

let orderSchema = new schemaObj(
    {
        userid: {type: String, required: true},
        order: {type: Object, required: true},
        dateTime: {type: Date, default: Date.now},
        status: {type: String, default: "PROCESSING"}
    }
)

let orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel