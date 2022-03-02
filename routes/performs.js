var db = require('../database/db-connector')

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  let query1 = "SELECT * FROM Performs;";               // Define our query
  db.pool.query(query1, function(error, rows, fields){    // Execute the query
    res.render('performs', {data: rows});                  // Render the index.hbs file, and also send the renderer
  })   
})

module.exports = router;
