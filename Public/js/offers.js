// Initialise
//Get results from API - Alex
async function getFromAPIs(search, vendor){
  //tesco
  let result;
  console.log(vendor);
  if (vendor === "Tesco"){
    const tesco = await fetch( "https://dev.tescolabs.com/grocery/products/?query="+search+"&offset=0&limit=20&", {
      method: 'GET',
      headers: {
        "Ocp-Apim-Subscription-Key": 'b1ef4204177a4deb86619436f9e1e7a6'
      }
    });
    result = await tesco.json(); //extract JSON from the http response
    result = result.uk.ghs.products.results;
  }else if (vendor === "BestBuy"){
    //bestBuy
    const response = await fetch( 'https://api.bestbuy.com/v1/products(search='+search+'&onSale=true)?format=json&show=image,name,salePrice,regularPrice&apiKey=lfXY4GpC14duGk4N3uGvGD3d', {
      method: 'GET',
    });
    result = await response.json(); //extract JSON from the http response
  }else{
    //Asda
    const asda = await fetch( "https://cors-anywhere.herokuapp.com/https://groceries.asda.com/cmscontent/v2/items/autoSuggest?requestorigin=gi&searchTerm="+search+"&cacheable=true&storeId=4565&viewPort=xlarge", {
      method: 'GET',
    });
    result = await asda.json(); //extract JSON from the http response
    result = result.payload.autoSuggestionItems;
  }
  displayResults(result, vendor);
}

//Display results to the HTML page
function displayResults(result, vendor){
  let resultArea = document.getElementById('results');
  resultArea.innerHTML = '';
  let p,add,img;
  p = document.createElement('p');
  p.textContent = "Latest";
  resultArea.appendChild(p);

  p = document.createElement('p');
  p.textContent = "Offers";
  resultArea.appendChild(p);

  p = document.createElement('p');
  p.textContent = "From "+document.getElementById('vendors').value+":";
  resultArea.appendChild(p);
  let done;

  for (let i = 1; i < 60; i += 1){
    div = document.createElement('div');
    p = document.createElement('p');
    p2 = document.createElement('p');
    img = document.createElement('img');
    add = document.createElement('input');
    if (vendor === "BestBuy"){//If bestbuy
      if (i < result.products.length){
        p.textContent = "BestBuy's "+result.products[i].name;
        p2.textContent = "Price: Now: £" + result.products[i].salePrice + " Was: £" + result.products[i].regularPrice;
        img.src = result.products[i].image;
      }else{
        p.textContent = "No item found";
        done = true;
      }
    }else if(vendor === "Tesco"){//If Tesco
      if (i < result.length){
        p.textContent = "Tesco's "+result[i].name;
        p2.textContent = "Price: £" + (result[i].price).toFixed(2);
        img.src = result[i].image;
      }else{
        p.textContent = "No item found";
        done = true;
      }
    }else{
      if (i < result.length){
        p.textContent = "Asda's "+result[i].skuName;
        p2.textContent = "Price: " + result[i].price;
        img.src = "https://ui.assets-asda.com"+result[i].extraLargeImageURL;
      }else{
        p.textContent = "No item found";
        done = true;
      }
    }
    if (done === true){
      break;
    }
    add.type = "button";
    add.value = "Add to basket";
    add.addEventListener('click', addToBasket);

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(add);
    resultArea.appendChild(div);
  }
}

//Put selected item into JSON format then call send function 
function addToBasket(e){
  let element = e.target.parentElement;
  let itemInfo = {
    info: "",
    img: undefined,
  }

  for (let i = 0; i < element.children.length; i+=1){
    if (element.children[i].tagName === 'P'){
      itemInfo.info = itemInfo.info+" - "+element.children[i].textContent;
    }else if(element.children[i].tagName === 'IMG'){
      itemInfo.img = element.children[i].src;
    }
  }
  console.log(itemInfo);
  if (currentUser !== undefined){
    sendPInfo(itemInfo);
  }
}
//Send item to server for saving
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

//set event listeners on load 
window.onload = () => {
  document.getElementById('vendors').value = "BestBuy";
  try{
    document.getElementById('submitButton').addEventListener('click', () => {
      getFromAPIs(document.getElementById('searchField').value, document.getElementById('vendors').value);
    });
    document.getElementById('searchField').addEventListener('keydown', (e) => {
      if (e.key === "Enter"){
        getFromAPIs(document.getElementById('searchField').value, document.getElementById('vendors').value);
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
//Check DB to validate login 
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

//Send new user data to server for validation 
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

//Google sign in data is sent to server for validation 
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
}
