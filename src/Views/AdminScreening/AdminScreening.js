import React, { Component } from "react";
import { connect } from "react-redux";
import { editScreening } from "../../Ducks/screeningReducer";
import "./AdminScreening.scss";
import { withRouter, Link } from "react-router-dom";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTheatres } from "../../Ducks/theatreReducer";

class AdminScreening extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      date: moment(),
      selectedTheatre: {},
      seatCount: ""
    }
  }

  componentDidMount() {
    this.props.getTheatres();
  }

  handleDate = date => {
    console.log(date);
    this.setState({ date: date})
  }
  render() {
    const { screening, theatres } = this.props;
    const { date, seatCount, selectedTheatre } = this.state;
    console.log(screening[0] && screening[0].title);
    let theatreList = theatres.map((theatre, i) => (
      <option
        className="edit-theatre-input"
        key={i}
        onClick={() => this.setState({ selectedTheatre: theatre })}>{theatre.theatre_name}</option>
    ));
    return (
      <div className="main-single-screening-cont">
        <h1 className="title-text">{screening[0] && screening[0].title} Info</h1>
        <div className="single-screening-cont">
          <img
            src={screening[0] && screening[0].img_url}
            alt={screening[0] && screening[0].title}
            className="poster" />
          <p 
            className="info-text">Title: {screening[0] && screening[0].title}</p>
          <p 
            className="info-text">Studio: {screening[0] && screening[0].studio}</p>
          <p 
            className="info-text">Release Date: {screening[0] && screening[0].release_date}</p>
          <p 
            className="info-text">Runtime: {screening[0] && screening[0].runtime} minutes</p>
          {this.state.edit === false
            ? <>
                <p
                  className="info-text">Screening Date: {screening[0] && screening[0].screening_date}</p>
                <p
                  className="info-text">Theatre: {screening[0] && screening[0].theatre_name}</p>
                <p
                  className="info-text">Seat Count: {screening[0] && screening[0].seat_count}</p>
                <button
                  className="add-btn"
                  onClick={() => this.setState({ edit: true })}>Edit Screening
                </button>
              </>
            : <>
                <p
                className="info-text">Screening Date: {screening[0] && screening[0].screening_date}
                </p>
                <DatePicker
                  openToDate={moment(screening[0].screening_date)}
                  selected={date}
                  onChange={this.handleDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="LLL"
                  timeCaption="time"
                  className="date-cont"
                  placeholderText="Click to change date"
                  required
                />
                <p
                  className="info-text">Theatre: {screening[0] && screening[0].theatre_name}
                </p>
                <select
                  required
                  onChange={this.handleTheatre} >
                  {theatreList}
                </select>
                <p
                  className="info-text">Seat Count: {screening[0] && screening[0].seat_count}
                </p>
                <input
                  type="number"
                  min="0"
                  required
                  placeholder="#"
                  className="edit-seat-input"
                  value={seatCount}
                  onChange={e => this.setState({ seatCount: e.target.value })} />
                <Link
                  to={`/screening/${screening[0].id}`}
                  className="add-btn"
                  onClick={() => {
                    editScreening(
                      screening.id,
                      moment(date).format("llll"),
                      selectedTheatre[0].theatre_id,
                      +seatCount
                    );
                    this.clearInputs()
                  }}
                >Submit Screening
                </Link>
              </>
          }
        </div>
      </div>
    );      
  }
}

const mapStateToProps = ({
  screeningReducer,
  adminReducer,
  theatreReducer,
  userReducer
}) => ({
  ...screeningReducer,
  ...adminReducer,
  ...theatreReducer,
  ...userReducer
});

export default withRouter(connect(mapStateToProps, {getTheatres})(AdminScreening));

// addFavorite(
//   screening.id,
//   screening.title,
//   screening.poster_path,
//   screening.release_date,
//   screening.overview,
//   true,
//   "TBD",
//   "TBD",
//   "TBD",
//   screening.production_companies[0].name,
//   screening.genres[0].name,
//   screening.homepage,
//   screening.runtime,
//   admin.data.user_id
// )