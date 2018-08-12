import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import StoreApp from './js/StoreApp';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './js/configureStore';
import registerServiceWorker from './js/registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// ReactDOM.render(
//     <Provider store={configureStore()}>
//         <StoreApp />
//     </Provider>,
//     document.getElementById('root'));


ReactDOM.hydrate(
	<Provider store={configureStore()}>
		<BrowserRouter>
			<StoreApp />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
