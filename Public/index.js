// Initialise
window.onload = () => {
  document.getElementById('submitButton').addEventListener('click', () => {
    let results = document.getElementById('results');
    results.textContent = document.getElementById('searchField').value;//Replace with api result when given API keys
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

function login(){
  
}

function register(){

}
