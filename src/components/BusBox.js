import "../styles/busBox.scss";
import React from "react";
import PropTypes from "prop-types";

const BusBox = ({ bus }) => {
  return (
    <div className="busBox" data-testid="busBox">
      <p className="busItem" data-testid="busName">
        {bus.busName}
      </p>
      <p className="busItem" data-testid="busDestination">
        {bus.destination}
      </p>
      <p className="busItem" data-testid="busEta">
        {Math.floor(bus.eta / 60)} min {bus.eta % 60} s
      </p>
    </div>
  );
};

BusBox.propTypes = {
  bus: [{ busName: String, destination: String, eta: String }],
};

BusBox.propTypes = {
  bus: PropTypes.shape({
    busName: PropTypes.string,
    destination: PropTypes.string,
    eta: PropTypes.number,
  }),
};

export default BusBox;
