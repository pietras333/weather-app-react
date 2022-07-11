import { useState } from "react";
import React from "react";
// eslint-disable-next-line
import AppStyles from "./AppStyles.css";
import WeatherFooter from "./WeatherFooter";
import WeatherDetails from "./WeatherDetails";

const App = () => {
  const [input, setInput] = useState("London");
  const [weatherData, setWeatherData] = useState([{}]);
  const [timeData, setTimeData] = useState([{}]);
  const [canDisplay, setCanDisplay] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const api = "cf38b554d9b67da4a603358cb8d511ee";

  const handleInput = (event) => {
    const key = event.code;
    if (key === "Enter" && input !== "") {
      handleRequests();
      setInput("");
    }
  };

  const getWeatherData = () => {
    setIsPending(true);
    const fetched = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&APPID=${api}`
    ).then((res) => {
      return res.json();
    });
    return fetched;
  };

  const handleRequests = async () => {
    // Weather data
    let lat = 0;
    let lon = 0;
    try {
      const response = await getWeatherData();
      if (response.cod === "404") {
        setCanDisplay(false);
      } else {
        setWeatherData(response);
        lat = response.coord.lat;
        lon = response.coord.lon;
        setCanDisplay(true);
      }
      setIsPending(false);
    } catch (err) {
      console.log("error ===", err);
    }

    // Time data
    try {
      const response = await getTimeData(lat, lon);
      if (response.cod === "404") {
        setCanDisplay(false);
      } else {
        setTimeData(response);
        setCanDisplay(true);
      }
      setIsPending(false);
    } catch (err) {
      console.log("error ===", err);
    }
  };

  const getTimeData = (lat, lon) => {
    setIsPending(true);
    const fetched = fetch(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=5S1STD8Y7SCE&format=json&by=position&lat=${lat}&lng=${lon}`
    ).then((res) => {
      return res.json();
    });
    return fetched;
  };

  return (
    <div className="App" id="App">
      {isPending && <div className="loading"></div>}

      {/* LEFT PART LOCATION, DATE AND WEATHER STATUS DISPLAY */}
      <div className="left-part">
        <div className="top-part">
          <p id="company-name">your.weather</p>
          <p id="powered-by">Powered By Openweathermap</p>
          <p id="powered-by">Made By Piotr Wendt</p>
          <p id="heading">Check Your Weather</p>
        </div>

        {/* LOCATION DATE AND WEATHER */}
        <div className="bottom-part">
          {!isPending && canDisplay && (
            <WeatherFooter
              temperature={weatherData.main.temp}
              location={weatherData.name}
              weather={weatherData.weather[0].main}
              date={timeData.formatted}
            />
          )}
        </div>
      </div>

      {/* RIGHT PART (WEATHER DETAILS, INPUT etc.) */}
      <div className="right-part">
        <div className="location-menu">
          {/* INPUT */}
          <input
            type="text"
            placeholder="Another Location"
            id="location-input"
            value={input}
            onChange={(ev) => setInput(ev.target.value)}
            onKeyPress={(ev) => handleInput(ev)}
          />
          {/* LOCATION SUGGESTIONS */}
          <div className="location-suggestions">
            <p>
              {/* eslint-disable-next-line */}
              <a onClick={(ev) => setInput(ev.target.textContent)}>
                Birmingham
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line */}
              <a onClick={(ev) => setInput(ev.target.textContent)}>
                Manchester
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line */}
              <a onClick={(ev) => setInput(ev.target.textContent)}>New York</a>
            </p>
            <p id="last-suggestion">
              {/* eslint-disable-next-line */}
              <a onClick={(ev) => setInput(ev.target.textContent)}>
                California
              </a>
            </p>
          </div>
          {/* WEATHER DETAILS */}
          {!isPending && canDisplay && (
            <WeatherDetails
              cloudiness={weatherData.clouds.all}
              humidity={weatherData.main.humidity}
              wind={weatherData.wind.speed}
              pressure={weatherData.main.pressure}
              minTemp={weatherData.main.temp_min}
              maxTemp={weatherData.main.temp_max}
              feelsLike={weatherData.main.feels_like}
              source={weatherData.base}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
