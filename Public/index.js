// Initialise
async function getFromAPIs(search){
  const tesco = await fetch( "https://dev.tescolabs.com/grocery/products/?query="+search+"&offset=0&limit=13&", {
    method: 'GET',
    headers: {
      "Ocp-Apim-Subscription-Key": 'b1ef4204177a4deb86619436f9e1e7a6'
    }
  });
  const result1 = await tesco.json(); //extract JSON from the http response
  console.log(result1);

  const response = await fetch( 'https://api.bestbuy.com/v1/products(search='+search+')?format=json&show=image,name,salePrice&apiKey=lfXY4GpC14duGk4N3uGvGD3d', {
    method: 'GET',
  });
  const result2 = await response.json(); //extract JSON from the http response
  displayResults(result1, result2);
}

function displayResults(result1, result2){
  result1 = result1.uk.ghs.products.results;
  let resultArea = document.getElementById('results');
  resultArea.innerHTML = '';
  let p,add,img;
  p = document.createElement('p');
  p.textContent = "BestBuy:";
  resultArea.appendChild(p);

  p = document.createElement('p');
  p.textContent = "Tesco:";
  resultArea.appendChild(p);

  p = document.createElement('p');
  p.textContent = "Sainsburys:";
  resultArea.appendChild(p);

  let tescoCount = 0;
  let bestCount = 0;
  let bestDone,tescoDone = false;
  for (let i = 1; i < 50; i += 1){
    div = document.createElement('div');
    p = document.createElement('p');
    img = document.createElement('img');
    add = document.createElement('button');
    if (i % 3 === 1){//If bestbuy
      bestCount += 1;
      if (bestCount < result2.products.length){
        p.textContent = result2.products[bestCount].name + "- Price:" + result2.products[bestCount].salePrice;
        img.src = result2.products[bestCount].image;
      }else{
        bestDone = true;
      }
    }else if(i % 3 === 2){//If Tesco
      tescoCount += 1;
      if (tescoCount < result1.length){
        p.textContent = result1[tescoCount].name + "- Price:" + result1[tescoCount].price;
        img.src = result1[tescoCount].image;
      }else{
        tescoDone = true;
      }
    }else{
      //sainburys
    }
    if (tescoDone === true && bestDone === true){
      break;
    }
    add.textContent = "Add to basket";

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(add);
    resultArea.appendChild(div);
  }
}

window.onload = () => {
  try{
    document.getElementById('submitButton').addEventListener('click', () => {
      getFromAPIs(document.getElementById('searchField').value);
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

//Basket script
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
