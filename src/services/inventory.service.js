const connect = require('./db.service');

async function addInventory(product_name, quantity){
    const db = await connect();

    const add_to_inventory = `
        INSERT INTO 
            product_inventory (product_id, available_quantity) 
        VALUES 
            ((SELECT product_id from products p WHERE p.name = '${product_name}'), ${quantity});
    `;

    await db.query(add_to_inventory);

    return `Product successfully added to inventory!`
}

async function updateInventory(product_id, quantity) {
    const db = await connect();

    const update_inventory_by_id = `
    UPDATE
        product_inventory
    SET 
        available_quantity = ${quantity}
    WHERE
        product_id = ${product_id};
    `

    await db.query(update_inventory_by_id);

    return `Inventory successfully updated in database!`;
}

async function updateInventoryByName(product_name, quantity) {
    const db = await connect();

    const update_inventory_by_name = `
    UPDATE
        product_inventory pin
    LEFT JOIN
        products p
    ON
        pin.product_id = p.product_id 
    SET 
        pin.available_quantity = pin.available_quantity - ${quantity}
    WHERE
        p.name = '${product_name}';
    `

    try{
        const [result, ] = await db.query(update_inventory_by_name);
    } catch (error){
        throw new Error('Not enough products in the inventory!')
    }

    return `Inventory successfully updated in database!`;
}

async function deleteInventory(product_id) {
    const db = await connect();

    const delete_from_inventory = `
    DELETE FROM
        product_inventory
    WHERE
        product_id = ${product_id};
    `
    const [result, ] = await db.query(delete_from_inventory);

    if(!result.affectedRows){
        throw new Error('Inventory not found.');
    }

    return `Inventory successfully deleted from database!`
}

module.exports = {
    addInventory,
    updateInventory,
    updateInventoryByName,
    deleteInventory
}