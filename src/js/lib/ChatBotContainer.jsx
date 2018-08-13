import { connect } from 'react-redux';
import ChatBot from './ChatBot';
import {handleChatBotUserAction, handleToggleFloating} from '../actions';


export function mapStateToProps(state) {
    console.log("mapping state to props in chat bot container", state);
    return {
        steps: state.app.chatbotSteps,
        opened: state.app.opened
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        handleUserAction: (obj) => {
            console.log('dispatching', obj);
            dispatch(handleChatBotUserAction(obj));
        },
        toggleFloating: (value) => {
            dispatch(handleToggleFloating(value));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBot);
