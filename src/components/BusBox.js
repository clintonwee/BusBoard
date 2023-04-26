import bus from "../styles/busBox.scss";

const BusBox = ({ bus }) => {
  return (
    <div className="busBox">
      <p className="busItem">{bus.busName}</p>
      <p className="busItem">{bus.destination}</p>
      <p className="busItem">{Math.ceil(bus.eta / 60)} minutes</p>
    </div>
  );
};

export default BusBox;
