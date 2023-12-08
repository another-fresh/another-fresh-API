const express = require('express')
const router = express.Router()
const checkoutController = require('../controllers/checkout')

router.post('/', checkoutController.insertCheckout)
router.get('/', checkoutController.getCheckout)
router.get('/:id', checkoutController.getCheckoutById)

module.exports = router