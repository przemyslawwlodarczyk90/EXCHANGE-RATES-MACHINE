import React from 'react'

const CoinItem = (props) => {


  return (
    <div className='coin-row'>
      <p>{props.coin.market_cap_rank}</p>
      <div className="img-symbol">
        <img src={props.coin.image} alt={props.coin.symbol} />
        <p>{props.coin.symbol}</p>
      </div>
      <p>{props.coin.current_price} $</p>
      <p>{props.coin.price_change_percentage_24h} %</p>
      <p className="hide-mobile">{props.coin.total_volume} $</p>
      <p className="hide-mobile">{props.coin.market_cap} $</p>
    </div>
  )
}

export default CoinItem