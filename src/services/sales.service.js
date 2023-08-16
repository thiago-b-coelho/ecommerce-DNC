const errorMessages = require('../functions/errorMessages');
const connect = require('./db.service');
const { updateInventoryByName } = require('./inventory.service');

    async function getSales() {
        const db = await connect();
        const get_all_sales = `
        SELECT 
            c.name as 'Nome', 
            s.sale_id as 'Venda',
            p.name as 'Produto',
            p.price as 'Preço',
            o.quantity as 'Quantidade',
            p.price * o.quantity  as 'Preço total'
        FROM 
            customers c 
        INNER JOIN 
            sales s 
        ON 
            c.customer_id = s.customer_id
        LEFT JOIN 
            orders o 
        ON
            s.sale_id = o.sale_id
        LEFT JOIN 
            products p 
        ON
            o.product_id = p.product_id;
        `;

        const [sales] = await db.query(get_all_sales);

        return sales;
    }

    async function getSalesByCustomer(customer_name) {
        const db = await connect();
        const get_sales_by_customer_name = `
        SELECT 
            c.name as 'Nome', 
            s.sale_id as 'Venda',
            p.name as 'Produto',
            p.price as 'Preço',
            o.quantity as 'Quantidade',
            p.price * o.quantity  as 'Preço total'
        FROM 
            customers c 
        INNER JOIN 
            sales s 
        ON 
            c.customer_id = s.customer_id
        LEFT JOIN 
            orders o 
        ON
            s.sale_id = o.sale_id
        LEFT JOIN 
            products p 
        ON
            o.product_id = p.product_id
        WHERE
            c.name = '${customer_name}';
        `;

        const [sales] = await db.query(get_sales_by_customer_name);

        if(!sales){
            throw new Error('Sale not found.');
        }
        return sales;
    }

    async function addSale(sale_data){
        const db = await connect();

        try{
            for (const p in sale_data.product){
                await updateInventoryByName(p, sale_data.product[p]);
            }
        } catch (error){
            return String(error);
        }

        const update_sales_table = `
        INSERT INTO 
            sales (customer_id, total_value) 
        VALUES 
            ((SELECT customer_id FROM customers c WHERE name = '${sale_data.name}'),0);
        `;

        const result = await db.query(update_sales_table);

        for (const p in sale_data.product){
            let add_orders_by_products = `
            INSERT INTO
                orders (sale_id, product_id, quantity)
            VALUES
                (${result[0].insertId},
                (SELECT product_id from products p WHERE p.name = '${p}'),
                ${sale_data.product[p]});
            `;
            await db.query(add_orders_by_products);
        }

        const update_total_value = `
        UPDATE 
            sales s
        SET 
            s.total_value = (
                SELECT 
                    SUM(p.price * o.quantity)
                FROM 
                    orders o
                JOIN 
                    products p 
                ON 
                    o.product_id = p.product_id
                WHERE 
                    o.sale_id = s.sale_id
                )
        WHERE  
            s.sale_id 
            IN (
                SELECT DISTINCT 
                    o.sale_id
                FROM 
                    orders AS o
                WHERE 
                    s.customer_id = (SELECT c.customer_id FROM customers c WHERE c.name = '${sale_data.name}')
            );
        `;
        try {
            await db.query(update_total_value);
        } catch(error){
            return String(error)
        }

        return `Sale to ${sale_data.name} successfully completed!`;
    }

    async function updateSale(customer_id, customer_data) {
        return `NOT FUNCTIONAL YET!`;
    }

    async function deleteSale(sale_id) {
        return 'NOT FUNCTIONAL YET!'
    }


module.exports = {
    getSales,
    getSalesByCustomer,
    addSale,
    updateSale,
    deleteSale
}