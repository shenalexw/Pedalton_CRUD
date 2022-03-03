// Connect to Database
var db = require('../database/db-connector')

const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();

router.get("/", (req, res) => {
  let query1 = "SELECT * FROM Videos;";               // Define our query
  db.pool.query(query1, function(error, rows, fields){    // Execute the query
      res.render('videos', {data: rows});                  // Render the index.hbs file, and also send the renderer
  })  
})

router.post('/add-video', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let instructorID = "";
  if (data['addInstructorID'] !== undefined){
    instructorID = data['addInstructorID'];
  }

  // Create the query and run it on the database
  query1 = `INSERT INTO Videos(instructorID, name, description, type, difficulty, duration) VALUES (NULLIF('${instructorID}', ''), '${data['addName']}', '${data['addDescription']}', '${data['addType']}', '${data['addDifficulty']}', '${data['addDuration']}')`;
  db.pool.query(query1, function(error, rows, fields){

      // Check to see if there was an error
      if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.status(400).send("Insufficient Parameters, Please verify that the InstructorID exists in the User table.");
      }

      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/videos');
      }
  })
})

module.exports = router;
