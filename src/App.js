import logo from "./logo.svg";
import main from "./styles/main.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import BusList from "./components/BusList";
import Spinner from "./components/Spinner";
import useSWR from "swr";
import useBus from "./components/useUser";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [postCode, setPostCode] = useState("");
  // const [buses, setBuses] = useState([]);
  // const [isLoading, setLoading] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.data.response);

  const { buses, error, isLoading, hasRun } = useBus(postCode);

  const onSubmit = async (e) => {
    e.preventDefault();
    // setBuses([]);
    console.log(e.currentTarget.elements.postCode.value);
    const res = await axios.get(
      `/bus/${e.currentTarget.elements.postCode.value}`
    );
    // setBuses(res.data.response);
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
        {!hasRun && !isLoading && buses.length == 0 && (
          <p>Bus Times Displayed Here</p>
        )}
        {!isLoading && hasRun && buses.length == 0 && (
          <p className="error">Time to walk buddy...</p>
        )}
        {buses.length > 0 && <BusList stops={buses} />}
      </div>
    </div>
  );
}

export default App;
