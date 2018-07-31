import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './js/App';
import configureStore from './js/configureStore';
import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
