const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// This works for statically showing our html
app.use(express.static('public')); 


app.listen(port);