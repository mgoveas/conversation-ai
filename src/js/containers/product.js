import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { mapStateToProps, mapDispatchToProps } from '../containerProps';
import ProductContainer from '../components/product';

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProductContainer)
);
