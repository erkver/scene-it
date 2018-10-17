import React,{ Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getScreenings } from "../../Ducks/screeningReducer";
import "./NewReport.scss";


class NewReport extends Component {
  componentDidMount() {
    this.props.getScreenings();
  }
  render() {
  const { screenings } = this.props;
  let movieList = screenings.map((movie, i) => (
    <option
      className="screening-option-cont"
      key={i}
      onClick={() => this.setState({ selectedMovie: movie })}>{movie.title}</option>
  ));
    return (
      <div className="new-report-cont">
        <h1>Create Report</h1>
        <div className="new-report-innner-cont">
          <div className="screening-row-cont">
            <p className="desc-text">Title:</p>
            <select
              required
              onChange={this.handleMovie}>
              {movieList}
            </select>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  screeningReducer,
  reportReducer,
  userReducer
}) => ({
  ...screeningReducer,
  ...reportReducer,
  ...userReducer
});

export default withRouter(connect(mapStateToProps, {getScreenings})(NewReport))