import { useState } from "react";
import React from "react";
// eslint-disable-next-line
import AppStyles from "./AppStyles.css";
import WeatherFooter from "./WeatherFooter.js";
import WeatherDetails from "./WeatherDetails.js";
import Location from "./assets/mobile/location.png";
import Clear from "./assets/Clear.png";
import Search from "./assets/mobile/search.png";
import Details from "./assets/mobile/weather.png";

const App = () => {
  const classes = {
    topBarInitial: "top-bar",
    topBarAdditional: "isInDetails",
    footerInitial: "footer",
    footerAdditional: "footerIsInDetails",
  };
  const [input, setInput] = useState("London");
  const [weatherData, setWeatherData] = useState([{}]);
  const [timeData, setTimeData] = useState([{}]);
  const [canDisplay, setCanDisplay] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isInDetails, setIsInDetails] = useState(false);
  const api = "cf38b554d9b67da4a603358cb8d511ee";

  const handleInput = (event) => {
    const key = event.code;
    const buttonCall = event.type;
    if ((key === "Enter" && input !== "") || buttonCall === "click") {
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

  const handleSearch = () => {
    setIsSearching((prev) => !prev);
  };

  const handleDetails = () => {
    const topBar = document.getElementById("top-bar");
    const footer = document.getElementById("footer");
    if (!isInDetails) {
      topBar.className = `${classes.topBarInitial} ${classes.topBarAdditional}`;
      footer.className = `${classes.footerInitial} ${classes.footerAdditional}`;
    } else {
      topBar.className = classes.topBarInitial;
      footer.className = classes.footerInitial;
    }
    setIsInDetails((prev) => !prev);
  };

  return (
    <div className="App" id="App">
      <div className="desktop">
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
        <div className="right-part" id="right-part">
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
                <a onClick={(ev) => setInput(ev.target.textContent)}>
                  New York
                </a>
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
      <div className="mobile">
        {isSearching && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Another Location"
                value={input}
                onChange={(ev) => setInput(ev.target.value)}
              />
              <button id="search-button" onClick={(ev) => handleInput(ev)}>
                <img src={Search} alt="search-icon" id="search-img" />
              </button>
            </div>
          </>
        )}

        <div className="top-bar" id="top-bar">
          <div className="top">
            <p id="loc">
              {weatherData.name}, {timeData.countryName}
            </p>
            <img src={Location} alt="location icon" id="location-icon" />
          </div>
          <div className="details">
            {!isPending && canDisplay && isInDetails && (
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
        <div className="middle-part">
          {!isPending && canDisplay && (
            <WeatherFooter
              temperature={weatherData.main.temp}
              location={weatherData.name}
              weather={weatherData.weather[0].main}
              date={timeData.formatted}
            />
          )}
        </div>
        <div className="footer" id="footer">
          <ul>
            {!isInDetails && (
              <li>
                <button className="footer-btn" onClick={handleSearch}>
                  <img src={Search} alt="search-icon" className="icon" />
                </button>
              </li>
            )}
            {!isSearching && (
              <li>
                <button className="footer-btn" onClick={handleDetails}>
                  <img src={Details} alt="details-icon" className="icon" />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
