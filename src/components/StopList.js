import bus from "../styles/busList.scss";
import BusBox from "./BusBox";

const BusList = ({ stops }) => {
  return (
    <div className="stopContainer" role="stopContainer">
      {stops.map((stop, index) => (
        <div key={index} className="stopBox">
          <div className="stopHeader">
            <p className="roadName" role="roadName">
              {stop.roadName}
            </p>
            <p className="stopName" role="stopName">
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

export default BusList;