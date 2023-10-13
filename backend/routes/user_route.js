const express = require('express')
const route = express.Router()
const userDataModel = require('../data-model/user-data-model')

route.post('/signup', (req, res) => {
    const user = req.body

    userDataModel.findOne({userName: user.userName})
    .then((existingUser) => {
        if (existingUser) {
            console.log("sign in success ", existingUser);
            res.status(401).send("username already exists")
        } else {
            let newUser = new userDataModel(user)

            newUser.save().then((newUser) => {
                console.log("successful signup ", newUser);
                res.send(newUser);
            }).catch((error) => {
                console.log("error signup ", error);
                res.status(402).send("error while sign up");
            })
        }
    }).catch((error) => {
        console.log("error trying to sign up ", error);
        res.status(404).send("error while signup");
    })
})

route.post('/login', (req, res) => {
    const user = req.body
    console.log('login user', user)
    userDataModel.findOne({userName: user.userName})
    .then((existingUser) => {
        if (existingUser.password === user.password) {
            console.log("sign in success", existingUser)
            res.send(existingUser)
        } else {
            res.status(401).send("incorrect password")
        }
    })
    .catch((error) => {
        console.log("error trying to login ", error);
        res.status(404).send("user not found")
    })
})

module.exports = route;