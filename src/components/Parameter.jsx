import React from "react";

export default function Parameter(props) {
  return (
    <div className="parameter-container">
      <div className="parameters">
        <div className="parameter-img">
          <img src="/assets/wind.png" />
        </div>
        <p className="parameter-title">WINDSPEED</p>
        <p className="parameter-value">{`${props.weatherParam.windSpeed}m/s`}</p>
      </div>
      <div className="parameters">
        <div className="parameter-img">
          <img src="/assets/humidity.png" className="himidity" />
        </div>
        <p className="parameter-title">HUMIDITY</p>
        <p className="parameter-value">{`${props.weatherParam.humidity}%`}</p>
      </div>
      <div className="parameters">
        <div className="parameter-img">
          <img src="/assets/cloud.png" />
        </div>
        <p className="parameter-title">CLOUDS</p>
        <p className="parameter-value">{`${props.weatherParam.cloudiness}%`}</p>
      </div>
    </div>
  );
}
