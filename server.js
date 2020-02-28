// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const ip = require('ip');
var bby = require('bestbuy')('lfXY4GpC14duGk4N3uGvGD3d');

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

app.post('/search', (req, res) => {
  try {
    let search = (req.body).token;
    bby.products('search='+search,{show:'sku,name,salePrice'}).then(function(data){
      console.log(data);
      fs.writeFileSync('temp.txt', JSON.stringify(data));
    });
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
    data.basket.push(["basket:"])
    fs.writeFileSync('basketData.txt', JSON.stringify(data));
  }
  //
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
      user: ['id','Admin'],
      basket: [['product codes'],['1232232,231231123,2323442']]
    };
    fs.writeFileSync('basketData.txt', JSON.stringify((baskets)));
  }
});
