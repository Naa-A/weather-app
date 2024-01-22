import axios from "axios";
import React, { useState } from "react";

export default function Weather(props) {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  let [temp, setTemp] = useState(null);

  function handleSubmit(event) {
    let apiKey = "197ef3a642b76eef90e131866f74a0a0";
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    event.preventDefault();
    setCity("");
    axios.get(URL).then(display);
  }
  function submittedCity(event) {
    setCity(event.target.value);
  }
  function display(response) {
    setLoaded(true);
    setTemp({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city.."
        onChange={submittedCity}
      />
      <button type="Submit">Search</button>
    </form>
  );

  console.log(URL);

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(temp.temperature)}°C</li>
          <li>Description: {temp.description}</li>
          <li>Humidity: {temp.humidity}%</li>
          <li>Wind: {temp.wind}km/h</li>
          <li style={{ display: "flex", justifyContent: "center" }}>
            <img src={temp.icon} alt={temp.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
