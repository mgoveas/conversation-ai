import {FETCH_WEATHER} from './constants';

export function fetchWeather(city){
  return {
    type: FETCH_WEATHER,
    payload: city
  };
}
