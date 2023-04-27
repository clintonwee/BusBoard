import bus from "../styles/busBox.scss";

const BusBox = ({ bus }) => {
  return (
    <div className="busBox">
      <p className="busItem">{bus.busName}</p>
      <p className="busItem">{bus.destination}</p>
      <p className="busItem">
        {Math.floor(bus.eta / 60)} min {bus.eta % 60} s
      </p>
    </div>
  );
};

export default BusBox;
