import React from "react";
import Parameter from "./Parameter";

const weatherIcon = `https://openweathermap.org/img/w`;
const countryIcon = `https://flagcdn.com/144x108/`;
export default function WeatherContainer(props) {
  const weatherParameters = {
    windSpeed: props.weatherInfo?.wind?.speed,
    humidity: props.weatherInfo?.main?.humidity,
    cloudiness: props.weatherInfo?.clouds?.all,
  };

  return (
    <div className="weather-container">
      <div className="location-container">
        <p className="location">{props.weatherInfo?.name} </p>
        <img
          className="country-flag"
          src={`${countryIcon}/${props.weatherInfo?.sys?.country.toLowerCase()}.png`}
        />
      </div>
      <p className="description">
        {props.weatherInfo?.weather?.[0].description}
      </p>
      <div className="weather-icon">
        <img
          src={`${weatherIcon}/${props.weatherInfo?.weather?.[0]?.icon}.png`}
          alt="Weather condition image"
        />
      </div>
      <p className="temperature">{`${Number(
        props.weatherInfo?.main?.temp > 50
          ? props.weatherInfo?.main?.temp - 273.15
          : props.weatherInfo?.main?.temp
      ).toFixed(2)} °C`}</p>
      <Parameter weatherParam={weatherParameters} />{" "}
    </div>
  );
}
