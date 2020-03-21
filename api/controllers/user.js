const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            const user = new userModel({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(data => {
                    res.status(200).json({
                        message: 'user added successfully',
                        user: data
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: 'Error occured',
                        error: err
                    })
                })
        }
    })
        
}

const loginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    userModel.findOne({email})
        .then(data => {
            if (data) {
                bcrypt.compare(password, data.password, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: 'Error occure'
                        })
                    } if (result) {
                        const token = jsonwebtoken.sign({ email: data.email, _id: data._id }, 'SECRET', { expiresIn: '2h' })
                        res.status(200).json({
                            message: 'Login Successful',
                            token
                        })
                    } else {
                        res.status(500).json({
                            message: 'Password or email invalid'
                        })
                    }

                })
            } else {
                res.status(500).json({
                    message: 'Invalid User'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occured',
                error: err
            })
        })
}
const getAllUserController = (req, res, next) => {
    userModel.find()
        .then(data => {
            res.status(200).json({
                message: 'All user',
                user: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occured',
                error: err
            })
        })
        
}




module.exports = {
    registerController,
    loginController,
    getAllUserController
}