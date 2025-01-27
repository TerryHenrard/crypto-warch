import { HeaderInfos } from "./components/HeaderInfos.jsx";
import { GlobalChart } from "./components/GlobalChart.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "./components/Table.jsx";

// release 1.0.0 ready for production
function App() {
  const [coinsData, setCoinsData] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y",
        {
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-aXbrCpoJNGd1YBeKta5HKG2a",
          },
        },
      )
      .then((res) => setCoinsData(res.data));
  }, []);

  return (
    <div className={"app-container"}>
      <header>
        <HeaderInfos />
        <GlobalChart coinsData={coinsData} />
      </header>
      <Table coinsData={coinsData} />
    </div>
  );
}

export default App;
