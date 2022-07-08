const WeatherDetails = (props) => {
  const {
    cloudiness,
    humidity,
    wind,
    pressure,
    minTemp,
    maxTemp,
    feelsLike,
    source,
  } = props;

  const convertToCelsius = (value) => {
    const celsius = (value - 32) / 1.8;
    return parseInt(celsius);
  };

  return (
    <div className="weather-details">
      <p id="header">Weather Details</p>
      {/* CLOUDINESS */}
      <div className="detail">
        <p className="description">Cloudy</p>
        <p id="cloudy-percentage" className="quanity">
          {cloudiness}%
        </p>
      </div>
      {/* HUMIDITY */}
      <div className="detail">
        <p className="description">Humidity</p>
        <p id="humidity-percentage" className="quanity">
          {humidity}%
        </p>
      </div>
      {/* WIND */}
      <div className="detail">
        <p className="description">Wind</p>
        <p id="wind-speed" className="quanity">
          {parseInt(wind)}km/h
        </p>
      </div>
      {/* PRESSURE */}
      <div className="detail">
        <p className="description">Pressure</p>
        <p id="pressure-value" className="quanity">
          {pressure}hPa
        </p>
      </div>
      {/* MIN. TEMPERATURE */}
      <div className="detail">
        <p className="description">Min. Temperature</p>
        <p id="min-temp" className="quanity">
          {convertToCelsius(minTemp)}°
        </p>
      </div>
      {/* MAX. TEMPERATURE */}
      <div className="detail">
        <p className="description">Max. Temperature</p>
        <p id="max-temp" className="quanity">
          {convertToCelsius(maxTemp)}°
        </p>
      </div>
      {/* FEELS LIKE TEMPERETURE */}
      <div className="detail">
        <p className="description">Feels Like</p>
        <p id="feels-like" className="quanity">
          {convertToCelsius(feelsLike)}°
        </p>
      </div>
      {/* SOURCE */}
      <div className="detail">
        <p className="description">Source</p>
        <p id="source" className="quanity">
          {source}
        </p>
      </div>
    </div>
  );
};

export default WeatherDetails;
