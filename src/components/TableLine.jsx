import PropTypes from "prop-types";
import { PercentChange } from "./PercentChange.jsx";

export const TableLine = ({ coin, index }) => {
  const priceFormatter = (num) => {
    return Math.round(num).toString().length < 4
      ? new Intl.NumberFormat("us-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 7,
        }).format(num)
      : num;
  };

  const mktCapFormatter = (num) => {
    return Number(String(num).split("").slice(0, -6).join(""));
  };

  return (
    <div className={"table-line"}>
      <div className={"infos-container"}>
        <span>*</span>
        <p>{index + 1}</p>
        <div className={"img"}>
          <img src={coin.image} height={"20"} alt={"logo"} />
        </div>
        <div className={"infos"}>
          <div className={"chart-img"}>
            <img src={"/assets/chart-icon.svg"} alt={"chart icon"} />
          </div>
          <h4>{coin.name}</h4>
          <span>- {coin.symbol.toUpperCase()}</span>
          <a
            target={"_blank"}
            href={`https://www.coingecko.com/fr/pi%C3%A8ces/${coin.name.toLowerCase().replaceAll(" ", "-")}`}
          >
            <img src={"/assets/info-icon.svg"} alt={"info icon"} />
          </a>
        </div>
      </div>
      <p>$ {priceFormatter(coin.current_price).toLocaleString()}</p>
      <p className={"mktcap"}>
        $ {mktCapFormatter(coin.market_cap).toLocaleString()} m
      </p>
      <p className={"volume"}>$ {coin.total_volume.toLocaleString()}</p>
      <PercentChange percent={coin.price_change_percentage_1h_in_currency} />
      <PercentChange percent={coin.price_change_percentage_24h_in_currency} />
      <PercentChange percent={coin.price_change_percentage_7d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_30d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_200d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_1y_in_currency} />
      <PercentChange percent={coin.ath_change_percentage} />
    </div>
  );
};

TableLine.propTypes = {
  coin: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
