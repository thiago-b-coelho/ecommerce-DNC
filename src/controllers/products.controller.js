const errorMessages = require('../functions/errorMessages');
const products = require('../services/products.service');

async function getAll(req, res) {
    try {
        res.json(await products.getProducts());
    } catch (error) {
        return errorMessages(res, error);
    }
}

async function getOne(req, res) {
    try {
        return res.status(200).json(await products.getProductById(req.params.id));
    } catch (error) {
        return errorMessages(res, error);
    }
}

async function create(req, res) {
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
}

async function update(req, res) {
    try {
        res.json(await products.updateProduct(req.params.id, req.body));
    } catch (error) {
        return errorMessages(res, error);
    }
}

async function remove(req, res) {
    try {
        res.json(await products.deleteProduct(req.params.id));
    } catch (error) {
        return errorMessages(res, error);
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}