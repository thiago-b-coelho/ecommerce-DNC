const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getOne);

router.post('/', productsController.create);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.remove)

module.exports = router;