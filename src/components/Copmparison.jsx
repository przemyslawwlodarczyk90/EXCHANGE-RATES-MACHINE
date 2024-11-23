import React, { useState } from 'react';
import '../styles/Comparison.css';

const Comparison = ({ coins }) => {
  const [coin1, setCoin1] = useState('');
  const [coin2, setCoin2] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);

  const compareCoins = () => {
    const firstCoin = coins.find((coin) => coin.id === coin1);
    const secondCoin = coins.find((coin) => coin.id === coin2);

    if (firstCoin && secondCoin) {
      setComparisonResult({
        priceDifference: firstCoin.current_price - secondCoin.current_price,
        marketCapDifference: firstCoin.market_cap - secondCoin.market_cap,
      });
    }
  };

  return (
    <div className="comparison-container">
      <h2>Compare Coins</h2>
      <select onChange={(e) => setCoin1(e.target.value)} defaultValue="">
        <option value="" disabled>
          Select First Coin
        </option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setCoin2(e.target.value)} defaultValue="">
        <option value="" disabled>
          Select Second Coin
        </option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>
      <button onClick={compareCoins}>Compare</button>
      {comparisonResult && (
        <div>
          <p>Price Difference: ${comparisonResult.priceDifference.toFixed(2)}</p>
          <p>Market Cap Difference: ${comparisonResult.marketCapDifference.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Comparison;
