const apiUrl = "https://www.cbr-xml-daily.ru/daily_json.js";

const inputCurrency = document.getElementById("inputCurrency");
const currencyList = document.getElementById("currencyList");
const button = document.getElementById("button");
const outputCurrency = document.getElementById("outputCurrency");

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const currencies = data.Valute;

    for (const [key, value] of Object.entries(currencies)) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = `${key} (${value.Name})`;
      currencyList.appendChild(option);
    }
  });

button.addEventListener("click", () => {
  const selectedCurrency = currencyList.value;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.Valute[selectedCurrency].Value;

      const inputAmount = parseFloat(inputCurrency.value);
      if (!isNaN(inputAmount)) {
        outputCurrency.value = (inputAmount * rate).toFixed(2);
      }
    });
});

currencyList.addEventListener("change", () => {
  const selectedCurrency = currencyList.value;
  if (inputCurrency.value !== "") {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.Valute[selectedCurrency].Value;
        const inputAmount = parseFloat(inputCurrency.value);
        if (!isNaN(inputAmount)) {
          outputCurrency.value = (inputAmount * rate).toFixed(2);
        }
      });
  }
});
