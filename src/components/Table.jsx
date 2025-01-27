import PropTypes from "prop-types";
import { useState } from "react";
import { TableLine } from "./TableLine.jsx";

export const Table = ({ coinsData }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("");

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
