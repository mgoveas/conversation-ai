import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import activationSaga from "./sagas";

function addSagas(sagas, sagaMiddleware) {
    console.log("adding sagas");
    sagas.forEach((saga) => sagaMiddleware.run(saga));
};

function defaultConfigureStore(storeName, sagas = []) {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];
    const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name: storeName})
        : compose;
    const store = createStore(reducers,
        {},
        composeEnhancers(applyMiddleware(...middleware))
    );
    addSagas(sagas, sagaMiddleware);
    console.log(store);
    return store;
}

export default function configureStore() {
    return defaultConfigureStore("Store", [activationSaga]);
};
