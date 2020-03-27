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

//post requests - Alex
app.post('/register', (req, res) => {
  try {
    let userEmail = (req.body).email;
    let userPass = (req.body).password;
    newUser(userEmail,userPass);//add new user
    res.sendStatus(200);// OK
  } catch (err) {
    res.sendStatus(400);// bad request
  }
});

app.post('/glogin', (req, res) => {
  try {
    let userEmail = (req.body).token;
    loadUser(userEmail);//Add user to basket file
    res.sendStatus(200);// OK
  } catch (err) {
    res.sendStatus(400);// bad request
  }
});

app.post('/pinfo', (req, res) => {
  try {
    let itemInfo = (req.body).itemInfo;
    let user = (req.body).user;
    saveProduct(itemInfo, user);//Save product to basket file
    res.sendStatus(200);// OK
  } catch (err) {
    res.sendStatus(400);// bad request
  }
});

app.post('/deleteInfo', (req, res) => {
  try {
    let itemInfo = (req.body).itemInfo;
    let user = (req.body).user;
    deleteProduct(itemInfo, user);//Remove product from basket file
    res.sendStatus(200);// OK
  } catch (err) {
    console.log(err);
    res.sendStatus(400);// bad request
  }
});

// start the server
server.listen(port, () => {
  console.log('Server started on:', `http://${ip.address()}:${port}`, 'or: http://localhost:8080/');
});

//server functions

//Add new user to files
function newUser(email,password){
  let basket = JSON.parse(fs.readFileSync('basketData.txt', 'utf8'));
  let users = JSON.parse(fs.readFileSync('users.txt', 'utf8'));
  //Add user to basket file
  basket.user.push(email);
  basket.basket.push([]);
  fs.writeFileSync('basketData.txt', JSON.stringify(basket));
  //Add user to user's file
  users.username.push(email);
  users.password.push(password);
  fs.writeFileSync('users.txt', JSON.stringify(users));
}

//Check if user already exists, if not add to file
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

//remove product from basket file
function deleteProduct(itemInfo, user){
  let data = fs.readFileSync('basketData.txt', 'utf8')
  data = JSON.parse(data);
  for (let i = 0; i < data.user.length; i += 1) {//Check user's list of products
    if (data.user[i] === user) {
      for (let x = 0; x < data.basket[i].length; x += 1){
        if ((data.basket[i])[x].img === itemInfo.img){
          (data.basket[i]).splice(x,1)//when match is found, delete from list
        }
      }
    }
  }
  fs.writeFileSync('basketData.txt', JSON.stringify(data));//Save updated content
}

//add product to current user's basket list
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
