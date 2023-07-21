const mysql = require("mysql2");

const createConnection = password => mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees",
    password: password
});

