
import React from "react";
import PropTypes from "prop-types";
import LogUtil, {LOG_MESSAGE} from "../../utilities/LogUtil";
import HAModal from "hui-react/HAModal";
import HASection from "hui-react/HASection";

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            dismissed: false
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        });
        try {
            LogUtil.fatal(LOG_MESSAGE.CAUGHT_BY_ERROR_BOUNDARY, error, info);
        } catch (error) {}
    }

    handleDismiss = () => {
        this.setState({
            dismissed: true
        });
    };

    render() {
        if (this.state.hasError) {
            const errorMsg = "Something's not quite right. Try again later and it should work.";
            return this.props.show && (
                <HAModal
                    show={!this.state.dismissed}
                    dismissible={true}
                    onDismiss={this.handleDismiss}
                    titleText={errorMsg}
                    size="small"
                    type="error" >
                    <HASection />
                </HAModal>);
        }
        return this.props.children;
    }
};

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool
};

ErrorBoundary.defaultProps = {
    show: true
};

export default ErrorBoundary;
