import "../styles/stopList.scss";
import BusBox from "./BusBox";
import React from "react";
import PropTypes from "prop-types";

const StopList = ({ stops }) => {
  return (
    <div className="stopContainer" data-testid="stopContainer">
      {stops.map((stop, index) => (
        <div key={index} className="stopBox">
          <div className="stopHeader">
            <p className="roadName" data-testid="roadName">
              {stop.roadName}
            </p>
            <p className="stopName" data-testid="stopName">
              {stop.stopName}
            </p>
          </div>
          {stop.buses.map((bus, index) => (
            <BusBox key={index} bus={bus} />
          ))}
        </div>
      ))}
    </div>
  );
};

StopList.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      stopName: PropTypes.string,
      roadName: PropTypes.string,
    })
  ),
};

export default StopList;
