import React, { Component } from 'react';
import SearchBarContainer from './components/searchBar/SearchBarContainer';
import WeatherListContainer from './components/weatherList/WeatherListContainer';
import "../scss/index.scss";

class WeatherApp extends Component {
  render() {
    return (
      <div className="container">
        <SearchBarContainer />
        <WeatherListContainer />
      </div>
    );
  }
}

export default WeatherApp;
