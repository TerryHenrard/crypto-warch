import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Tooltip, Treemap } from "recharts";
import colors from "/src/styles/_settings.module.scss";

export const GlobalChart = ({ coinsData }) => {
  const [dataArray, setDataArray] = useState([]);

  const colorPicker = (number) => {
    if (number >= 20) {
      return colors.color1;
    } else if (number >= 5) {
      return colors.green2;
    } else if (number >= 0) {
      return colors.green1;
    } else if (number >= -5) {
      return colors.red1;
    } else if (number >= -20) {
      return colors.red2;
    } else {
      return colors.black2;
    }
  };

  const excludeCoin = (coin) => {
    return (
      coin === "usdt" ||
      coin === "usdc" ||
      coin === "busd" ||
      coin === "dai" ||
      coin === "ust" ||
      coin === "mim"
    );
  };

  useEffect(() => {
    let chartData = [];

    if (coinsData && coinsData.length > 0) {
      for (let i = 0; i < 45; i++) {
        if (!excludeCoin(coinsData[i].symbol)) {
          chartData.push({
            name: `${coinsData[i].symbol.toUpperCase()} ${coinsData[i].market_cap_change_percentage_24h.toFixed(1)}%`,
            size: coinsData[i].market_cap,
            fill: colorPicker(coinsData[i].price_change_percentage_24h),
          });
        }
      }
    }
    setDataArray(chartData);
  }, [coinsData]);

  const TreemapToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={"custom-tooltip"}>
          <p className={"label"}>{payload[0].payload.name}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={"global-chart"}>
      <Treemap
        width={730}
        height={180}
        data={dataArray}
        dataKey={"size"}
        stroke={"rgb(51, 51, 51)"}
        fill={"black"}
      >
        <Tooltip content={<TreemapToolTip />} />
      </Treemap>
    </div>
  );
};

GlobalChart.propTypes = {
  coinsData: PropTypes.arrayOf(PropTypes.object),
};
