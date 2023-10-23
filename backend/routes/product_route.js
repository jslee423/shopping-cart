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

route.post('/getproductbyid', (req, res) => {
    productDataModel.findById(req.body.product_id)
    .then(product => {
        console.log("getproductbyid res: ", product)
        res.status(200).send(product)
    })
    .catch(error => {
        console.log(error)
    })
})

route.post('/getuserreview', (req, res) => {
    productDataModel.findOne({_id: req.body.product_id, 'reviews.userid': req.body.userid})
    .then(product => {
        console.log('proudctreviewbyuser: ', product)
        if (product) {
            res.status(200).send(product)
        } else {
            console.log("no review by user for this product")
        }
    })
    .catch(error => {
        console.log(error)
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
    let userReview = req.body.review

    productDataModel.findOne({_id: product_id})
    .then(res => {
        console.log("review added for product id: " + res)
        if (res) {
            const foundReview = res.reviews.filter(review => review.userid === userReview.userid)
            if (foundReview.length > 0) {
                console.log("user already reviewed product")
            } else {
                productDataModel.updateOne({_id: res._id}, {$push: {reviews: userReview}})
                .then(res => {
                    console.log("update res", res)
                    res.status(200).send(res)
                })
                .catch(error => {
                    console.log("update error", error)
                })
            }
        } else {
            console.log("product not found")
        }
    })
    .catch((error) => {
        console.log("error accessing product review db", error)
    })
})

module.exports = route