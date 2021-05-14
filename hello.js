const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/partners-directory-staging.ip.akeneo.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/partners-directory-staging.ip.akeneo.com/fullchain.pem')
};

const hostname = 'partners-directory-staging.ip.akeneo.com';
const port = 3000;

const server = https.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});

