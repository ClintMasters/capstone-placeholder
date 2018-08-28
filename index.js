// our dependencies
var fs = require('fs');
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./localhost.key', 'utf8');
var certificate = fs.readFileSync('./localhost.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate, passphrase: '1234'};

// Create a new instance of express
const app = express();

var corsOptions = {
    origin: '*',
    credentials: true, 
  }

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(
    bodyParser.urlencoded({ extended: false }), 
    cors(corsOptions), 

);

app.post('/testPost', function (req, res) {
    const body = req.body.Body;``
    //res.set('Content-Type', 'text/plain');
    //console.log(`You sent: ${req.body.lis_person_name_full} to Express`);
    res.sendFile('test.html', {root: __dirname});
  });

// from top level path e.g. localhost:3000, this response will be sent
app.get('/', (request, response) => response.send('Hello World'));

// set the server to listen on port 3000
//app.listen(3000, () => console.log('Listening on port 3000'));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
console.log('Hello World');