import CezerinClient from 'cezerin-client';

const api = new CezerinClient({
	ajaxBaseUrl: 'https://localhost:3001/ajax'
});

export default api;
