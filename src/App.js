import { useEffect, useState } from "react";
import AppStyles from "./AppStyles.css";
import WeatherInfo from "./WeatherInfo";
import ErrorMessage from "./ErrorMessage";
import Cloudy from "./assets/cloudy.png";

const App = () => {
  const [input, setInput] = useState("");
  const [resData, setResData] = useState([{}]);
  const [canDisplay, setCanDisplay] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const api = "cf38b554d9b67da4a603358cb8d511ee";

  const handleCityChange = (event) => {
    const key = event.code;
    if (key === "Enter" && input !== "") {
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
      {/* LEFT PART LOCATION, DATE AND WEATHER STATUS DISPLAY */}
      <div className="left-part">
        <div className="top-part">
          <p id="company-name">the.weather</p>
        </div>

        {/* LOCATION DATE AND WEATHER */}
        <div className="bottom-part">
          <div className="weather-display">
            {/* TEMPERATURE */}
            <p id="temperature">16°</p>
            {/* LOCATION */}
            <div className="location">
              <p id="city">London</p>
              {/* DATE */}
              <p id="time">06:09 - Monday, 6 Jul '22</p>
            </div>
            {/* WEATHER STATUS */}
            <div className="weather">
              <img src={Cloudy} alt="weather-icon" id="weather-icon" />
              <p id="weather">Cloudy</p>
            </div>
          </div>
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
          />
          {/* LOCATION SUGGESTIONS */}
          <div className="location-suggestions">
            <p>
              <a href="">Birmingham</a>
            </p>
            <p>
              <a href="">Manchester</a>
            </p>
            <p>
              <a href="">New York</a>
            </p>
            <p id="last-suggestion">
              <a href="">California</a>
            </p>
          </div>
          {/* WEATHER DETAILS */}
          <div className="weather-details">
            <p id="header">Weather Details</p>
            {/* CLOUDINESS */}
            <div className="detail">
              <p className="description">Cloudy</p>
              <p id="cloudy-percentage" className="quanity">
                86%
              </p>
            </div>
            {/* HUMIDITY */}
            <div className="detail">
              <p className="description">Humidity</p>
              <p id="humidity-percentage" className="quanity">
                62%
              </p>
            </div>
            {/* WIND */}
            <div className="detail">
              <p className="description">Wind</p>
              <p id="wind-speed" className="quanity">
                8km/h
              </p>
            </div>
            {/* PRESSURE */}
            <div className="detail">
              <p className="description">Pressure</p>
              <p id="pressure-value" className="quanity">
                1021hPa
              </p>
            </div>
            {/* MIN. TEMPERATURE */}
            <div className="detail">
              <p className="description">Min. Temperature</p>
              <p id="min-temp" className="quanity">
                13°
              </p>
            </div>
            {/* MAX. TEMPERATURE */}
            <div className="detail">
              <p className="description">Max. Temperature</p>
              <p id="max-temp" className="quanity">
                18°
              </p>
            </div>
            {/* FEELS LIKE TEMPERETURE */}
            <div className="detail">
              <p className="description">Feels Like</p>
              <p id="feels-like" className="quanity">
                14°
              </p>
            </div>
            {/* SOURCE */}
            <div className="detail">
              <p className="description">Source</p>
              <p id="source" className="quanity">
                Stations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
