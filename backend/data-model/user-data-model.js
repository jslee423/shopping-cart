const mongoose = require("mongoose")
const schemaObj = mongoose.Schema

mongoose.connect("mongodb://127.0.0.1/shopping-cart")

let userSchema = new schemaObj(
    {
        userName: {type: String, require: true},
        password: {type: String, require: true},
        address: String,
        mobile: Number
    }
)

let userModel = mongoose.model("user", userSchema)

module.exports = userModel