const express = require('express');
const moment = require('moment');

var port = process.env.PORT || 8080;

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/:timestamp', function(req, res) {
  let d = new Date(req.params.timestamp);
  let d_utc;
  if (isNaN(d.getTime())) {
    d_utc = new Date(Number(req.params.timestamp) * 1000);
  } else {
    d_utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  }
  const out = {
    "unix": null,
    "natural": null
  };
  if (!(isNaN(d_utc.getTime()))) {
    out.unix = Math.round(d_utc.getTime()/1000);
    out.natural = moment(d_utc).format('MMMM D, YYYY');
  }
  res.end(JSON.stringify(out));
});

app.listen(port, function() {
  console.log('app is running on port', port);
});
