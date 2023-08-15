const express = require('express');
const router = express.Router();
const ProductClass = require('../services/products');
const errorMessages = require('../functions/errorMessages');

const products = new ProductClass;

router.get('/', async function (req, res, next) {
    try {
        res.json(await products.getProducts());
    } catch (error) {
        return errorMessages(res, error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.status(200).json(await products.getProductById(req.params.id));
    } catch (error) {
        return errorMessages(res, error);
    }
});

router.post('/', async function (req, res, next) {

    const requiredFields = ['name', 'description', 'price', 'quantity'];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        const missingFieldsMessage = missingFields.map(field => `'${field}'`).join(', ');
        return res.status(400).json({
            message: `Missing required fields: ${missingFieldsMessage}`
        });
    }

    try {
        res.json(await products.addProduct(req.body));
    } catch (error) {
        return errorMessages(res, error);
    }
});

module.exports = router;