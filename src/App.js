import logo from "./logo.svg";
import main from "./styles/main.scss";
import { useEffect, useState } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [postCode, setPostCode] = useState("");

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.elements.postCode.value);
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
            console.log(e.currentTarget.value);
          }}
          placeholder="CB11AJ"
          className="input"
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default App;
