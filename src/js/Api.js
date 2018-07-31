import axios from 'axios';
import {ROOT_URL} from './constants';

export function getWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);
    return request;
}
