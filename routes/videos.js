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

      let columnNames;
      // Generate array of column names and change duration to duration (seconds)
      if (videoData.length > 0) {
        columnNames = Object.keys(videoData[0])
        columnNames[6] = 'duration (seconds)'
      }

      res.render('videos', {data: videoData, instructorIDs, columnNames});                  // Render the index.hbs file, and also send the renderer
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

router.post('/update-video', function(req, res){
  let data = req.body
  let updateQuery;

  // If body included a deleteEntry property, build the appropriate SQL query, otherwise redirect back to /performs
  if (data.updateInstructorID && data.updateVideoID) {
    updateQuery = `UPDATE Videos SET instructorID=${data.updateInstructorID === 'remove' ? 'NULL' : data.updateInstructorID} WHERE videoID='${data.updateVideoID}';`
  } else {
    console.log("updateVideoID and updateInstructorID must be provided.")
    res.status(400).send()
  }

  db.pool.query(updateQuery, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.status(400).send()
    }
    else {
      // If there was no error, we redirect back
      res.redirect("/videos")
    }
  });
})

module.exports = router;
