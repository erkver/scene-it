import React, { Component } from "react";
import { connect } from "react-redux";
import { editScreening, getScreening } from "../../Ducks/screeningReducer";
import "./AdminScreening.scss";
import { withRouter } from "react-router-dom";
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
    };
  }

  componentDidMount() {
    this.props.getTheatres().then(response => console.log(response));
  }

  handleDate = date => {
    console.log(date);
    this.setState({ date: date });
  };

  clearInputs = () => {
    this.setState({ seatCount: "" })
  }

  handleTheatre = e => {
    let theatre = this.props.theatres.filter(event =>
      event.theatre_name.includes(e.target.value)
    );
    this.setState({ selectedTheatre: theatre });
  }

  render() {
    const { screening, theatres, getScreening } = this.props;
    const { date, seatCount, selectedTheatre } = this.state;
    console.log(screening[0] &&  screening[0].theatre_id);
    let theatreList = theatres.map((theatre, i) => (
      <option
        className="edit-theatre-input"
        key={i}
        onClick={() => this.setState({ selectedTheatre: theatre })}
      >
        {theatre.theatre_name}
      </option>
    ));
    return (
      <div className="main-single-screening-cont">
        <h1 className="title-text">
          {screening[0] && screening[0].title} Info
        </h1>
        <div className="single-screening-cont">
          <img
            src={screening[0] && screening[0].img_url}
            alt={screening[0] && screening[0].title}
            className="poster"
          />
          <p className="info-text">
            Title: {screening[0] && screening[0].title}
          </p>
          <p className="info-text">
            Studio: {screening[0] && screening[0].studio}
          </p>
          <p className="info-text">
            Release Date: {screening[0] && screening[0].release_date}
          </p>
          <p className="info-text">
            Runtime: {screening[0] && screening[0].runtime} minutes
          </p>
          {this.state.edit === false ? (
            <>
              <p className="info-text">
                Screening Date: {screening[0] && screening[0].screening_date}
              </p>
              <p className="info-text">
                Theatre: {screening[0] && screening[0].theatre_name}
              </p>
              <p className="info-text">
                Seat Count: {screening[0] && screening[0].seat_count}
              </p>
              <button
                className="add-btn"
                onClick={() => this.setState({ edit: true })}
              >
                Edit Screening
              </button>
            </>
          ) : (
            <>
              <p className="info-text">
                Current Screening Date: {screening[0] && screening[0].screening_date}
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
              <p className="info-text">
                Current Theatre: {screening[0] && screening[0].theatre_name}
              </p>
              <select 
                required
                defaultValue="default" 
                onChange={this.handleTheatre}>
                  <option disabled hidden value="default" >Select theatre</option>
                  {theatreList}
              </select>
              <p className="info-text">
                Current Seat Count: {screening[0] && screening[0].seat_count}
              </p>
              <input
                type="number"
                min="0"
                required
                placeholder="#"
                className="edit-seat-input"
                value={seatCount}
                onChange={e => this.setState({ seatCount: e.target.value })}
              />
              <div className="edit-btn-cont">
                <button
                  className="add-btn"
                  onClick={() => this.setState({ edit: false })}>Cancel Edit
                </button>
                <button
                  className="add-btn"
                  onClick={() => {
                    editScreening(
                      screening[0].id,
                      moment(date || screening[0].screening_date).format("llll"),
                      (!(selectedTheatre[0] && selectedTheatre[0].theatre_id) ? screening[0].theatre_id : selectedTheatre[0].theatre_id),
                      (!seatCount ? screening[0].seat_count : +seatCount)
                    );
                    this.clearInputs();
                    this.setState({edit: false});
                    getScreening(screening[0] && screening[0].id);
                    console.log(screening[0].id,
                      moment(date._d).format("llll"),
                      (!(selectedTheatre[0] && selectedTheatre[0].theatre_id) ? screening[0].theatre_id : selectedTheatre[0].theatre_id),
                      (!seatCount ? screening[0].seat_count : +seatCount));
                  }}
                >Submit Screening
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  screeningReducer,
  theatreReducer,
  userReducer
}) => ({
  ...screeningReducer,
  ...theatreReducer,
  ...userReducer
});

export default withRouter(connect(mapStateToProps, {getTheatres, getScreening})(AdminScreening));
