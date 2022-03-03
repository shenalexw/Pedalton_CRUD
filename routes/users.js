// Connect to Database
var db = require('../database/db-connector')

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  const nameFilter = req.query.nameFilter;
  let query = "SELECT * FROM Users;";// Define our query
  let initialRows;
  // remember the object for the entire list.
  db.pool.query(query, function(error, rows, fields){    // Execute the query
    initialRows = rows;
  })

  // If the nameFilter is not blank or undefined then query for the specific name.
  if (nameFilter != "" && nameFilter !== undefined){
    query = "SELECT * FROM Users WHERE firstName = '"+nameFilter+"';";
  }           
  db.pool.query(query, function(error, rows, fields){    // Execute the query
      res.render('users', {data: rows, initialData: initialRows});                  // Render the index.hbs file, and also send the renderer
  })  
})

router.post('/add-user', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Users(firstName, lastName, email) VALUES ('${data['addFirstName']}', '${data['addLastName']}', '${data['addEmail']}')`;
  db.pool.query(query1, function(error, rows, fields){

      // Check to see if there was an error
      if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.status(400).send("Insufficient Parameters, Please verify that the email has not already been used.");
      }

      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/users');
      }
  })
})

module.exports = router;
