import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies, getMovie } from "../../Ducks/adminReducer";
import { getTheatres } from "../../Ducks/theatreReducer";
import { addScreening, editScreening, getScreening } from "../../Ducks/screeningReducer";
import { getUser } from "../../Ducks/userReducer";
import { Link, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "./NewScreening.scss";
import "react-datepicker/dist/react-datepicker.css";

class NewScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      selectedTheatre: {},
      seatCount: 0
    }
    this.handleDate = this.handleDate.bind(this);
    this.handleMovie = this.handleMovie.bind(this);
    this.handleTheatre = this.handleTheatre.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }

  componentDidMount() {
    const { getMovies, getTheatres, getUser, getScreening, screening } = this.props;
    const { id } = this.props.match.params;
    getMovies();
    getTheatres();
    getUser();
    getScreening(+id).then(res => {
      console.log(res);
      const { data } = res.value;
      this.setState({ startDate: moment(data[0].screening_date), selectedTheatre: {theatre_name: data[0].theatre_name, theatre_id: data[0].theatre_id}, seatCount: data[0].seat_count })});
  }

  handleDate(date) {
    this.setState({startDate: date})
  }

  handleMovie(e) {
    let selMovie = this.props.movies.filter(event => event.title.includes(e.target.value));
    this.props.getMovie(selMovie[0].id);
    this.setState({selectedMovie: this.props.movie});
  }

  handleTheatre(e) {
    let theatre = this.props.theatres.filter(event => event.theatre_name.includes(e.target.value));
    this.setState({ selectedTheatre: theatre });
  }

  clearInputs() {
    this.setState({seatCount: 0})
  }

  render() {
    const { movies, theatres, addScreening, movie, user, screening } = this.props;
    const { startDate, seatCount, selectedTheatre } = this.state;
    console.log(this.state);
    console.log(this.props);
    let movieList = movies.map((movie, i) => (
      <option 
        className="movie-option-cont" 
        key={i}
        value={movie.title}
      >{movie.title}</option>
    ));
    let theatreList = theatres.map((theatre, i) => (
      <option 
      className="theatre-option-cont" 
      key={i}
      value={theatre.theatre_name}
      onClick={() => this.setState({selectedTheatre: theatre})}>{theatre.theatre_name}</option>
    ));
    let prevScreening = screening.map((e, i) => (
      <div className="new-screening-cont" key={i}>
        <h1 className="title-text">Edit Screening</h1>
        <div className="new-screening-inner-cont">
          <div className="mov-row-cont">
            <p className="desc-text">Title:</p>
            <h3>{e.title}</h3>
          </div>
          <div className="mov-row-cont">
            <p className="desc-text">Theatre:</p>
            <select
              required
              // value={selectedTheatre[0].theatre_name}
              onChange={this.handleTheatre} >
              <option disabled hidden value="default" >Select theatre</option>
              {theatreList}
            </select>
          </div>
          <div className="mov-row-cont">
            <p className="desc-text">Screening Date and Time:</p>
            <DatePicker
              // openToDate={moment(e.screening_date)}
              selected={startDate}
              onChange={this.handleDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="LLL"
              timeCaption="time"
              className="date-cont"
              placeholderText="Click to select date"
              required
            />
          </div>
          <div className="mov-row-cont">
            <p className="desc-text">Seat Count:</p>
            <input
              type="number"
              min="0"
              required
              placeholder="#"
              className="seat-input"
              value={seatCount}
              onChange={e => this.setState({ seatCount: e.target.value })} />
          </div>
          <Link
            to='/'
            className="submit-btn"
            onClick={() => {
              editScreening(
                e.id,
                moment(startDate).format('ll'),
                selectedTheatre[0].theatre_id,
                +seatCount
              );
              this.clearInputs()
            }}
          >Submit Edit</Link>
        </div>
      </div>
    ));
    return (
      <div className="new-screening-cont">
      {!screening[0] ?
        <>
          <h1 className="title-text">Add Screening</h1>
          <div className="new-screening-inner-cont">
            <div className="mov-row-cont">
              <p className="desc-text">Title:</p>
              <select 
                required
                value="default"
                onChange={this.handleMovie}>
                <option disabled hidden value="default" >Select movie</option>
                {movieList}
              </select>
            </div>
            <div className="mov-row-cont">
              <p className="desc-text">Theatre:</p>
              <select 
                required
                value="default"
                onChange={this.handleTheatre} >
                <option disabled hidden value="default" >Select theatre</option>
                {theatreList}
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
                  className="date-cont"
                  placeholderText="Click to select date"
                  required
                />
            </div>
            <div className="mov-row-cont" onSubmit={e => this.setState({seatCount: e.target.value})}>
              <p className="desc-text">Seat Count:</p>
              <input 
                type="number"
                min="0"
                required 
                placeholder="#" 
                className="seat-input" 
                value={seatCount}
                onChange={e => this.setState({seatCount: e.target.value})} />
            </div>
            <Link
              to='/' 
              className="submit-btn"
              onClick={() => {addScreening(
                movie.title, 
                `http://image.tmdb.org/t/p/w200/${movie.poster_path}`, 
                moment(movie.release_date).format('ll'), 
                movie.overview, 
                true, 
                startDate._d, 
                user.data.user_id, 
                movie.production_companies[0].name, 
                movie.genres[0].name, 
                movie.homepage, 
                movie.runtime,
                selectedTheatre[0].theatre_id,
                +seatCount
                ); 
                this.clearInputs()
              }}
              >Submit Screening</Link>
            </div>
          </>
        : 
        <>
          {prevScreening}
        </>
      }
      </div>
    );
  }
}

const mapStateToProps = ({ screeningReducer, adminReducer, theatreReducer, userReducer }) => ({
  ...screeningReducer,
  ...adminReducer,
  ...theatreReducer,
  ...userReducer
});

export default withRouter(connect(mapStateToProps, {getMovies, getTheatres, getMovie, addScreening, getUser, editScreening, getScreening})(NewScreening));