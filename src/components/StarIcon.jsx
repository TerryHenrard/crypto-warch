import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const StarIcon = ({ coinId }) => {
  const [like, setLike] = useState(false);

  const idChecker = (id) => {
    let favList = null;

    if (window.localStorage.coinList) {
      favList = window.localStorage.coinList.split(",");
    }

    if (favList) {
      if (favList.includes(id)) {
        window.localStorage.coinList = favList.filter((coin) => coin !== id);
        setLike(false);
      } else {
        window.localStorage.coinList = [...favList, coinId];
        setLike(true);
      }
    } else {
      window.localStorage.coinList = coinId;
      setLike(true);
    }
  };

  useEffect(() => {
    if (window.localStorage.coinList) {
      let favList = window.localStorage.coinList.split(",");

      if (favList.includes(coinId)) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  }, [coinId]);

  return (
    <img
      src={like ? "/assets/star-full.svg" : "/assets/star-empty.svg"}
      alt={"star icon"}
      onClick={() => idChecker(coinId)}
    />
  );
};

StarIcon.propTypes = {
  coinId: PropTypes.string.isRequired,
};
