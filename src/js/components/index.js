import React from 'react';
import { themeSettings, text } from '../lib/settings';
const Fragment = React.Fragment;

const IndexContainer = props => {
	console.log(props);
	const { pageDetails, categories, settings, products } = props.state;
	const { addCartItem } = props;

	return (
		<Fragment>
			{pageDetails.content &&
				pageDetails.content.length > 10 && (
					<section className="section">
						<div className="container">
							<div className="content">
								<div
									dangerouslySetInnerHTML={{
										__html: pageDetails.content
									}}
								/>
							</div>
						</div>
					</section>
				)}

			<section className="section">
				<div className="container">
					<div className="title is-4 has-text-centered" style={{height: '150px'}} >
						{themeSettings.home_products_title}
					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default IndexContainer;
