// Connect to Database
var db = require('../database/db-connector')

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  let query1 = "SELECT * FROM Memberships;";               // Define our query
  let query2 = "SELECT userID FROM Users;";

  let membershipData;
  let userIDs;

  // Query 1 will get all rows from the Memberships table
  db.pool.query(query1, function(error, rows, fields){    // Execute the query
    membershipData = rows;

    // Query 2 will get the userIDs from the Users table to dynamically populate the User ID input in Add Membership form
    db.pool.query(query2, function(error, rows, fields){
      userIDs = rows;

      // Sort the userIDs so they are in ascending order
      userIDs.sort((a, b) => a.userID - b.userID)

      // Send membership rows and userIDs to the memberships view
      res.render('memberships', {data: membershipData, userIDs: userIDs});                  // Render the index.hbs file, and also send the renderer
    })
  })    
})

router.post('/add-membership', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Memberships(userID, fee, expiration) VALUES ('${data['addUserID']}', '${data['addFee']}', '${data['addExpiration']}')`;
  db.pool.query(query1, function(error, rows, fields){

      // Check to see if there was an error
      if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.status(400).send("Insufficient Parameters, Please verify that the UserID exists in the User table.");
      }

      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/memberships');
      }
  })
})

module.exports = router;
