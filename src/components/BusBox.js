import bus from "../styles/busBox.scss";

const BusBox = ({ bus }) => {
  return (
    <div className="busBox" role="busBox">
      <p className="busItem" role="busName">
        {bus.busName}
      </p>
      <p className="busItem" role="busDestination">
        {bus.destination}
      </p>
      <p className="busItem" role="busEta">
        {Math.floor(bus.eta / 60)} min {bus.eta % 60} s
      </p>
    </div>
  );
};

export default BusBox;
