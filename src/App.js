import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import Coin from "./routes/Coin";
import "./styles/App.css"; // Globalne style dla całej aplikacji

function App() {
  // Stan przechowujący listę kryptowalut
  const [coins, setCoins] = useState([]);

  // Stan dla trybu ciemnego/jasnego
  const [darkMode, setDarkMode] = useState(false);

  // Funkcja przełączająca tryb ciemny/jasny
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // URL do API
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  // Pobieranie danych z API
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Router>
        {/* Navbar z funkcją przełączania trybu */}
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Coins coins={coins} />} />
          <Route path="/coin" element={<Coin />}>
            <Route path=":coinId" element={<Coin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
