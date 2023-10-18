const express = require('express')
const route = express.Router()
let orderDataModel = require('../data-model/order-data-model')

route.post("/saveuserorder", (req, res) => {
    console.log("saveorder req.body: ", req.body)
    const orderObj = new orderDataModel(req.body)

    orderObj.save().then((data) => {
        res.json(data)
    }).catch((error) => {
        res.send("error processing order: " + error)
    })
})

route.post("/getuserorders", (req, res) => {
    console.log("getuser body", req.body)
    orderDataModel.find({userid: req.body.userid, status: req.body.status})
    .then((orders) => {
        res.json(orders)
    })
    .catch((error) => {
        res.send("Error occurred " + error)
    })
})

module.exports = route