const { json } = require('express');
const connect = require('./db.service');

    async function getProducts() {
        const db = await connect();
        const query = `SELECT * FROM products;`;

        const [products] = await db.query(query);

        return products;
    }

    async function getProductById(product_id) {
        const db = await connect();
        const query = `
        SELECT 
            * 
        FROM 
            products p 
        WHERE 
            p.product_id = ${product_id};
        `;

        const [[products]] = await db.query(query);

        if(!products){
            throw new Error('Product not found.');
        }
        return products;
    }

    async function addProduct(product_data){
        const db = await connect();

        const query = `
        INSERT INTO 
            products (name, description, price) 
        VALUES 
            ('${product_data.name}', '${product_data.description}', ${product_data.price});
        `;

        await db.query(query);

        const query2 = `
        INSERT INTO 
            product_inventory (product_id, available_quantity) 
        VALUES 
            ((SELECT product_id from products p WHERE p.name = '${product_data.name}'), ${product_data.quantity});
        `;

        await db.query(query2);
        
        return `${product_data.name} successfully inserted in database!`;
    }

    async function updateProduct(product_id, product_data) {
        const db = await connect();
        
        let update = '';

        for (const attribute in product_data){
            update = `${update} ${attribute} = '${product_data[attribute]}'`;
        }

        const query = `
        UPDATE
            products
        SET 
            ${update}
        WHERE
            product_id = ${product_id};
        `

        await db.query(query);

        return `Product successfully updated in database!`;
    }

    async function deleteProduct(product_id) {
        const db = await connect();

        const query1 = `
        DELETE FROM
            product_inventory pin
        WHERE
            pin.product_id = ${product_id};
        `
        const result1 = await db.query(query1);

        if(!result1.affectedRows){
            throw new Error('Product not found on inventory.');
        }

        const query2 = `
        DELETE FROM
            products p
        WHERE
            p.product_id = ${product_id};
        `
        const result2 = await db.query(query2);

        if(!result2.affectedRows){
            throw new Error('Product not found.');
        }

        return `Product successfully deleted from database!`
    }


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}