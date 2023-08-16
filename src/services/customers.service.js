const connect = require('./db.service');

    async function getCustomers() {
        const db = await connect();
        const get_all_customers = `SELECT * FROM customers;`;

        const [customers] = await db.query(get_all_customers);

        return customers;
    }

    async function getCustomerById(customer_id) {
        const db = await connect();
        const get_customer_by_id = `
        SELECT 
            * 
        FROM 
            customers c 
        WHERE 
            c.customer_id = ${customer_id};
        `;

        const [[customers]] = await db.query(get_customer_by_id);

        if(!customers){
            throw new Error('Customer not found.');
        }
        return customers;
    }

    async function addCustomer(customer_data){
        const db = await connect();

        const add_one_customer = `
        INSERT INTO 
            customers (name, email, address, phone_number) 
        VALUES 
            ('${customer_data.name}', '${customer_data.email}', '${customer_data.address}', '${customer_data.phone_number}');
        `;

        await db.query(add_one_customer);
        
        return `${customer_data.name} successfully inserted in database!`;
    }

    async function updateCustomer(customer_id, customer_data) {
        const db = await connect();
        
        let update = '';

        for (const attribute in customer_data){
            update = `${update} ${attribute} = '${customer_data[attribute]}'`;
        }

        const update_one_customer = `
        UPDATE
            customers
        SET 
            ${update}
        WHERE
            customer_id = ${customer_id};
        `

        await db.query(update_one_customer);

        return `Customer successfully updated in database!`;
    }

    async function deleteCustomer(customer_id) {
        const db = await connect();

        const delete_one_customer = `
        DELETE FROM
            customers c
        WHERE
            c.customer_id = ${customer_id};
        `
        const [result, ] = await db.query(delete_one_customer);

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