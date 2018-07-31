import {connect} from 'react-redux';
import WeatherList from './WeatherList';

function mapStateToProps({ weather }) {
    return { weather };
  }

export default connect(mapStateToProps)(WeatherList);
