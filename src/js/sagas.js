import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import {getWeather} from './Api';
import {loadState} from './store/server/loadState';
import {updateInitialState} from './actions';

// worker Saga: will be fired on FETCH_WEATHER action
function* fetchWeather(action) {
   try {
      const weather = yield call(getWeather, action.payload);
      yield put({type: "FETCH_WEATHER_SUCCEEDED", response: weather.data});
   } catch (e) {
      yield put({type: "FETCH_WEATHER_FAILED", message: e.message});
   }
}

function* loadInitialState() {
    console.log("loading initial state");
    try{
      const initialState = yield call(loadState);
      console.log(initialState);
      yield put(updateInitialState(initialState));
    } catch(e) {
      console.log("some loading error", e);
    }
}

function* loadFakeResults(keyword) {

}

function* fetchData(payload) {
  console.log("fetching data from endpoint", payload.value);
  yield call(loadFakeResults, payload.value);
}

export default function* rootSaga() {
  yield all[
    yield takeLatest("LOAD_INITIAL_STATE", loadInitialState),
    yield takeEvery("CHATBOT_USER_ACTION", fetchData)
  ];
}
