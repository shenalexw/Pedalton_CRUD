var db = require('../database/db-connector')

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  let query1 = "SELECT * FROM Performs;";               // Define our query
  db.pool.query(query1, function(error, rows, fields){    // Execute the query
    res.render('performs', {data: rows});                  // Render the index.hbs file, and also send the renderer
  })   
})

router.post('/add-perform', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let timeCompleted = "";
  if (data['timeCompleted'] !== undefined){
    instructorID = data['timeCompleted'];
  }

  // Create the query and run it on the database
  query1 = `INSERT INTO Performs(userID, videoID, completed, bookmarked, timeCompleted) VALUES ('${data['addUserID']}', '${data['addVideoID']}', '${data['addCompleted']}', '${data['addBookmarked']}', NULLIF('${timeCompleted}', ''))`;
  db.pool.query(query1, function(error, rows, fields){

      // Check to see if there was an error
      if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.status(400).send("Insufficient Parameters, Please verify that the userID and the videoID can be found in their respected tables.");
      }

      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/performs');
      }
  })
})
module.exports = router;
