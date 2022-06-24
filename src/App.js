import AppStyles from "./AppStyles.css";

const App = () => {
  return (
    <div className="App">
      <div className="weather-card">
        <input type="text" />
        <h1 id="city">Warsaw</h1>
        <div className="weather-info">
          <h3 id="temperature">30°C</h3>
          <h3 id="pressure">1013 hPa</h3>
          <h3 id="weather">Sunny</h3>
        </div>
      </div>
    </div>
  );
};

export default App;
