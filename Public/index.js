// Initialise
const myid = Math.random().toString(36).substring(2);// Unique id for each client

function receivedMessageFromServer(e) {
  const resultObj = JSON.parse(e.data).results;
  let resultArea = document.getElementById('results');
  resultArea.innerHTML = '';
  let p,add,img;
  for (let i = 0; i < 3; i += 1){
    p = document.createElement('p');
    p.textContent = "";
    resultArea.appendChild(p);
  }
  for (let i = 0; i < resultObj.products.length; i += 1){
    div = document.createElement('div');
    p = document.createElement('p');
    p.textContent = resultObj.products[i].name + " price:" + resultObj.products[i].salePrice;
    add = document.createElement('button');
    add.textContent = "Add to basket";
    img = document.createElement('img');
    img.src = resultObj.products[i].image;
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(add);
    resultArea.appendChild(div);
  }
}

function sendSearch(searchText){
  const search = {
    searchText: searchText,
    id: myid,
  };
  ws.send(JSON.stringify(search));
}

window.onload = () => {
  try { // Connect to websocket
    ws = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`);
    ws.addEventListener('message', receivedMessageFromServer);
  } catch (err) {
    console.log('failed to connect to WebSocket');
  }
  try{
    document.getElementById('submitButton').addEventListener('click', () => {
      sendSearch(document.getElementById('searchField').value);
    });
  }catch (err){
    //throw
  }
  //Login modal listeners
  document.getElementById('login').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'block';
  });
  document.getElementById('loginClose').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'none';
  });
  window.onclick = (e) => {
    if (e.target === document.getElementById('loginModal')) {
      document.getElementById('loginModal').style.display = 'none';
    }
  };
  //Register modal listeners
  document.getElementById('register').addEventListener('click', () => {
    document.getElementById('registerModal').style.display = 'block';
  });
  document.getElementById('registerClose').addEventListener('click', () => {
    document.getElementById('registerModal').style.display = 'none';
  });
  window.onclick = (e) => {
    if (e.target === document.getElementById('registerModal')) {
      document.getElementById('registerModal').style.display = 'none';
    }
  };
  //Login/register button listeners
  document.getElementById('loginButton').addEventListener('click', login);
  document.getElementById('registerButton').addEventListener('click', register);
};

let currentUser;

async function login(){
  const response = await fetch('users.txt');
  const text = await response.text();
  const users = JSON.parse(text);
  const loginText = document.getElementById('loginText').value;
  const passwordText = document.getElementById('passwordText').value;
  for (let i = 0; i < users.username.length; i += 1) {
    if (users.username[i] === loginText) {
      if(users.password[i] === passwordText){
        console.log("Successful login");
        currentUser = loginText;
      }else{
        console.log("invalid login");
      }
    }
  }
}

function register(){
  //todo
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  //send token to server
  let id_token = googleUser.getAuthResponse().id_token;
  const token = {token:profile.getEmail()};
  const url = `${window.location.href}login`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(token));
}
function myInsertFunction() {
  var table = document.getElementById("basketTable");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
}
function myDeleteFunction() {
  document.getElementById("basketTable").deleteRow(1);
}
