var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/etc/letsencrypt/partners-directory-staging.ip.akeneo.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/partners-directory-staging.ip.akeneo.com/fullchain.pem')
};

var hostname = 'partners-directory-staging.ip.akeneo.com';
var port = 3000;

var server = function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
};

https.createServer(options, server).listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});


