// Connect to Database
var db = require('../database/db-connector')

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  const userID = req.query.userID;

  // If userID not present in query string, return to /users
  if (!userID) {
    res.redirect("/users")
    return
  }

  let query = `SELECT * FROM Users WHERE userID=${userID};`;// Define our query

  db.pool.query(query, function(error, rows, fields){    // Execute the query
    if (error){
        console.log(error)
        res.status(400).send()
    } else {
        res.render('update-user', {userData: rows[0]}); 
    }
  })  
})

router.post('/', function(req, res){
    let { userID, updateFirstName, updateLastName, updateEmail } = req.body
    let updateQuery;

    // If body includes required properties, build the query
    if (userID && updateFirstName && updateLastName && updateEmail) {
      updateQuery = `UPDATE Users SET firstName='${updateFirstName}', lastName='${updateLastName}', email='${updateEmail}' WHERE userID='${userID}';`
    } else {
      console.log("userID, updateFirstName, updateLastName, and updateEmail properties must be provided.")
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
        // If there was no error, we redirect back to users
        res.redirect("/users")
      }
    });
})

module.exports = router;
