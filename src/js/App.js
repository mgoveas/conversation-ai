import React, { Component } from 'react';
import SearchBarContainer from './components/searchBar/SearchBarContainer';
import WeatherListContainer from './components/weatherList/WeatherListContainer';
import "../scss/index.scss";

class App extends Component {
  render() {
    return (
      <div>
        <SearchBarContainer />
        <WeatherListContainer />
      </div>
    );
  }
}

export default App;
