const connect = require('./db.service');
const { deleteInventory, updateInventory, addInventory } = require('./inventory.service');

    async function getProducts() {
        const db = await connect();
        const get_all_products = `SELECT * FROM products;`;

        const [products] = await db.query(get_all_products);

        return products;
    }

    async function getProductById(product_id) {
        const db = await connect();
        const get_product_by_id = `
        SELECT 
            * 
        FROM 
            products p 
        WHERE 
            p.product_id = ${product_id};
        `;

        const [[products]] = await db.query(get_product_by_id);

        if(!products){
            throw new Error('Product not found.');
        }
        return products;
    }

    async function addProduct(product_data){
        const db = await connect();

        const add_one_product = `
        INSERT INTO 
            products (name, description, price) 
        VALUES 
            ('${product_data.name}', '${product_data.description}', ${product_data.price});
        `;

        await db.query(add_one_product);

        // const query2 = `
        // INSERT INTO 
        //     product_inventory (product_id, available_quantity) 
        // VALUES 
        //     ((SELECT product_id from products p WHERE p.name = '${product_data.name}'), ${product_data.quantity});
        // `;

        // await db.query(query2);

        await addInventory(product_data.name, product_data.quantity);
        
        return `${product_data.name} successfully inserted in database!`;
    }

    async function updateProduct(product_id, product_data) {
        const db = await connect();
        
        let update = '';

        for (const attribute in product_data){
            update = `${update} ${attribute} = '${product_data[attribute]}'`;
        }

        const update_one_product = `
        UPDATE
            products
        SET 
            ${update}
        WHERE
            product_id = ${product_id};
        `

        await db.query(update_one_product);

        return `Product successfully updated in database!`;
    }

    async function deleteProduct(product_id) {
        const db = await connect();

        await deleteInventory(product_id);

        const delete_one_product = `
        DELETE FROM
            products p
        WHERE
            p.product_id = ${product_id};
        `
        const [result] = await db.query(delete_one_product);

        if(!result.affectedRows){
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