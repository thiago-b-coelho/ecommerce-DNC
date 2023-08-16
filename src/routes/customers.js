const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers.controller');

router.get('/', customersController.getAll);

router.get('/:id', customersController.getOne);

router.post('/', customersController.create);

router.put('/:id', customersController.update);

router.delete('/:id', customersController.remove)

module.exports = router;