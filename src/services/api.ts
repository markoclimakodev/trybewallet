const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export async function fetchCurrencyAcronyms() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const currencyData = Object.keys(data).filter((currency) => currency !== 'USDT');

  return currencyData;
}

export async function fetchCurrencyExchangeRate() {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
}
