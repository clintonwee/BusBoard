import logo from "./logo.svg";
import main from "./styles/main.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import BusList from "./components/BusList";
import Spinner from "./components/Spinner";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [postCode, setPostCode] = useState("");
  const [buses, setBuses] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBuses([]);
    setLoading(true);
    console.log(e.currentTarget.elements.postCode.value);
    const res = await axios.get(
      `/bus/${e.currentTarget.elements.postCode.value}`
    );
    setBuses(res.data.response);
    setLoading(false);
    console.log(res.data);
  };

  return (
    <div className="container">
      <div className="headerBox">
        <h1 className="header">Bus Board</h1>
        <p>Don't find the bus, let the bus find you!</p>
      </div>
      <form className="inputBox" onSubmit={onSubmit}>
        <input
          id="postCode"
          onChange={(e) => {
            setPostCode(e.currentTarget.value);
          }}
          placeholder="CB11AJ"
          className="input"
        />
        <button type="submit">{"Submit"}</button>
      </form>
      <div className="resultBox">
        {isLoading && <Spinner />}
        {!isLoading && buses.length <= 0 && <p>Bus Times Displayed Here</p>}
        {buses.length > 0 && <BusList stops={buses} />}
      </div>
    </div>
  );
}

export default App;
