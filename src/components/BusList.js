import bus from "../styles/busList.scss";
import BusBox from "./BusBox";

const BusList = ({ stops }) => {
  return (
    <div className="stopContainer">
      {stops.map((stop, index) => (
        <div key={index} className="stopBox">
          <div className="stopHeader">
            <p className="roadName">{stop.roadName}</p>
            <p className="stopName">{stop.stopName}</p>
          </div>
          {stop.buses.map((bus, index) => (
            <BusBox key={index} bus={bus} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BusList;
