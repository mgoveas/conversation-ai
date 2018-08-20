import React from 'react';
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';

import IndexContainer from './containers/index';
import SharedContainer from './containers/shared';

import { setCurrentPage, initializeApp } from './actions';
import { PAGE, PRODUCT_CATEGORY, PRODUCT, RESERVED, SEARCH } from './store/shared/pageTypes';

import "../scss/theme.css";

class SwitchContainers extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.initializeApp();
	}

	componentWillReceiveProps(nextProps) {
		this.props.setCurrentPage(nextProps.location);
	}

	render() {
		console.log("returning index container");
		return <IndexContainer />;
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
		currentPage: state.app.currentPage
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		initializeApp,
		setCurrentPage
    }, dispatch);
};

const SwitchContainersConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(SwitchContainers);

const StoreApp = () => (
	<SharedContainer>
		<SwitchContainersConnected />
    </SharedContainer>
);

export default StoreApp;
