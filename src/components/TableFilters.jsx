import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStableState } from "../actions/stable.action.js";
import { setListDisplay } from "../actions/list.action.js";

export const TableFilters = () => {
  const [showStable, setShowStable] = useState(true);
  const [showFavList, setShowFavList] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStableState(showStable));
    dispatch(setListDisplay(showFavList));
  }, [dispatch, showFavList, showStable]);

  return (
    <div className={"table-filters"}>
      <div className={"table-filters-container"}>
        <div className={"stable-checkbox-container"}>
          <input
            type={"checkbox"}
            id={"stableCoin"}
            defaultChecked={true}
            onChange={() => setShowStable(!showStable)}
          />
          <label htmlFor={"stableCoin"}>
            {showStable ? "Avec" : "sans"} stable coin
          </label>
        </div>
        <div
          className={`no-list-btn ${showFavList ? "" : "active"}`}
          onClick={() => setShowFavList(false)}
        >
          <p>Aucune liste</p>
        </div>
        <div
          className={`fav-list ${showFavList ? "active" : ""}`}
          onClick={() => setShowFavList(true)}
        >
          <p>Liste des favoris</p>
          <img src={"/assets/star-full.svg"} alt={"star filled in blue"} />
        </div>
      </div>
    </div>
  );
};
