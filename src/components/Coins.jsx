import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Coins.css";

import DOMPurify from "dompurify";

const Coin = () => {
  const [coin, setCoin] = useState({});
  const { coinId } = useParams();

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  return (
    <div className="coin-container">
      {/* Nagłówek */}
      <div className="content">
        <h1>{coin.name}</h1>
      </div>

      {/* Rank */}
      <div className="content">
        {coin.market_cap_rank ? (
          <div className="rank">
            <span className="rank-btn">Rank #{coin.market_cap_rank}</span>
          </div>
        ) : null}
      </div>

      {/* Informacje */}
      <div className="content">
        <div className="info">
          <div className="coin-heading">
            {coin.image ? (
              <img src={coin.image.small} alt={coin.name} />
            ) : null}
            <p>{coin.name}</p>
            <p>{coin.symbol?.toUpperCase()}</p>
          </div>
          <div className="coin-price">
            {coin.market_data?.current_price?.usd ? (
              <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1>
            ) : (
              <h1>Price unavailable</h1>
            )}
          </div>
        </div>
      </div>

      {/* Tabela ze zmianami */}
      <div className="content">
        {coin.market_data ? (
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {coin.market_data.price_change_percentage_1h_in_currency?.usd
                    ? `${coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        2
                      )}%`
                    : "N/A"}
                </td>
                <td>
                  {coin.market_data.price_change_percentage_24h_in_currency?.usd
                    ? `${coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                        2
                      )}%`
                    : "N/A"}
                </td>
                <td>
                  {coin.market_data.price_change_percentage_7d_in_currency?.usd
                    ? `${coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                        2
                      )}%`
                    : "N/A"}
                </td>
                <td>
                  {coin.market_data.price_change_percentage_14d_in_currency?.usd
                    ? `${coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                        2
                      )}%`
                    : "N/A"}
                </td>
                <td>
                  {coin.market_data.price_change_percentage_30d_in_currency?.usd
                    ? `${coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                        2
                      )}%`
                    : "N/A"}
                </td>
                <td>
                  {coin.market_data.price_change_percentage_1y_in_currency?.usd
                    ? `${coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                        2
                      )}%`
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </div>

      {/* Sekcja "O nas" */}
      <div className="content">
        <div className="about">
          <h3>About {coin.name}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(coin.description?.en || ""),
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
