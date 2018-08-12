import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { mapStateToProps, mapDispatchToProps } from '../containerProps';
import { SharedContainer } from '../components/shared';

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SharedContainer)
);
