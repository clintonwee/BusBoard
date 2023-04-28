import "../styles/busBox.scss";

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

export default BusBox;
