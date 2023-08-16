const express = require('express');
const router = express.Router();
const products = require('../services/products.service');
const productsController = require('../controllers/products.controller')
const errorMessages = require('../functions/errorMessages');
const dotenv = require('dotenv');
dotenv.config();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getOne);

router.post('/', productsController.create);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.remove)

module.exports = router;