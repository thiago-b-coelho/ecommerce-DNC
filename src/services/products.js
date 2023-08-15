const connect = require('./db');
const dotenv = require('dotenv');
dotenv.config();

class Products {
    async getProducts() {
        const db = await connect();
        const query = `SELECT * FROM products;`;

        const [products] = await db.query(query);

        return products;
    }

    async getProductById(productId) {
        const db = await connect();
        const query = `
        SELECT 
            * 
        FROM 
            products p 
        WHERE 
            p.product_id = ${productId};`;

        const [[products]] = await db.query(query);

        if(!products){
            throw new Error('Product not found.');
        }
        return products;
    }

    async addProduct(productData){
        const db = await connect();

        const query = `
        INSERT INTO 
            products (name, description, price) 
        VALUES 
            ('${productData.name}', '${productData.description}', ${productData.price});`;

        await db.query(query);

        const query2 = 
        `INSERT INTO 
            product_inventory (product_id, available_quantity) 
        VALUES 
            ((SELECT product_id from products p WHERE p.name = '${productData.name}'), ${productData.quantity});`;

        await db.query(query2);
        
        return `${productData.name} successfully inserted in database!`;
    }
}

module.exports = Products;