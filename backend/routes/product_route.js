const express = require('express')
const route = express.Router()
let productDataModel = require('../data-model/product-data-model')

route.get('/getproducts', (req, res) => {
    productDataModel.find()
    .then((allProducts) => {
        res.send(allProducts)
    })
    .catch((error) => {
        res.send("error while fetching products")
    })
})

route.post('/addproduct', (req, res) => {
    let product = req.body
    console.log(product)

    productDataModel.findOne({name: product.name})
    .then((existingProduct) => {
        if (existingProduct) {
            console.log("existing product found ", existingProduct)
            // res.send(existingProduct)
            res.status(401).send("product already exists")
        } else {
            let newProduct = new productDataModel(product)

            newProduct.save().then((newProduct) => {
                console.log("successful added product", newProduct)
                res.send(newProduct)
            }).catch((error) => {
                console.log("error adding product", error)
                // res.send("error while adding product")
                res.status(401).send("error while adding product");
            })
        }
    })
    .catch((error) => {
        console.log("error accessing product db ", error)
        res.status(404).send("error accessing product db")
    })
})

route.post('/addreview', (req, res) => {
    let product_id = req.body.product_id
    let review = req.body.review

    // productDataModel.findByIdAndUpdate({product_id}, {$push: {reviews: review}})
    productDataModel.findOne({id: product_id})
    .then(res => {
        console.log("review added for product id: " + res)
    })
    .catch((error) => {
        console.log("error adding review", error)
    })
})

module.exports = route