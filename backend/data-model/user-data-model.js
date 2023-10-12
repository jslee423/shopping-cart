const mongooseObj = require("mongoose")
const schemaObj = mongooseObj.Schema

mongooseObj.connect("mongodb://127.0.0.1/shopping-cart")

let userSchema = new schemaObj(
    {
        userName: {type: String, require: true},
        password: {type: String, require: true},
        address: String,
        mobile: Number
    }
)

let UserModel = mongooseObj.model("user", userSchema)

module.exports = UserModel