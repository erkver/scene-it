import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../Ducks/adminReducer";
import { getTheatres } from "../../Ducks/theatreReducer";
// import LongMenu from "../../Components/LongMenu/LongMenu";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "./NewScreening.scss";
import "react-datepicker/dist/react-datepicker.css";


class NewScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    }
    this.handleDate = this.handleDate.bind(this);
  }

  componentDidMount() {
    this.props.getMovies();
    this.props.getTheatres();
  }

  handleDate(date) {
    console.log(date);
    this.setState({startDate: date})
  }
  render() {
    const { movies } = this.props;
    const { startDate } = this.state;
    console.log(this.props);
    let movieList = movies.map((movie, i) => (
      <option className="movie-option-cont" key={i}>{movie.title}</option>
    ));
    return (
      <div className="new-screening-cont">
        <h1 className="title-text">Add Screening</h1>
        <div className="new-screening-inner-cont">
          <div className="mov-row-cont">
            <p className="desc-text">Title:</p>
            <select placeholder="Select movie">
              {movieList}
            </select>
          </div>
          <div className="mov-row-cont">
            <p className="desc-text">Screening Date and Time:</p>
              <DatePicker 
                selected={startDate}
                onChange={this.handleDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="LLL"
                timeCaption="time"
              />
          </div>
          <div className="mov-row-cont">
            <p className="desc-text">Seat Count:</p>
            <input type="number" placeholder="#" className="seat-input" />
          </div>
          <button className="submit-btn">Submit Screening</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ screeningReducer, adminReducer, theatreReducer }) => ({
  ...screeningReducer,
  ...adminReducer,
  ...theatreReducer,
});

export default withRouter(connect(mapStateToProps, {getMovies, getTheatres})(NewScreening));