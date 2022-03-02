// Connect to Database
var db = require('./database/db-connector')

// express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// // This works for statically showing our html
// app.use(express.static('public'));

// Routers
const userRouter = require('./routes/users')
const instructorRouter = require('./routes/instructors')
const membershipRouter = require('./routes/memberships')
const performRouter = require('./routes/performs')
const videoRouter = require('./routes/videos')

// Load the homepage
app.get('/', function(req, res)
{
  res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});

// Use routes
app.use('/users', userRouter)
app.use('/instructors', instructorRouter)
app.use('/memberships', membershipRouter)
app.use('/performs', performRouter)
app.use('/videos', videoRouter)

app.listen(port);
