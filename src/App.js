import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import Coin from "./routes/Coin";

function App() {

  const [coins, setCoins] = useState([]);

  //https://www.coingecko.com/en/api/documentation

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Coins coins={coins} />} />
          <Route path="/coin" element={<Coin />} >
          <Route path=':coinId' element={<Coin />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
