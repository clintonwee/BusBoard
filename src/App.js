import main from "./styles/main.scss";
import { useState } from "react";
import StopList from "./components/StopList";
import Spinner from "./components/Spinner";
import useBus from "./utils/useBus";
import { delayFunction } from "./utils/helper";

function App() {
  const [postCode, setPostCode] = useState("");

  const { buses, error, isLoading, hasRun } = useBus(postCode);

  function savePostCode(temp) {
    setPostCode(temp);
  }

  const processPostCodeChange = delayFunction((e) =>
    savePostCode(e.target.value)
  );

  const showOriginalMessage =
    (!hasRun && !error && !isLoading && buses.length === 0) ||
    postCode.length === 0;

  const showErrorMessage = error && !isLoading;

  const showNoBusMessage =
    postCode.length !== 0 && !error && !isLoading && buses.length === 0;

  const showBusList = postCode.length > 0 && buses.length > 0;

  return (
    <div className="container">
      <div className="headerBox">
        <h1 className="header">Thomas the Bus</h1>
        <p>Don't find the bus, let the bus find you!</p>
      </div>
      <form className="inputBox">
        <input
          onChange={processPostCodeChange}
          placeholder="CB11AJ"
          className="input"
        />
      </form>
      <div className="resultBox">
        {isLoading && <Spinner />}
        {showOriginalMessage && <p>Bus Times Displayed Here</p>}
        {showNoBusMessage && (
          <p className="error" role="noBus">
            Time to walk buddy...
          </p>
        )}
        {showErrorMessage && (
          <p className="error" role="error">
            Invalid Postcode...
          </p>
        )}
        {showBusList && <StopList stops={buses} />}
      </div>
    </div>
  );
}

export default App;
