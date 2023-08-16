const connect = require('./db.service');

    async function getCustomers() {
        const db = await connect();
        const query = `SELECT * FROM customers;`;

        const [customers] = await db.query(query);

        return customers;
    }

    async function getCustomerById(customer_id) {
        const db = await connect();
        const query = `
        SELECT 
            * 
        FROM 
            customers c 
        WHERE 
            c.customer_id = ${customer_id};
        `;

        const [[customers]] = await db.query(query);

        if(!customers){
            throw new Error('Customer not found.');
        }
        return customers;
    }

    async function addCustomer(customer_data){
        const db = await connect();

        const query = `
        INSERT INTO 
            customers (name, email, address, phone_number) 
        VALUES 
            ('${customer_data.name}', '${customer_data.email}', '${customer_data.address}', '${customer_data.phone_number}');
        `;

        await db.query(query);
        
        return `${customer_data.name} successfully inserted in database!`;
    }

    async function updateCustomer(customer_id, customer_data) {
        const db = await connect();
        
        let update = '';

        for (const attribute in customer_data){
            update = `${update} ${attribute} = '${customer_data[attribute]}'`;
        }

        const query = `
        UPDATE
            customers
        SET 
            ${update}
        WHERE
            customer_id = ${customer_id};
        `

        await db.query(query);

        return `Customer successfully updated in database!`;
    }

    async function deleteCustomer(customer_id) {
        const db = await connect();

        const query = `
        DELETE FROM
            customers c
        WHERE
            c.customer_id = ${customer_id};
        `
        const result = await db.query(query);

        if(!result.affectedRows){
            throw new Error('Customer not found.');
        }

        return `Customer successfully deleted from database!`
    }


module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
}