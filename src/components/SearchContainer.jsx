import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchContainer(props) {
  const [inputCity, setInputCity] = useState("");

  function handleInputChange(event) {
    const city = event.target.value;
    setInputCity(city);
  }

  function searchCity(event) {
    event.preventDefault();
    props.setName(inputCity);
    setInputCity("");
  }

  return (
    <form className="search-form">
      <input
        type="text"
        name="search"
        onChange={handleInputChange}
        className="search-box"
        value={inputCity}
      />
      <button className="search-btn" onClick={searchCity}>
        <SearchIcon
          className="search-icon"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        />
      </button>
    </form>
  );
}
