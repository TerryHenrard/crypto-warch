import { useEffect, useState } from "react";
import axios from "axios";
import { PercentChange } from "./PercentChange.jsx";
import { TableFilters } from "./TableFilters.jsx";

export const HeaderInfos = () => {
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global", {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-aXbrCpoJNGd1YBeKta5HKG2a",
        },
      })
      .then((res) => setHeaderData(res.data.data));
  }, []);

  return (
    <div className={"header-container"}>
      <ul className={"title"}>
        <li>
          <h1>
            <img src={"/assets/logo.png"} alt={"logo"} />
            Watch Tower
          </h1>
        </li>
        <li>
          Crypto-monnaies:{" "}
          {headerData.active_cryptocurrencies &&
            headerData.active_cryptocurrencies.toLocaleString()}
        </li>
        <li>
          Marchés: {headerData.markets && headerData.markets.toLocaleString()}
        </li>
      </ul>
      <ul className={"infos-mkt"}>
        <li>
          Global Market Cap :{" "}
          <PercentChange
            percent={headerData.market_cap_change_percentage_24h_usd}
          />
        </li>
        <li>
          BTC dominance :{" "}
          {headerData.market_cap_percentage &&
            headerData.market_cap_percentage.btc.toFixed(1)}
          %
        </li>
        <li>
          ETH dominance :{" "}
          {headerData.market_cap_percentage &&
            headerData.market_cap_percentage.eth.toFixed(1)}
          %
        </li>
      </ul>
      <TableFilters />
    </div>
  );
};
