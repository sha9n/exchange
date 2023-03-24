const apiUrl = "https://www.cbr-xml-daily.ru/daily_json.js";

const inputCurrency = document.getElementById("inputCurrency");
const currencyList = document.getElementById("currencyList");
const outputCurrency = document.getElementById("outputCurrency");

currencyList.disabled = true;
inputCurrency.disabled = true;
outputCurrency.disabled = true;
currencyList.insertAdjacentHTML("beforebegin", '<div class="loader">Loading...</div>');

const savedCurrency = localStorage.getItem("selectedCurrency");

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    document.querySelector('.loader').remove();
    currencyList.disabled = false;
    inputCurrency.disabled = false;
    outputCurrency.disabled = true;
    const currencies = data.Valute;
    for (const [key, value] of Object.entries(currencies)) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = `${key} (${value.Name})`;
      currencyList.appendChild(option);
    }
    if (savedCurrency) {
      currencyList.value = savedCurrency;
    }
  })
  .catch((error) => {
    document.querySelector('.loader').remove();
    currencyList.insertAdjacentHTML("beforebegin", '<div class="error-message">Error loading data</div>');
    const errorMessage = document.querySelector('.error-message');
    errorMessage.style.color = 'red';
    document.querySelectorAll('select, input').forEach(elem => elem.style.display = 'none');
  });

function convertCurrency() {
  const selectedCurrency = currencyList.value;
  localStorage.setItem("selectedCurrency", selectedCurrency);
  if (inputCurrency.value !== "") {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.Valute[selectedCurrency].Value;
        const inputAmount = parseFloat(inputCurrency.value);
        if (!isNaN(inputAmount)) {
          outputCurrency.value = (inputAmount * rate).toFixed(2) + " ₽";
        }
      });
  }
}

inputCurrency.addEventListener("input", convertCurrency);
currencyList.addEventListener("change", convertCurrency);
