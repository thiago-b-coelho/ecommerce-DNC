function connect() {
    const mysql = require('mysql2/promise');

    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    return connection;
}

module.exports = connect;