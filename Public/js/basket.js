//Initialise 
window.onload = () => {
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
//Load basket data and display it on the page 
async function loadBasket(){
  if(currentUser !== undefined){
    const response = await fetch('basketData.txt');
    const text = await response.text();
    const basket = JSON.parse(text);
    const table = document.querySelector("table");
    for (let i = 0; i < basket.user.length; i += 1) {
      if(basket.user[i] === currentUser){
        generateTable(table,basket.basket[i]);
        generateTableHead(table, Object.keys(basket.basket[i][0]))
      }
    }
  }
}
//load users file and compare input to verify login 
async function login(){
  const response = await fetch('users.txt');
  const text = await response.text();
  const users = JSON.parse(text);
  const loginText = document.getElementById('loginText').value;
  const passwordText = document.getElementById('passwordText').value;
  for (let i = 0; i < users.username.length; i += 1) {
    if (users.username[i] === loginText) {
      if(users.password[i] === passwordText){
        document.getElementById('loginButton').value = "Signed In";
        console.log("Successful login");
        currentUser = loginText;
        loadBasket;
      }else{
        console.log("invalid login");
      }
    }
  }
}
//send new user data to server for validation 
function register(){
  const emailText = document.getElementById('registerEmail').value;
  const passwordText = document.getElementById('registerPassword').value;
  if (emailText !== undefined && passwordText !== undefined){
    let newUser = {
      email: emailText,
      password: passwordText
    }
    const url = `http://localhost:8080/register`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(newUser));
    currentUser = emailText;
    document.getElementById('registerButton').value = "Registered";
  }
}
//send server who signed in with google 
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  currentUser = profile.getEmail();
  //send token to server
  let id_token = googleUser.getAuthResponse().id_token;
  const token = {token:profile.getEmail()};
  const url = `http://localhost:8080/glogin`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(token));
  loadBasket();
}

//delete pressed row of basket 
function myDeleteFunction(r,e) {
  let itemInfo = {
    info: e.target.parentElement.parentElement.children[2].children[0].textContent,
    img: e.target.parentElement.parentElement.children[2].children[1].src
  }
  sendDeleteInfo(itemInfo);
  document.getElementById("basketTable").deleteRow(r);
}
//send which item was deleted to server to remove it from the basket save file
function sendDeleteInfo(itemInfo){
  let body = {
    user: currentUser,
    itemInfo: itemInfo,
  };
  const url = `http://localhost:8080/deleteInfo`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(body));
}
//Empty entire basket 
function emptyBasket(){
  document.getElementById("basketTable").remove();
}
//Generate the top row of the table 
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let th2 = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
    row.appendChild(th2);
  }
}
//Create the table 
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    let btn = document.createElement("button");
    let pic = document.createElement("img");
     btn.setAttribute("style","color: white; text-align: center; background-color: red; padding: 4px 30px 4px 8px; margin: 10px; font-size:100% ");
    for (key in element) {
      let cell = row.insertCell();
      let cell2 = row.insertCell();
      let i = 1;
      btn.innerHTML = "Remove";
      btn.onclick= function(e){myDeleteFunction(i,e)};
      let text = document.createElement("p");
      text.innerHTML=element["info"];
      pic.src= element["img"];
      cell.appendChild(text);
      cell.appendChild(pic);
      cell2.appendChild(btn);

    }
  }
}
