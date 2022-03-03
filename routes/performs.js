var db = require("../database/db-connector");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let query1 = "SELECT * FROM Performs;"; // Define our query
    let query2 = "SELECT userID FROM Users;";
    let query3 = "SELECT videoID FROM Videos;";

    let performsData;
    let userIDs;
    let videoIDs;
    
    // Query 1 will get all rows from Performs
    db.pool.query(query1, function (error, rows, fields) {
        performsData = rows;

        // Query2 will get all userIDs from Users
        db.pool.query(query2, function (error, rows, fields) {
            userIDs = rows;

            // Query 3 will get all videoIDs from Videos
            db.pool.query(query3, function (error, rows, fields) {
                videoIDs = rows;

                // Sort the userIDs and videoIDs so they are in ascending order
                userIDs.sort((a, b) => a.userID - b.userID)
                videoIDs.sort((a, b) => a.videoID - b.videoID)

                // Execute the query
                res.render("performs", { data: performsData, userIDs, videoIDs }); // Render the index.hbs file, and also send the renderer
            });
        });
    });
});

router.post("/add-perform", function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let timeCompleted = "";
    if (data["addTimeCompleted"] !== undefined) {
        timeCompleted = data["addTimeCompleted"];
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Performs(userID, videoID, completed, bookmarked, timeCompleted) VALUES ('${data["addUserID"]}', '${data["addVideoID"]}', '${data["addCompleted"]}', '${data["addBookmarked"]}', NULLIF('${timeCompleted}', ''))`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).send(
                "Insufficient Parameters, Please verify that the userID and the videoID can be found in their respected tables."
            );
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect("/performs");
        }
    });
});
module.exports = router;
