// Initialise
window.onload = () => {
  document.getElementById('submitButton').addEventListener('click', () => {
    let results = document.getElementById('results');
    results.textContent = document.getElementById('searchField').value;//Replace with api result when given API keys
  });
};
