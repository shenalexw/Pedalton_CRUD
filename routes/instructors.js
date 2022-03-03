// Connect to Database
var db = require('../database/db-connector')

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  let query1 = "SELECT * FROM Instructors;";               // Define our query
  db.pool.query(query1, function(error, rows, fields){    // Execute the query
    res.render('instructors', {data: rows});                  // Render the index.hbs file, and also send the renderer
  })    
})

router.post('/add-instructor', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Instructors(firstName, lastName, email) VALUES ('${data['addFirstName']}', '${data['addLastName']}', '${data['addEmail']}')`;
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
          res.redirect('/instructors');
      }
  })
})

module.exports = router;
