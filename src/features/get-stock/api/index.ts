const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
export const fetchStockData = async (symbol: string) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Ошибка при запросе к API');
  }

  const data = await res.json();

  if (!data['Time Series (Daily)']) {
    throw new Error('Неверный тикер или ошибка в ответе API');
  }

  return data;
};
