import { connect } from 'react-redux';
import ChatBot from './ChatBot';
import {handleChatBotUserAction} from '../actions';


export function mapStateToProps(state) {
    console.log("mapping state to props in chat bot container", state);
    return {

    };
}

export function mapDispatchToProps(dispatch) {
    return {
        handleUserAction: (obj) => {
            console.log('dispatching', obj);
            dispatch(handleChatBotUserAction(obj));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBot);
