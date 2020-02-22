// Initialise
window.onload = () => {
  document.getElementById('submitButton').addEventListener('click', () => {
    let results = document.getElementById('results');
    results.textContent = document.getElementById('searchField').value;//Replace with api result when given API keys
  });

  document.getElementById('login').addEventListener('click', () => {
    document.getElementById('Modal').style.display = 'block';
  });
  document.getElementById('close').addEventListener('click', () => {
    document.getElementById('Modal').style.display = 'none';
  });
  window.onclick = (e) => {
    if (e.target === document.getElementById('Modal')) {
      document.getElementById('Modal').style.display = 'none';
    }
  };
};
