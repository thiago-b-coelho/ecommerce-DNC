const express = require('express');
const products = require('./src/routes/products');
const dotenv = require('dotenv');
const app = express();
const port = 3000;
//dotenv.config();

app.use(express.json());
app.use('/products', products);

//app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({message: err.message});
// });

app.get('/', (req, res) => {
    res.send('Hii')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});