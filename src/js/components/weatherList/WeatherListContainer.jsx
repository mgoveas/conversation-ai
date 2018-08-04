import {connect} from 'react-redux';
import WeatherList from './WeatherList';

function mapStateToProps({ weather }) {
    console.log(arguments);
    return { weather };
  }

export default connect(mapStateToProps)(WeatherList);
