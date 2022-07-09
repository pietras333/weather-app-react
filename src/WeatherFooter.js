import React from "react";
const Cloudy = require("./Assets/Cloudy.png");
const Rainy = require("./Assets/Rainy.png");
const Clear = require("./Assets/Clear.png");
const Error = require("./Assets/Error.png");
const DayJPG = require("./Assets/day.jpg");
const EveningJPG = require("./Assets/evening.jpg");
const MorningJPG = require("./Assets/morning.jpg");
const NightJPG = require("./Assets/night.jpg");

const WeatherFooter = (props) => {
  const { temperature, location, weather, date } = props;
  const temperatureFix = (temperature - 32) / 1.8;
  const appDoc = document.getElementById("App");

  let year = "";
  let month = "";
  let day = "";
  let hours = "";
  let minutes = "";
  let dayName = "";

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const format = () => {
    const split = date.split(" ");
    const thisDate = split[0];
    const dateFormat = thisDate.replace("-", "");
    year = dateFormat.substring(2, 4);
    const _month = dateFormat.substring(4, 6);
    day = dateFormat.substring(7, 9);
    month = months[parseInt(_month) - 1];
    const thisTime = split[1];
    const timeFormat = thisTime.replace(":", "");
    hours = timeFormat.substring(0, 2);
    minutes = timeFormat.substring(2, 4);
    const d = new Date(date);
    dayName = d.getDay();
  };

  const handleWeatherIcon = () => {
    switch (weather) {
      case "Clouds":
        return Cloudy;
      case "Rain":
        return Rainy;
      case "Clear":
        return Clear;
      default:
        return Error;
    }
  };

  // Night 22:00 6:00
  // Morning 6:00 12:00
  // Day 12:00 17:00
  // Evening 17:00 22:00

  const handleBackgroundChange = () => {
    if (hours >= 6 && hours < 12) {
      appDoc.style.backgroundImage = `url(${MorningJPG})`;
    }
    if (hours >= 12 && hours < 17) {
      appDoc.style.backgroundImage = `url(${DayJPG})`;
    }
    if (hours >= 17 && hours < 22) {
      appDoc.style.backgroundImage = `url(${EveningJPG})`;
    }
    if (hours >= 22 || hours < 6) {
      appDoc.style.backgroundImage = `url(${NightJPG})`;
    }
  };

  format();
  handleBackgroundChange();
  return (
    <div className="weather-display">
      {/* TEMPERATURE */}
      <p id="temperature">{parseInt(temperatureFix)}°</p>
      {/* LOCATION */}
      <div className="location">
        <p id="city">{location}</p>
        {/* DATE */}
        <p id="time">
          {hours}:{minutes} - {dayNames[dayName]}, {day} {month} '{year}
        </p>
      </div>
      {/* WEATHER STATUS */}
      <div className="weather">
        <img src={handleWeatherIcon()} alt="weather-icon" id="weather-icon" />
        <p id="weather">{weather}</p>
      </div>
    </div>
  );
};

export default WeatherFooter;
