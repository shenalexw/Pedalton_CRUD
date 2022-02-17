// Connect to Database
var db = require('./database/db-connector')

// express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// This works for statically showing our html
app.use(express.static('public'));


//Test if handlebars works
// app.get('/', function(req, res)
//     {
//         res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
//     });



// Test to see if the database is connected
// app.get('/', function(req, res)
//     {
//         // Define our queries
//         query1 = 'DROP TABLE IF EXISTS diagnostic;';
//         query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
//         query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
//         query4 = 'SELECT * FROM diagnostic;';
//
//         // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
//
//         // DROP TABLE...
//         db.pool.query(query1, function (err, results, fields){
//
//             // CREATE TABLE...
//             db.pool.query(query2, function(err, results, fields){
//
//                 // INSERT INTO...
//                 db.pool.query(query3, function(err, results, fields){
//
//                     // SELECT *...
//                     db.pool.query(query4, function(err, results, fields){
//
//                         // Send the results to the browser
//                         res.send(JSON.stringify(results));
//                     });
//                 });
//             });
//         });
//     });

app.listen(port);
