const contactModel = require('../models/Contact')

const getAllContactController = (req, res, next) => {
    contactModel.find()
        .then(contact => {
            res.status(200).json({
                message: 'All contacts',
                contact

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

const postNewContactController = (req, res, next) => {

    const contact = new contactModel({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        comments: req.body.comments,
        date: req.body.date,
        hidden: req.body.hidden,
        meta: req.body.meta
    })
    contact.save()
        .then(data => {
            res.status(201).json({
                message: 'Data added successfully .',
                contact: data
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

const getSingleContactController = (req, res, next) => {
    let id = req.params.id
    contactModel.findById(id)
        .then(contact => {
            res.status(200).json({
                contact

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

const updateContactController = (req, res, next) => {
    let id = req.params.id
    let contactData = {
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        comments: req.body.comments,
        date: req.body.date,
        hidden: req.body.hidden,
        meta: req.body.meta
    }
    contactModel.findByIdAndUpdate(id, { $set: contactData })
        .then(contact => {
            contactModel.findById(id)
                .then(contact => {
                    res.status(200).json({
                        message: 'Data update successfully .',
                        contact
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: 'Error occured',
                        error: err
                    })
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

const deleteContactController = (req, res, next) => {
    let id = req.params.id
    contactModel.findByIdAndRemove(id)
        .then(contact => {
            res.status(200).json({
                message: 'Data delete successfully .',
                contact

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
    getAllContactController,
    postNewContactController,
    getSingleContactController,
    updateContactController,
    deleteContactController
}