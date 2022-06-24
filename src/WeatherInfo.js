import { useState, useEffect } from "react";
const WeatherInfo = (props) => {
  const { temperature, pressure, weather } = props;
  const units = {
    fahrenheit: "°F",
    celsius: "°C",
  };
  const toCelsius = Math.floor((parseFloat(temperature) - 32) / 1.8);
  const [unit, setUnit] = useState(units.fahrenheit);
  const [fixedTemperature, setFixedTemperature] = useState(
    Math.floor(temperature)
  );
  const changeUnit = (ev) => {
    const currentUnit = ev.target.className;
    switch (currentUnit) {
      case units.fahrenheit:
        setFixedTemperature(Math.floor(toCelsius));
        setUnit(units.celsius);
        break;
      case units.celsius:
        setFixedTemperature(Math.floor(temperature));
        setUnit(units.fahrenheit);
        break;
      default:
        console.log("Error no unit found");
    }
  };

  return (
    <>
      <h3 id="temperature" onClick={(ev) => changeUnit(ev)} className={unit}>
        {fixedTemperature}
        {unit}
        <p id="unit-change-info">u can change unit by clicking the text</p>
      </h3>
      <h3 id="pressure">{pressure} hPa</h3>
      <h3 id="weather">{weather}</h3>
    </>
  );
};

export default WeatherInfo;
