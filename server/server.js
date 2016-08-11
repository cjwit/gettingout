// process.env requires PORT and DBURL
var express = require('express');
var path = require('path');
var compress = require('compression');

var app = express();

app.use(compress());
app.use(express.static(path.join(__dirname, "../app/dist")));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

// listen
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("   Listening on port ", port, "...");
});
