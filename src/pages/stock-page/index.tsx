import React, { useEffect, useState } from 'react';
import { fetchStockData } from 'features/get-stock';
import { Controls } from 'entities/controls';
import { StockChart } from 'entities/stock-chart';

export const StockPage = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setError(null);
      setChartData(null);

      try {
        const data = await fetchStockData(symbol);
        const timeSeries = data['Time Series (Daily)'];

        const dates = Object.keys(timeSeries).slice(0, 30).reverse();
        const prices = dates.map((date) =>
          parseFloat(timeSeries[date]['4. close'])
        );

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${symbol} Closing Price`,
              data: prices,
              borderColor: 'rgb(75,192,192)',
              fill: false,
            },
          ],
        });
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Не удалось загрузить данные');
      }
    };

    if (symbol) {
      loadData();
    }
  }, [symbol]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Controls symbol={symbol} setSymbol={setSymbol} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {chartData ? (
        <StockChart data={chartData} />
      ) : (
        !error && <p className="text-center">Загрузка...</p>
      )}
    </div>
  );
};
