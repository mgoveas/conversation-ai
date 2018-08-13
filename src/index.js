import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './js/App';
import configureStore from './js/configureStore';
import registerServiceWorker from './js/registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// ReactDOM.render(
//     <Provider store={configureStore()}>
//         <StoreApp />
//     </Provider>,
//     document.getElementById('root'));


ReactDOM.render(
	<Provider store={configureStore()}>
		<BrowserRouter>
			<StoreApp />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
