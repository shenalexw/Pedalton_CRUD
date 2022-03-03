// Citation for the seconds-to-time converter
// Date: 3/3/22
// Adapted from:
// https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript

// Connect to Database
var db = require('../database/db-connector')

const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();

router.get("/", (req, res) => {
  let query1 = "SELECT * FROM Videos;";               // Define our query
  let query2 = "SELECT instructorID FROM Instructors;";

  let videoData;
  let instructorIDs;

  // Query 1 will get all of the rows from the Videos table
  db.pool.query(query1, function(error, rows, fields){    // Execute the query
    videoData = rows;

    // Query 2 will get the instructorIDs from the Instructors table to dynamically populate the Instructor ID input in Add Video form
    db.pool.query(query2, function(error, rows, fields){
      instructorIDs = rows;

      // Sort the instructorIDs so they are in ascending order
      instructorIDs.sort((a, b) => a.instructorID - b.instructorID)

      res.render('videos', {data: videoData, instructorIDs: instructorIDs});                  // Render the index.hbs file, and also send the renderer
    })
  })  
})

router.post('/add-video', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let instructorID = "";
  if (data['addInstructorID'] !== undefined){
    instructorID = data['addInstructorID'];
  }

  // Converts user-inputted seconds into a time string (hh:mm:ss)
  const convertedDuration = new Date(data['addDuration'] * 1000).toISOString().slice(11, 19);

  // Create the query and run it on the database
  query1 = `INSERT INTO Videos(instructorID, name, description, type, difficulty, duration) VALUES (NULLIF('${instructorID}', ''), '${data['addName']}', '${data['addDescription']}', '${data['addType']}', '${data['addDifficulty']}', '${convertedDuration}')`;
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
