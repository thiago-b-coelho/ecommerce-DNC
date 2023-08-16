const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');

router.get('/', salesController.getAll);

router.get('/:name', salesController.getOne);

router.post('/', salesController.create);

router.put('/:id', salesController.update);

router.delete('/:id', salesController.remove)

module.exports = router;