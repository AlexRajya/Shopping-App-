// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const ip = require('ip');
const {OAuth2Client} = require('google-auth-library');
var request = require('google-oauth-jwt')

// constants
const client = new OAuth2Client("3211205636-imtck5nq3h009s9fq6r9pcao79kbd2if");
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

    let token = req.body;
    verify(token.token);
    //fs.writeFileSync('basketData.txt', JSON.stringify(req.body));
    res.sendStatus(200);// OK
    //console.log(JSON.stringify(req.body));
  } catch (err) {
    res.sendStatus(400);// bad request
  }
});

async function verify(token){
  let ticket = await client.verifyIdToken({
      idToken: token,
      audience: "3211205636-imtck5nq3h009s9fq6r9pcao79kbd2if"
  });
  let payload = ticket.getPayload();
}


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
