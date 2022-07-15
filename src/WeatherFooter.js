import React from "react";
import Cloudy from "./assets/Cloudy.png";
import Rainy from "./assets/Rainy.png";
import Clear from "./assets/Clear.png";
import Error from "./assets/Error.png";
import DayJPG from "./assets/day.jpg";
import EveningJPG from "./assets/evening.jpg";
import MorningJPG from "./assets/morning.jpg";
import NightJPG from "./assets/night.jpg";
import MorningMobile from "./assets/mobile/mobileMorning.jpg";
import EveningMobile from "./assets/mobile/mobileEvening.jpg";
import DayMobile from "./assets/mobile/mobileDay.jpg";
import NightMobile from "./assets/mobile/mobileNight.jpg";

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
    const windowWidth = window.screen.width;
    if (hours >= 6 && hours < 12) {
      if (windowWidth <= 450) {
        appDoc.style.backgroundImage = `url(${MorningMobile})`;
      } else {
        appDoc.style.backgroundImage = `url(${MorningJPG})`;
      }
    }
    if (hours >= 12 && hours < 17) {
      if (windowWidth <= 450) {
        appDoc.style.backgroundImage = `url(${DayMobile})`;
      } else {
        appDoc.style.backgroundImage = `url(${DayJPG})`;
      }
    }
    if (hours >= 17 && hours < 22) {
      if (windowWidth <= 450) {
        appDoc.style.backgroundImage = `url(${EveningMobile})`;
      } else {
        appDoc.style.backgroundImage = `url(${EveningJPG})`;
      }
    }
    if (hours >= 22 || hours < 6) {
      if (windowWidth <= 450) {
        appDoc.style.backgroundImage = `url(${NightMobile})`;
      } else {
        appDoc.style.backgroundImage = `url(${NightJPG})`;
      }
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
