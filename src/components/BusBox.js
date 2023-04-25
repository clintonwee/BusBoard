import bus from "../styles/busBox.scss";

const BusBox = ({ bus }) => {
  return (
    <div className="busBox">
      <p>{bus.busName}</p>
      <p>{bus.destination}</p>
      <p>{bus.eta}</p>
    </div>
  );
};

export default BusBox;
