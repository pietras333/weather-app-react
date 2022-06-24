import { useState, useEffect } from "react";
import AppStyles from "./AppStyles.css";
import WeatherInfo from "./WeatherInfo";
import ErrorMessage from "./ErrorMessage";

const App = () => {
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState([{}]);
  const [canDownloadData, setCanDownloadData] = useState(false);
  const api = ":)";

  const handleCityChange = (event) => {
    const key = event.code;
    if (key === "Enter") {
      if (canDownloadData) {
        getApiData();
        setInput("");
        document.title = "Whats weather in " + apiData.name + "?";
      }
    }
  };

  const canDisplayData = (data) => {
    if (Object.keys(data).length === 1) {
      return false;
    } else {
      return true;
    }
  };

  const getApiData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&APPID=${api}`
    )
      .then((res) => {
        console.log("res ===", res);
        if (res.ok === false) {
          console.log("res.ok", res.ok);
          setCanDownloadData(false);
        } else {
          setCanDownloadData(true);
          return res.json();
        }
      })
      .then((data) => {
        setApiData(data);
      });
  };

  const restoreToDefaults = () => {
    setApiData([{}]);
    setCanDownloadData(true);
    setInput("");
  };

  return (
    <div className="App">
      <div className="weather-card">
        <div className="top-section">Check your weather!</div>
        <input
          type="text"
          value={input}
          onChange={(ev) => setInput(ev.target.value)}
          onKeyPress={(ev) => handleCityChange(ev)}
        />
        {canDisplayData(apiData) && <h1 id="city">{apiData.name}</h1>}
        {!canDownloadData && (
          <>
            <ErrorMessage />
            <button id="try-again" onClick={restoreToDefaults}>
              Try again
            </button>
          </>
        )}
        <div className="weather-info">
          {canDisplayData(apiData) && (
            <WeatherInfo
              temperature={apiData.main.temp}
              pressure={apiData.main.pressure}
              weather={apiData.weather[0].description}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
