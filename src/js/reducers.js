import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as t from './constants';
import React from 'react';
import DBPedia from './components/DBPedia';

const initialChatbotSteps = [
	{
		id: '1',
		message: 'Hello, what can I help you find today',
		trigger: 'search',
	},
	{
		id: 'search',
		user: true,
		trigger: '3',
	},
	{
		id: '3',
		component: <DBPedia />,
		waitAction: true,
		trigger: '1',
	}
];

const initialState = {
	currentPage: {path: "/", type: "page"},
	settings: {
		currency_format: '${amount}'
	},
	productFilter: {},
	pageDetails: {},
	categories: [],
	chatbotSteps: initialChatbotSteps,
	opened: false
};

const updatedChatbotSteps = [
	{
		id: '1',
		message: 'Ypu searched for Food',
		trigger: 'search',
	},
	{
		id: 'search',
		user: true,
		trigger: '3',
	},
	{
		id: '3',
		component: <DBPedia />,
		waitAction: true,
		trigger: '2',
	}
];

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_INITIAL_STATE":
			return Object.assign({}, state, action.payload.state.app);
		case "SEARCH_SUCCEEDED":
			return Object.assign({}, state, {
				loadingProducts: false,
				products: action.payload.searchResults.data,
				productsTotalCount: action.payload.searchResults.total_count,
				productsHasMore: action.payload.searchResults.has_more,
				productsAttributes: action.payload.searchResults.attributes,
				productsMinPrice: action.payload.searchResults.price.min || 0,
				productsMaxPrice: action.payload.searchResults.price.max || 0,
				chatbotSteps: updatedChatbotSteps
			});
		case "TOGGLE_FLOATING":
			return Object.assign({}, state, {opened: !state.opened})
		case "SEARCH_ATTEMPTED":
			return Object.assign({}, state, {opened: true});
		case t.PRODUCT_RECEIVE:
			return Object.assign({}, state, { productDetails: action.product });

		case t.PRODUCTS_REQUEST:
			return Object.assign({}, state, { loadingProducts: true });

		case t.PRODUCTS_RECEIVE:
			if (action.products) {
				return Object.assign({}, state, {
					loadingProducts: false,
					products: action.products.data,
					productsTotalCount: action.products.total_count,
					productsHasMore: action.products.has_more,
					productsAttributes: action.products.attributes,
					productsMinPrice: action.products.price.min || 0,
					productsMaxPrice: action.products.price.max || 0
				});
			} else {
				return Object.assign({}, state, {
					products: [],
					loadingProducts: false
				});
			}

		case t.MORE_PRODUCTS_REQUEST:
			return Object.assign({}, state, { loadingMoreProducts: true });

		case t.MORE_PRODUCTS_RECEIVE:
			return Object.assign({}, state, {
				loadingMoreProducts: false,
				products: [...state.products, ...action.products.data],
				productsTotalCount: action.products.total_count,
				productsHasMore: action.products.has_more
			});

		case t.PAGE_RECEIVE:
			return Object.assign({}, state, { pageDetails: action.pageDetails });

		case t.CART_RECEIVE:
			return Object.assign({}, state, { cart: action.cart });

		case t.SHIPPING_METHODS_REQUEST:
			return Object.assign({}, state, { loadingShippingMethods: true });

		case t.SHIPPING_METHODS_RECEIVE:
			return Object.assign({}, state, {
				shippingMethods: action.methods,
				loadingShippingMethods: false
			});

		case t.PAYMENT_METHODS_REQUEST:
			return Object.assign({}, state, { loadingPaymentMethods: true });

		case t.PAYMENT_METHODS_RECEIVE:
			return Object.assign({}, state, {
				paymentMethods: action.methods,
				loadingPaymentMethods: false
			});

		case t.CHECKOUT_REQUEST:
			return Object.assign({}, state, { processingCheckout: true });

		case t.CHECKOUT_RECEIVE:
			return Object.assign({}, state, {
				cart: null,
				order: action.order,
				processingCheckout: false
			});

		case t.SITEMAP_RECEIVE:
			return Object.assign({}, state, { currentPage: action.currentPage });

		case t.SET_CURRENT_CATEGORY:
			return Object.assign({}, state, { categoryDetails: action.category });

		case t.SET_PRODUCTS_FILTER:
			return Object.assign({}, state, {
				productFilter: Object.assign({}, state.productFilter, action.filter)
			});

		case t.LOCATION_CHANGED:
			return Object.assign({}, state, { location: action.location });

		case t.PRODUCT_REQUEST:
		case t.PAGE_REQUEST:
		case t.CART_REQUEST:
		case t.CART_ITEM_ADD_REQUEST:
		case t.CART_ITEM_DELETE_REQUEST:
		case t.CART_ITEM_UPDATE_REQUEST:
		case t.SITEMAP_REQUEST:
		default:
			return state;
	}
};

export default combineReducers({ app: appReducer, form: formReducer });
