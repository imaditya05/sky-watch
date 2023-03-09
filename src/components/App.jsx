import React, { useState } from "react";
import Header from "./Header";
import OptionContainer from "./OptionContainer";
import WeatherContainer from "./WeatherContainer";
import Entry from "./Entry";
import LoadingScreen from "./LoadingScreen";
import SearchContainer from "./SearchContainer";
import Error from "./Error";

let weatherData = {};

export default function App() {
  const [accessFlag, setaccessFlag] = useState(true);
  const [lodingScreen, setLoadingScreen] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [searchCity, setSearchCity] = useState(false);
  const [showWeatherBox, setWeatherBox] = useState(false);
  const [error, setError] = useState(false);

  function getLatLong() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };

      sessionStorage.setItem(
        "user-coordinates",
        JSON.stringify(userCoordinates)
      );
      fetchUserWeatherInfo(userCoordinates);
    }

    function showError(error) {
      let message = "";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          message = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          message = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          message = "An unknown error occurred.";
          break;
      }
    }
  }

  function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (localCoordinates) {
      const coordinates = JSON.parse(localCoordinates);
      fetchUserWeatherInfo(coordinates);
    } else {
      setaccessFlag(true);
    }
  }
  async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // make grantcontainer invisible
    setaccessFlag(false);
    //make loader visible
    setLoadingScreen(true);

    //API CALL
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );
      const data = await response.json();
      if (data.cod === "404") {
        throw new Error(`Please check your location permissions `);
      }

      setLoadingScreen(false);
      //Show weather container
      setWeatherBox(true);
      setWeatherData(data);
    } catch (err) {
      // todo error handling
      setLoadingScreen(false);
      setError(true);

      setWeatherBox(false);
      console.error(err);
    }
  }

  function showSearch(flag) {
    setSearchCity(flag);
    setaccessFlag(!flag);
    setWeatherBox(false);
    setError(false);
    if (!flag) {
      getfromSessionStorage();
    }
  }

  function getCity(value) {
    getCityWeather(value);
  }

  async function getCityWeather(city) {
    setLoadingScreen(true);
    setError(false);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await response.json();

      if (data.cod === "404") {
        throw new Error(`Sorry, Can't find your city`);
      }

      setLoadingScreen(false);
      //Show weather container
      setWeatherBox(true);

      // setting new weather data
      setWeatherData(data);
    } catch (err) {
      // todo error handling
      setLoadingScreen(false);
      setError(true);
      setWeatherBox(false);
    }
  }

  return (
    <div className="main-container">
      <Header />
      <div className="app-body">
        <OptionContainer showSearch={showSearch} />
        {accessFlag && <Entry getLocation={getLatLong} />}
        {searchCity && <SearchContainer setName={getCity} />}
        {lodingScreen && <LoadingScreen />}
        {error && <Error />}
        {showWeatherBox && <WeatherContainer weatherInfo={weatherData} />}
      </div>
    </div>
  );
}
