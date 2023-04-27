import main from "./styles/main.scss";
import { useState } from "react";
import BusList from "./components/BusList";
import Spinner from "./components/Spinner";
import useBus from "./components/useBus";

function App() {
  const [postCode, setPostCode] = useState("");

  const { buses, error, isLoading, hasRun } = useBus(postCode);

  function debounce(func, timeout = 1000) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function savePostCode(temp) {
    setPostCode(temp);
  }

  const processChange = debounce((e) => savePostCode(e.target.value));

  return (
    <div className="container">
      <div className="headerBox">
        <h1 className="header">Thomas the Bus</h1>
        <p>Don't find the bus, let the bus find you!</p>
      </div>
      <form className="inputBox">
        <input
          id="postCode"
          onChange={processChange}
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
