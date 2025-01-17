// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const getUnix = (date) => {
  const formattedDate = new Date(date);
  const unixTimestamp = formattedDate.getTime();

  return Number(unixTimestamp);
};

app.get("/api/", function (req, res) {
  const date = new Date();

  const newUnix = getUnix(date);
  const newDate = new Date(date).toUTCString();
  res.json({ unix: newUnix, utc: newDate });
});

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}

app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  if (isDateValid(date)) {
    const newUnix = getUnix(date);
    const newDate = new Date(date).toUTCString();
    res.json({ unix: newUnix, utc: newDate });
  } else if (isDateValid(new Date(parseInt(date))))
    res.json({
      unix: Number(date),
      utc: new Date(parseInt(date)).toUTCString(),
    });
  else res.json({ error: "Invalid Date" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
