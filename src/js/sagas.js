import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import {loadState} from './store/server/loadState';
import {updateInitialState, updateResults, requestProducts, receiveProducts} from './actions';
import {fakeData} from '../fakeData';
import api from './store/client/api';


function getProducts() {
  return new Promise(resolve => {
      api.ajax.products.list({}).then(response => {
        resolve(response.json);
      });
  });
}

function* loadInitialState() {
    console.log("loading initial state");
    try{
      const initialState = yield call(loadState);
      yield put(updateInitialState(initialState));
      yield put(requestProducts());
      const products = yield call(getProducts);
      yield put(receiveProducts(products));
    } catch(e) {
      console.log("some loading error", e);
    }
}

function* loadFakeResults(keyword) {
    yield put(updateResults(fakeData));
}

function* fetchData(payload) {
  console.log("fetching data from endpoint", payload.value);
  yield call(loadFakeResults, payload.value);
}

export default function* rootSaga() {
  yield all[
    yield takeLatest("LOAD_INITIAL_STATE", loadInitialState),
    //yield takeEvery("CHATBOT_USER_ACTION", fetchData),
    yield takeEvery("SEARCH_ATTEMPTED", fetchData)
  ];
}
