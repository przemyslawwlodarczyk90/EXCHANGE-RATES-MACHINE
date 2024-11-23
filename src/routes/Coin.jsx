import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';


import DOMPurify from 'dompurify';
import '../styles/Coin.css';


const Coin = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});
  const [chartData, setChartData] = useState(null);

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setCoin(res.data);
      const prices = res.data.market_data.sparkline_7d.price;
      setChartData({
        labels: Array.from({ length: prices.length }, (_, i) => i),
        datasets: [
          {
            label: 'Price (7d)',
            data: prices,
            borderColor: '#8e44ad',
            fill: false,
          },
        ],
      });
    });
  }, [url]);

  return (
    <div className="coin-container">
      <div className="content">
        <h1>{coin.name}</h1>
        <div className="coin-details">
          {coin.image && <img src={coin.image.large} alt={coin.name} />}
          <p>Symbol: {coin.symbol}</p>
          <p>Rank: {coin.market_cap_rank}</p>
          <p>Current Price: ${coin.market_data?.current_price.usd.toLocaleString()}</p>
        </div>
      </div>
      <div className="content">
        {chartData && <Line data={chartData} />}
      </div>
      <div className="content about">
        <h3>About {coin.name}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
          }}
        ></p>
      </div>
    </div>
  );
};

export default Coin;
