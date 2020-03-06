// Initialise
async function getFromAPIs(search){
  //tesco
  const tesco = await fetch( "https://dev.tescolabs.com/grocery/products/?query="+search+"&offset=0&limit=13&", {
    method: 'GET',
    headers: {
      "Ocp-Apim-Subscription-Key": 'b1ef4204177a4deb86619436f9e1e7a6'
    }
  });
  const result1 = await tesco.json(); //extract JSON from the http response

  //bestBuy
  const response = await fetch( 'https://api.bestbuy.com/v1/products(search='+search+')?format=json&show=image,name,salePrice&apiKey=lfXY4GpC14duGk4N3uGvGD3d', {
    method: 'GET',
  });
  const result2 = await response.json(); //extract JSON from the http response

  //Asda
  const asda = await fetch( "https://cors-anywhere.herokuapp.com/https://groceries.asda.com/cmscontent/v2/items/autoSuggest?requestorigin=gi&searchTerm="+search+"&cacheable=true&storeId=4565&viewPort=xlarge", {
    method: 'GET',
  });
  const result3 = await asda.json(); //extract JSON from the http response

  displayResults(result1, result2, result3);
}

function displayResults(result1, result2, result3){
  result1 = result1.uk.ghs.products.results;
  result3 = result3.payload.autoSuggestionItems;
  console.log(result1);
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
  p.textContent = "Asda:";
  resultArea.appendChild(p);

  let tescoCount = 0;
  let bestCount = 0;
  let asdaCount = 0;
  let bestDone = false;
  let tescoDone = false;
  let asdaDone = false;

  for (let i = 1; i < 60; i += 1){
    div = document.createElement('div');
    p = document.createElement('p');
    img = document.createElement('img');
    add = document.createElement('button');
    if (i % 3 === 1){//If bestbuy
      bestCount += 1;
      if (bestCount < result2.products.length){
        p.textContent = result2.products[bestCount].name + "- Price: " + result2.products[bestCount].salePrice;
        img.src = result2.products[bestCount].image;
      }else{
        p.textContent = "No item found";
        bestDone = true;
      }
    }else if(i % 3 === 2){//If Tesco
      tescoCount += 1;
      if (tescoCount < result1.length){
        p.textContent = result1[tescoCount].name + "- Price: " + result1[tescoCount].price;
        img.src = result1[tescoCount].image;
      }else{
        p.textContent = "No item found";
        tescoDone = true;
      }
    }else{
      asdaCount += 1;
      if (asdaCount < result3.length){
        p.textContent = result3[asdaCount].skuName + "- Price: " + result3[asdaCount].price;
        img.src = "https://ui.assets-asda.com"+result3[asdaCount].extraLargeImageURL;
      }else{
        p.textContent = "No item found";
        asdaDone = true;
      }
    }
    if (tescoDone === true && bestDone === true && asdaDone === true){
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

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

try{
  let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
    { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Monte Amiata", height: 1738, place: "Siena" }
  ];

  let table = document.querySelector("table");
  let data = Object.keys(mountains[0]);

  generateTable(table, mountains);
  generateTableHead(table, data);
}catch(err){
  //Not on basket page - add if statement to address later for cleaness
}
