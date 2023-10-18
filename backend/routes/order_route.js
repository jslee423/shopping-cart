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

route.post("/cancelorder", (req, res) => {
    console.log("cancelorder body", req.body)
    orderDataModel.findOneAndUpdate({userid: req.body.userid, _id: req.body.orderid}, {status: "CANCELLED", cancelDate: req.body.cancelDate})
    .then((order) => {
        res.json(order)
    })
    .catch((error) => {
        res.send("error cancelling order" + error)
    })
})

module.exports = route