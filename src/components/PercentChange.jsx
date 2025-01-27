import { useEffect, useState } from "react";
import colors from "../styles/_settings.module.scss";
import PropTypes from "prop-types";

export const PercentChange = ({ percent }) => {
  const [color, setColor] = useState();

  const determineColor = (percent) => {
    if (!percent) {
      return colors.white1;
    }
    return percent >= 0 ? colors.green1 : colors.red1;
  };

  useEffect(() => {
    setColor(determineColor(percent));
  }, [percent]);

  return (
    <p className={"percent-change-container"} style={{ color }}>
      {percent ? percent.toFixed(1) + "%" : "-"}
    </p>
  );
};

PercentChange.propTypes = {
  percent: PropTypes.number,
};
