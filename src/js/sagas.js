import { call, put, takeEvery } from 'redux-saga/effects'
import {getWeather} from './Api';

// worker Saga: will be fired on FETCH_WEATHER action
function* fetchWeather(action) {
   try {
      const weather = yield call(getWeather, action.payload);
      yield put({type: "FETCH_WEATHER_SUCCEEDED", response: weather.data});
   } catch (e) {
      yield put({type: "FETCH_WEATHER_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("FETCH_WEATHER", fetchWeather);
  console.log("test");
}

export default mySaga;
