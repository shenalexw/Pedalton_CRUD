// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

//access dotenv
require("dotenv").config()
const host = process.env.HOST;
const user = process.env.USERNAME;
const password = process.env.PASSWORD;

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    user: user,
    password: password,
    database: user
})

// Export it for use in our applicaiton
module.exports.pool = pool;
