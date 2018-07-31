import {connect} from 'react-redux';
import SearchBar from './SearchBar';
import { bindActionCreators } from "redux";
import { fetchWeather } from "../../actions";

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchWeather}, dispatch);
  }

export default connect(null, mapDispatchToProps)(SearchBar);
