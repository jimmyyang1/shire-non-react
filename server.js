var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/storm', function (req, res) {
    res.redirect('https://docs.google.com/forms/d/1fptj2N4_Mbyx-Ef2_LSDUdEMjlfZIJhRcly6BcsYmv0/viewform');
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
console.log('Listening on port ', port);
app.listen(port);

