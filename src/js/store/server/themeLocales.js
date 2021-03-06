import fs from 'fs';
import path from 'path';
import winston from 'winston';

const THEME_LOCALES_PATH = 'theme/locales/';
let text = {
	"addToCart": "Add to cart",
	"cart": "cart",
	"cartEmpty": "Your cart is empty",
	"proceedToCheckout": "Go to checkout",
	"subtotal": "Subtotal",
	"shipping": "Shipping",
	"discount": "Discount",
	"total": "Total",
	"remove": "Remove",
	"qty": "Qty",
	"price": "Price",
	"checkoutPageTitle": "Checkout",
	"grandTotal": "Grand total",
	"orderSummary": "Order Summary",
	"checkoutSuccessTitle": "Thanks for your order!",
	"outOfStock": "Out of stock",
	"inStock": "In Stock",
	"discontinued": "Discontinued",
	"relatedProducts": "You May Also Like",
	"filterProducts": "Filter products",
	"sort": "Sort",
	"sortFavorite":"Favorite",
	"sortNewest":"Newest",
	"sortPriceLow":"Price low to high",
	"sortPriceHigh":"Price high to low",
	"title404": "Page not found",
	"loadMore": "Show more products",
	"text404": "The page you requested does not exist. Click here to continue shopping.",
	"search": "Search",
	"searchPlaceholder": "Search",
	"resultsFor": "Results for",
	"selectOption": "Select",
	"optionsRequired": "You need to choose options",
	"shippingAddress": "Shipping Address",
	"billingAddress": "Billing Address",
	"shippingMethod": "Shipping method",
	"paymentMethod": "Payment method",
	"orderNumber": "Order number",
	"productName": "Product",
	"close": "Close",
	"attributes": "Product details",
	"home": "Home",
	"saleEnds": "Offer ends",
	"days": "days",
	"hours": "hrs",
	"minutes": "mins",
	"seconds": "secs",
	"email": "Email",
	"mobile": "Mobile",
	"country": "Country",
	"state": "State/Province",
	"city": "City",
	"fullName": "Full name",
	"address1": "Address line 1",
	"address2": "Address line 2",
	"postal_code": "Postal code",
	"phone": "Phone",
	"company": "Company",
	"comments": "Comments",
	"recentlyViewed": "Recently Viewed",
	"loading": "Loading...",
	"optional": "optional",
	"shippingTo": "Shipping To",
	"shippingMethods": "Shipping options",
	"paymentMethods": "Payment options",
	"orderSubmit": "Place Order",
	"emptyCheckout": "Your cart is empty",
	"required": "This field is required.",
	"emailInvalid": "Please enter a valid email address.",
	"sameAsShipping": "Same as shipping address",
	"edit": "Edit",
	"next": "Next",
	"customerDetails": "Customer Details",
	"payment": "Payment"
  };

export const getText = locale => {
	if (text) {
		return Promise.resolve(text);
	} else {
		const filePath = path.resolve(THEME_LOCALES_PATH + locale + '.json');
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, 'utf8', (err, data) => {
				if (err) {
					winston.error('Fail to read theme locale', filePath, err);
					reject(err);
				} else {
					text = JSON.parse(data);
					resolve(text);
				}
			});
		});
	}
};
