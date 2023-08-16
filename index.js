const express = require('express');
const products = require('./src/routes/products');
const customers = require('./src/routes/customers');
const dotenv = require('dotenv');
const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use('/products', products);
app.use('/customers', customers);


app.get('/', (req, res) => {
    res.send('<h1>For now only "/products" route is functional</h1>')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});