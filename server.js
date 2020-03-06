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

//post requests
app.post('/login', (req, res) => {
  try {
    let userEmail = (req.body).token;
    loadUser(userEmail);
    res.sendStatus(200);// OK
  } catch (err) {
    res.sendStatus(400);// bad request
  }
});

app.post('/pinfo', (req, res) => {
  try {
    let itemInfo = (req.body).itemInfo;
    let user = (req.body).user;
    saveProduct(itemInfo, user);
    res.sendStatus(200);// OK
  } catch (err) {
    res.sendStatus(400);// bad request
  }
});

// start the server
server.listen(port, () => {
  console.log('Server started on:', `http://${ip.address()}:${port}`, 'or: http://localhost:8080/');
});
//server functions
function loadUser(email){
  let data = fs.readFileSync('basketData.txt', 'utf8')
  data = JSON.parse(data);
  let pos = false;
  for (let i = 0; i < data.user.length; i += 1) {
    if (data.user[i] === email) {
      pos = i;
    }
  }
  if (pos === false){
    console.log("user not found, appending to DB");
    data.user.push(email);
    data.basket.push([])
    fs.writeFileSync('basketData.txt', JSON.stringify(data));
  }
  //
}

function saveProduct(itemInfo, user){
  let data = fs.readFileSync('basketData.txt', 'utf8')
  data = JSON.parse(data);
  for (let i = 0; i < data.user.length; i += 1) {
    if (data.user[i] === user) {
      data.basket[i].push(itemInfo);
    }
  }
  fs.writeFileSync('basketData.txt', JSON.stringify(data));
}
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
      user: ['Admin'],
      basket: [[{info: 'product info', img: 'img source',}]]
    };
    fs.writeFileSync('basketData.txt', JSON.stringify((baskets)));
  }
});
