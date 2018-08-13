import {FETCH_WEATHER_SUCCEEDED} from "./constants";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER_SUCCEEDED:
      return [action.response, ...state];
    default:
      return state;
  }
}
