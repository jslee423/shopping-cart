const express = require('express')
const route = express.Router()
let cartDataModel = require('../data-model/cart-data-model')

route.post("/saveusercart", (req, res) => {
    cartDataModel.findOne({userid: req.body.userid})
    .then((cartDbObj) => {
        if (!cartDbObj) {
            console.log("No cart items present, adding/inserting")
            let cartObj = new cartDataModel(req.body)

            cartObj.save().then((data) => {
                res.json(data)
            }).catch((error) => {
                res.send("error occurred " + error)
            })
        } else {
            console.log("cart items present, replacing/updating")
            cartDbObj.cart = req.body.cart

            cartDbObj.save().then((data) => {
                setTimeout(() => {
                    res.json(data)
                }, 3000)
            }).catch((error) => {
                res.send("error occurred " + error)
            })
        }
    })
    .catch((error) => {
        console.log("got an error", error)
        res.send("error while fetching cart")
    })
})

route.post("/getusercart", (req, res) => {
    cartDataModel.findOne({userid: req.body.userid})
    .then((cart) => {
        res.json(cart)
    })
    .catch((error) => {
        res.send("Error occurred " + error)
    })
})

module.exports = route