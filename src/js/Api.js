import axios from 'axios';
import {ROOT_URL} from './constants';

export function getWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);
    return request;
}


export function getData(node) {
    const url = `http://localhost:3001/ajax/{$node}`;
    const request = axios.get(url);
    return request;
}
