import {FETCH_WEATHER} from './constants';

export function fetchWeather(city){
  return {
    type: FETCH_WEATHER,
    payload: city
  };
}

export function initializeApp() {
    return {
		type: "LOAD_INITIAL_STATE",
		payload: "something"
    };
}

export function updateInitialState(initialState) {
    return {
		type: "UPDATE_INITIAL_STATE",
		payload: initialState
    };
}

export function handleChatBotUserAction(value) {
	return {
		type: "CHATBOT_USER_ACTION",
		payload: value
	};
}

export function handleToggleFloating(value) {
	return {
		type: "TOGGLE_FLOATING",
		payload: value
	};
}

export function updateResults(results) {
	return {
		type: "SEARCH_SUCCEEDED",
		payload: results
	}
}

export function doSearch(term) {
	return {
		type: "SEARCH_ATTEMPTED",
		payload: term
	}
}

const requestProduct = () => ({ type: t.PRODUCT_REQUEST });

const receiveProduct = product => ({ type: t.PRODUCT_RECEIVE, product });

export const fetchProducts = () => async (dispatch, getState) => {
	dispatch(requestProducts());
	const { app } = getState();
	const filter = getParsedProductFilter(app.productFilter);
	const response = await api.ajax.products.list(filter);
	const products = response.json;
	dispatch(receiveProducts(null));
	dispatch(receiveProducts(products));
};

export const getProductFilterForCategory = (locationSearch, sortBy) => {
	const queryFilter = queryString.parse(locationSearch);

	let attributes = {};
	for (const querykey in queryFilter) {
		if (querykey.startsWith('attributes.')) {
			attributes[querykey] = queryFilter[querykey];
		}
	}

	return {
		priceFrom: parseInt(queryFilter.price_from || 0),
		priceTo: parseInt(queryFilter.price_to || 0),
		attributes: attributes,
		search: null,
		sort: sortBy
	};
};

export const getProductFilterForSearch = locationSearch => {
	const queryFilter = queryString.parse(locationSearch);

	return {
		categoryId: null,
		priceFrom: parseInt(queryFilter.price_from || 0),
		priceTo: parseInt(queryFilter.price_to || 0),
		search: queryFilter.search,
		sort: 'search'
	};
};

export const getParsedProductFilter = productFilter => {
	const filter = Object.assign(
		{},
		{
			on_sale: productFilter.onSale,
			search: productFilter.search,
			category_id: productFilter.categoryId,
			price_from: productFilter.priceFrom,
			price_to: productFilter.priceTo,
			sort: productFilter['sort'],
			fields: productFilter['fields'],
			limit: productFilter['limit'],
			offset: 0
		},
		productFilter.attributes
	);

	return filter;
};

export const requestProducts = () => ({ type: t.PRODUCTS_REQUEST });

export const receiveProducts = products => ({ type: t.PRODUCTS_RECEIVE, products });

export const fetchMoreProducts = () => async (dispatch, getState) => {
	const { app } = getState();
	if (
		app.loadingProducts ||
		app.loadingMoreProducts ||
		app.products.length === 0 ||
		!app.productsHasMore
	) {
		return;
	} else {
		dispatch(requestMoreProducts());

		const filter = getParsedProductFilter(app.productFilter);
		filter.offset = app.products.length;

		const response = await api.ajax.products.list(filter);
		const products = response.json;
		dispatch(receiveMoreProducts(products));
		animateScroll.scrollMore(200);
	}
};

const requestMoreProducts = () => ({ type: t.MORE_PRODUCTS_REQUEST });

const receiveMoreProducts = products => ({
	type: t.MORE_PRODUCTS_RECEIVE,
	products
});

const requestPage = () => ({ type: t.PAGE_REQUEST });

const receivePage = pageDetails => ({ type: t.PAGE_RECEIVE, pageDetails });

export const setCurrentPage = location => ({
	type: t.SET_CURRENT_PAGE,
	location
})

// export const setCurrentPage = location => async (dispatch, getState) => {
// 	let locationPathname = '/404';
// 	let locationSearch = '';
// 	let locationHash = '';

// 	if (location) {
// 		locationPathname = location.pathname;
// 		locationSearch = location.search;
// 		locationHash = location.hash;
// 	}

// 	const { app } = getState();
// 	let statePathname = '/404';
// 	let stateSearch = '';
// 	let stateHash = '';

// 	if (app.location) {
// 		statePathname = app.location.pathname;
// 		stateSearch = app.location.search;
// 		stateHash = app.location.hash;
// 	}

// 	const currentPageAlreadyInState =
// 		statePathname === locationPathname && stateSearch === locationSearch;

// 	if (currentPageAlreadyInState) {
// 		// same page
// 	} else {
// 		dispatch(
// 			setCurrentLocation({
// 				hasHistory: true,
// 				pathname: locationPathname,
// 				search: locationSearch,
// 				hash: locationHash
// 			})
// 		);

// 		const category = app.categories.find(c => c.path === locationPathname);
// 		if (category) {
// 			const newCurrentPage = {
// 				type: 'product-category',
// 				path: category.path,
// 				resource: category.id
// 			};
// 			dispatch(receiveSitemap(newCurrentPage)); // remove .data
// 			dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
// 		} else {
// 			// const sitemapResponse = await api.ajax.sitemap.retrieve({
// 			// 	path: locationPathname
//       // });
//       const sitemapResponse = Promise.resolve({json: "abcd"});
//       if (sitemapResponse.status === 404) {
// 				dispatch(
// 					receiveSitemap({
// 						type: 404,
// 						path: locationPathname,
// 						resource: null
// 					})
// 				);
// 			} else {
// 				const newCurrentPage = sitemapResponse.json;
// 				dispatch(receiveSitemap(newCurrentPage));
// 				dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
// 			}
// 		}
// 	}
// };

export const setCurrentLocation = location => ({
	type: t.LOCATION_CHANGED,
	location
});

export const receiveSitemap = currentPage => ({
	type: t.SITEMAP_RECEIVE,
	currentPage
});

const fetchDataOnCurrentPageChange = currentPage => (dispatch, getState) => {
	const { app } = getState();
	let productFilter = null;

	// clear product data
	dispatch(receiveProduct(null));

	// analytics.pageView({
	// 	path: currentPage.path,
	// 	title: '-'
	// });

	switch (currentPage.type) {
		case PRODUCT_CATEGORY:
			productFilter = getProductFilterForCategory(
				app.location.search,
				app.settings.default_product_sorting
			);
			dispatch(setCategory(currentPage.resource));
			dispatch(setProductsFilter(productFilter));
			dispatch(fetchProducts());
			break;
		case SEARCH:
			productFilter = getProductFilterForSearch(app.location.search);
			dispatch(setProductsFilter(productFilter));
			dispatch(fetchProducts());
			//analytics.search({ searchText: productFilter.search });
			break;
		case PRODUCT:
			const productData = currentPage.data;
			dispatch(receiveProduct(productData));
			//analytics.productView({ product: productData });
			break;
		case PAGE:
			const pageData = currentPage.data;
			dispatch(receivePage(pageData));
			if (currentPage.path === '/checkout') {
				//analytics.checkoutView({ order: app.cart });
			}
			break;
	}
};

export const setCategory = categoryId => (dispatch, getState) => {
	const { app } = getState();
	const category = app.categories.find(c => c.id === categoryId);
	if (category) {
		dispatch(setCurrentCategory(category));
		dispatch(setProductsFilter({ categoryId: categoryId }));
		dispatch(receiveProduct(null));
	}
};

const setCurrentCategory = category => ({
	type: t.SET_CURRENT_CATEGORY,
	category
});

export const setSort = sort => (dispatch, getState) => {
	dispatch(setProductsFilter({ sort: sort }));
	dispatch(fetchProducts());
};

const setProductsFilter = filter => ({
	type: t.SET_PRODUCTS_FILTER,
	filter: filter
});
