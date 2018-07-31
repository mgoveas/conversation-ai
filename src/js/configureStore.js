import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import WeatherReducer from "./reducers";
import activationSaga from "./sagas";

const rootReducer = combineReducers({
    weather: WeatherReducer
});

function addSagas(sagas, sagaMiddleware) {
    sagas.forEach((saga) => sagaMiddleware.run(saga));
};

function defaultConfigureStore(storeName, rootReducer, sagas = []) {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];
    const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name: storeName})
        : compose;
    const store = createStore(rootReducer,
        {},
        composeEnhancers(applyMiddleware(...middleware))
    );
    addSagas(sagas, sagaMiddleware);
    return store;
}

export default function configureStore() {
    return defaultConfigureStore("Activation", rootReducer, [activationSaga]);
};
