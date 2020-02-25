// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const ip = require('ip');

// constants
const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

app.use(express.static(`${__dirname}/public`));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  try {
    const data = fs.readFileSync('basketData.txt', 'utf8')

    let userEmail = (req.body).token;
    console.log(userEmail);
    //fs.writeFileSync('basketData.txt', JSON.stringify(req.body));
    res.sendStatus(200);// OK
    //console.log(JSON.stringify(req.body));
  } catch (err) {
    res.sendStatus(400);// bad request
  }
});

// start the server
server.listen(port, () => {
  console.log('Server started on:', `http://${ip.address()}:${port}`, 'or: http://localhost:8080/');
});

//create files with default values if none exists
fs.exists('users.txt', function(exists) {
  if (!exists) {
    const admin = {
      username: ['admin'],
      password: ['12345']
    };
    fs.writeFileSync('users.txt', JSON.stringify(admin));
  }
});

fs.exists('basketData.txt', function(exists) {
  if (!exists) {
    const baskets = {
      user: ['id'],
      basket: ['data']
    };
    fs.writeFileSync('basketData.txt', JSON.stringify((baskets)));
  }
});
