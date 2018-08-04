import React, { Component } from "react";
import Chart from "../chart";

export default class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td>{name}</td>
        <td><Chart data={temps} color="red" units="K"/></td>
        <td><Chart data={temps} color="yellow" units="hPa"/></td>
        <td><Chart data={temps} color="green" units="%"/></td>
      </tr>
    );
  }

  render() {
    console.log(this.props.weather);
    return this.props.weather && (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}
