const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact')

router.get('/', contactController.getAllContactController)

router.post('/', contactController.postNewContactController)

router.get('/:id', contactController.getSingleContactController)

router.put('/:id', contactController.updateContactController)

router.delete('/:id', contactController.deleteContactController)

module.exports = router