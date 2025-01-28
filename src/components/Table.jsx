import PropTypes from "prop-types";
import { useState } from "react";
import { TableLine } from "./TableLine.jsx";
import { ToTop } from "./ToTop.jsx";
import { useSelector } from "react-redux";

// Release 2.0.0 ready for production
export const Table = ({ coinsData }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("");
  const showStable = useSelector((state) => state.stableReducer.showStable);
  const showFavList = useSelector((state) => state.listReducer.showList);

  const tableHeader = [
    "Prix",
    "MarketCap",
    "Volume",
    "1h",
    "1j",
    "1s",
    "1m",
    "6m",
    "1a",
    "ATH",
  ];

  return (
    <div className={"table-container"}>
      <ul className={"table-header"}>
        <div className={"range-container"}>
          <span>
            Top{" "}
            <input
              type={"text"}
              value={rangeNumber}
              onChange={({ target }) => setRangeNumber(Number(target.value))}
            />
          </span>
          <input
            type={"range"}
            min={"1"}
            max={"250"}
            value={rangeNumber}
            onChange={({ target }) => setRangeNumber(Number(target.value))}
          />
          <ToTop />
        </div>

        {tableHeader.map((header) => (
          <li key={header}>
            <input
              type={"radio"}
              name={"header-el"}
              id={header}
              defaultChecked={
                header === orderBy || header === orderBy + "reverse"
              }
              onClick={() => {
                if (orderBy === header) {
                  setOrderBy(header + "reverse");
                } else {
                  setOrderBy(header);
                }
              }}
            />
            <label htmlFor={header}>{header}</label>
          </li>
        ))}
      </ul>
      {coinsData &&
        coinsData
          .slice(0, rangeNumber)
          .filter((coin) => {
            if (showStable) {
              return coin;
            } else {
              if (
                !["usdt", "busd", "usdc", "usds", "susds", "dai"].includes(
                  coin.symbol,
                )
              ) {
                return coin;
              }
            }
          })
          .filter((coin) => {
            if (showFavList) {
              let list = window.localStorage.coinList.split(",");
              return list.includes(coin.id);
            }
            return true;
          })
          .sort((a, b) => {
            switch (orderBy) {
              case "Prix":
                return b.current_price - a.current_price;
              case "Volume":
                return b.total_volume - a.total_volume;
              case "MarketCap":
                return b.market_cap - a.market_cap;
              case "1h":
                return (
                  b.price_change_percentage_1h_in_currency -
                  a.price_change_percentage_1h_in_currency
                );
              case "1j":
                return (
                  b.market_cap_change_percentage_24h -
                  a.market_cap_change_percentage_24h
                );
              case "1s":
                return (
                  b.price_change_percentage_7d_in_currency -
                  a.price_change_percentage_7d_in_currency
                );
              case "1m":
                return (
                  b.price_change_percentage_30d_in_currency -
                  a.price_change_percentage_30d_in_currency
                );
              case "6m":
                return (
                  b.price_change_percentage_200d_in_currency -
                  a.price_change_percentage_200d_in_currency
                );
              case "1a":
                return (
                  b.price_change_percentage_1y_in_currency -
                  a.price_change_percentage_1y_in_currency
                );
              case "ATH":
                return b.ath_change_percentage - a.ath_change_percentage;
              case "#reverse":
                return a.market_cap - b.market_cap;
              case "Prixreverse":
                return a.current_price - b.current_price;
              case "Volumereverse":
                return a.total_volume - b.total_volume;
              case "MarketCapreverse":
                return a.market_cap - b.market_cap;
              case "1hreverse":
                return (
                  a.price_change_percentage_1h_in_currency -
                  b.price_change_percentage_1h_in_currency
                );
              case "1jreverse":
                return (
                  a.market_cap_change_percentage_24h -
                  b.market_cap_change_percentage_24h
                );
              case "1sreverse":
                return (
                  a.price_change_percentage_7d_in_currency -
                  b.price_change_percentage_7d_in_currency
                );
              case "1mreverse":
                return (
                  a.price_change_percentage_30d_in_currency -
                  b.price_change_percentage_30d_in_currency
                );
              case "6mreverse":
                return (
                  a.price_change_percentage_200d_in_currency -
                  b.price_change_percentage_200d_in_currency
                );
              case "1areverse":
                return (
                  a.price_change_percentage_1y_in_currency -
                  b.price_change_percentage_1y_in_currency
                );
              case "ATHreverse":
                return a.ath_change_percentage - b.ath_change_percentage;
              default:
                null;
            }
          })
          .map((coin, index) => (
            <TableLine key={index} coin={coin} index={index} />
          ))}
    </div>
  );
};
Table.propTypes = {
  coinsData: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
    }),
  ),
};
