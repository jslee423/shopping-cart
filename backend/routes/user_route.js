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

route.post('/getuserbyid', (req, res) => {
    const userid = req.body.userid
    userDataModel.findOne({_id: userid})
    .then((existingUser) => {
        if (existingUser) {
            res.status(200).send(existingUser)
        } else {
            res.status(400).send("user not found")
        }
    })
    .catch(error => {
        res.status(404).send("error connecting to db")
    })
})

route.post('/addnotification', (req, res) => {
    let userid = req.body.userid
    let notification = req.body.notification

    userDataModel.findOne({_id: userid})
    .then(existingUser => {
        if (existingUser) {
            //user found
            userDataModel.updateOne({_id: userid}, {$push: {notifications: notification}})
            .then(response => {
                console.log("notification added", response)
                res.status(200).send(response)
            })
            .catch(error => {
                console.log("error adding notification", error)
            })
        } else {
            console.log("no user found")
        }
    })
    .catch(error => {
        console.log("error accessing user db", error)
    })
})

route.post('/removenotification', (req, res) => {
    let userid = req.body.userid
    let activity = req.body.activity

    userDataModel.findOne({_id: userid})
    .then(existingUser => {
        if (existingUser) {
            //user found
            userDataModel.updateOne({_id: userid}, {$pull: {notifications: {activity: activity}}})
            .then(response => {
                console.log("notification removed", response)
                res.send(response)
            })
            .catch(error => {
                console.log("error removing notification", error)
            })
        } else {
            console.log("no user found")
        }
    })
    .catch(error => {
        console.log("error accessing user db", error)
    })
})

route.post('/getnotifications', (req, res) => {
    userDataModel.findOne({_id: req.body.userid})
    .then(existingUser => {
        if (existingUser) {
            // res.status(200).send(existingUser.notifications)
            res.status(200).send(existingUser)
        } else {
            console.log("no review by user for this product")
        }
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = route;