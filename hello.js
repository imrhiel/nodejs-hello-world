var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, 'http://partners-directory-staging.ip.akeneo.com');
console.log('Server running at http://partners-directory-staging.ip.akeneo.com:8080/');
