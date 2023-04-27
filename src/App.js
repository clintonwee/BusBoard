import logo from "./logo.svg";
import main from "./styles/main.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import BusList from "./components/BusList";
import Spinner from "./components/Spinner";
import useSWR from "swr";
import useBus from "./components/useBus";

function App() {
  const [postCode, setPostCode] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.data.response);

  const { buses, error, isLoading, hasRun } = useBus(postCode);

  return (
    <div className="container">
      <div className="headerBox">
        <h1 className="header">Thomas the Bus</h1>
        <p>Don't find the bus, let the bus find you!</p>
      </div>
      <form className="inputBox">
        <input
          id="postCode"
          onChange={(e) => {
            setPostCode(e.currentTarget.value);
          }}
          placeholder="CB11AJ"
          className="input"
        />
      </form>
      <div className="resultBox">
        {isLoading && <Spinner />}
        {((!hasRun && !error && !isLoading) || postCode.length === 0) && (
          <p>Bus Times Displayed Here</p>
        )}
        {postCode.length !== 0 &&
          !error &&
          !isLoading &&
          buses.length === 0 && <p className="error">Time to walk buddy...</p>}
        {error && !isLoading && <p className="error">Invalid Postcode...</p>}
        {postCode.length > 0 && buses.length > 0 && <BusList stops={buses} />}
      </div>
    </div>
  );
}

export default App;
