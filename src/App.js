import { useEffect, useState } from "react";
import AppStyles from "./AppStyles.css";
import WeatherInfo from "./WeatherInfo";
import ErrorMessage from "./ErrorMessage";

const App = () => {
  const [input, setInput] = useState("");
<<<<<<< HEAD
  const [resData, setResData] = useState([{}]);
  const [canDisplay, setCanDisplay] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const api = "cf38b554d9b67da4a603358cb8d511ee";
=======
  const [apiData, setApiData] = useState([{}]);
  const [canDownloadData, setCanDownloadData] = useState(false);
  const api = ":)";
>>>>>>> 28e67829f531a99fb0b6dea1170e7b7e7aaa67a8

  const handleCityChange = (event) => {
    const key = event.code;
    if (key === "Enter") {
      handleAPIRequest();
      setIsChecking(true);
      setInput("");
    }
  };

  const makeAPIRequest = () => {
    setIsPending(true);
    const fetched = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&APPID=${api}`
    ).then((res) => {
      return res.json();
    });
    return fetched;
  };

  const handleAPIRequest = async () => {
    try {
      const response = await makeAPIRequest();
      if (response.cod === "404") {
        setCanDisplay(false);
      } else {
        setResData(response);
        setCanDisplay(true);
      }
      setIsPending(false);
    } catch (err) {
      console.log("error ===", err);
    }
  };

  const restoreToDefaults = () => {
    setResData([{}]);
    setCanDisplay(false);
    setIsChecking(false);
    setIsPending(false);
    setInput("");
  };

  return (
    <div className="App">
      {isPending && <div className="loader"></div>}
      <div className="weather-card">
        {!isPending && (
          <>
            <div className="top-section">Check your weather!</div>
            <input
              type="text"
              value={input}
              onChange={(ev) => setInput(ev.target.value)}
              onKeyPress={(ev) => handleCityChange(ev)}
            />
            {canDisplay && isChecking && (
              <h1 id="city" key={resData.name}>
                {resData.name}
              </h1>
            )}

            {!canDisplay && isChecking && (
              <>
                <ErrorMessage />
                <button
                  id="try-again"
                  onClick={restoreToDefaults}
                  key={resData.name}
                >
                  Try again
                </button>
              </>
            )}

            {canDisplay && isChecking && (
              <div className="weather-info">
                <WeatherInfo
                  key={resData.name}
                  temperature={resData.main.temp}
                  pressure={resData.main.pressure}
                  weather={resData.weather[0].description}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
