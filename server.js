var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.env.PORT || 5000;
console.log('server starting on port ' + port);
connect().use(serveStatic(__dirname)).listen(port);
