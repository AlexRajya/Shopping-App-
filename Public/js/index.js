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
    add = document.createElement('input');
    if (i % 3 === 1){//If bestbuy
      bestCount += 1;
      if (bestCount < result2.products.length){
        p.textContent = "BestBuy's "+result2.products[bestCount].name + " - Price: £" + result2.products[bestCount].salePrice;
        img.src = result2.products[bestCount].image;
      }else{
        p.textContent = "No item found";
        bestDone = true;
      }
    }else if(i % 3 === 2){//If Tesco
      tescoCount += 1;
      if (tescoCount < result1.length){
        p.textContent = "Tesco's "+result1[tescoCount].name + " - Price: £" + (result1[tescoCount].price).toFixed(2);
        img.src = result1[tescoCount].image;
      }else{
        p.textContent = "No item found";
        tescoDone = true;
      }
    }else{
      asdaCount += 1;
      if (asdaCount < result3.length){
        p.textContent = "Asda's "+result3[asdaCount].skuName + " - Price: " + result3[asdaCount].price;
        img.src = "https://ui.assets-asda.com"+result3[asdaCount].extraLargeImageURL;
      }else{
        p.textContent = "No item found";
        asdaDone = true;
      }
    }
    if (tescoDone === true && bestDone === true && asdaDone === true){
      break;
    }
    add.type = "button";
    add.value = "Add to basket";
    add.addEventListener('click', addToBasket);

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(add);
    resultArea.appendChild(div);
  }
}

function addToBasket(e){
  let element = e.target.parentElement;
  let itemInfo = {
    info: undefined,
    img: undefined,
  }

  for (let i = 0; i < element.children.length; i+=1){
    if (element.children[i].tagName === 'P'){
      itemInfo.info = element.children[i].textContent;
    }else if(element.children[i].tagName === 'IMG'){
      itemInfo.img = element.children[i].src;
    }
  }
  console.log(itemInfo);
  if (currentUser !== undefined){
    sendPInfo(itemInfo);
  }
}

function sendPInfo(itemInfo){
  let body = {
    user: currentUser,
    itemInfo: itemInfo,
  };
  const url = `http://localhost:8080/pinfo`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(body));
}

window.onload = () => {
  try{
    document.getElementById('submitButton').addEventListener('click', () => {
      getFromAPIs(document.getElementById('searchField').value);
    });
    document.getElementById('searchField').addEventListener('keydown', (e) => {
      if (e.key === "Enter"){
        getFromAPIs(document.getElementById('searchField').value);
      }
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
        document.getElementById('loginButton').value = "Signed In";
        console.log("Successful login");
        currentUser = loginText;
      }else{
        console.log("invalid login");
      }
    }
  }
}

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
  const url = `http://localhost:8080/login`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(token));
}
