// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Define endpoint for fcc challenge
app.get("/api/:date", function (req, res) {
  let dateStr = req.params.date
  let date;
  if (dateStr.match(/^[0-9]+$/)) {
    date = new Date(parseInt(req.params.date))
  } else {
    date = new Date(dateStr)
  }

  if (date == 'Invalid Date') {
    res.json({"error": "Invalid Date"})
  }

  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

// Empty API calls should return the current date
app.get("/api", function (req, res) {
  let date = new Date()

  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
