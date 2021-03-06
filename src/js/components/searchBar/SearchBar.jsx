import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    // We need to go and fetch weather data
    this.props.fetchWeather(this.state.term);
    this.setState({ term: "" });
  }

  render() {
      return (
        <div class="row">
          <form onSubmit={this.onFormSubmit} className="input-group">
            <input
              placeholder="Get a five-day forecast in your favorite cities"
              className="form-control"
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-secondary">Submit</button>
            </span>
          </form>
        </div>
      );
    }
}
