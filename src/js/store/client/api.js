import CezerinClient from 'cezerin-client';

const api = new CezerinClient({
	ajaxBaseUrl: 'http://localhost:3001/ajax'
});

export default api;
