// Initialise
window.onload = () => {
  document.getElementById('submitButton').addEventListener('click', () => {
    search(document.getElementById('searchField').value);
  });

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

async function displayResults(){
  const response = await fetch('temp.txt');
  const results = await response.text();
  let resultObj = JSON.parse(results);
  let resultArea = document.getElementById('results');
  resultArea.textContent = JSON.stringify(resultObj.products);
}

function search(search){
  const token = {token:search};
  const url = `${window.location.href}search`;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        displayResults();
    }
  }
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(token));
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
